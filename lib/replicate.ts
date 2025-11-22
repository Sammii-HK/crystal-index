import Replicate from "replicate";
import { prisma } from "./prisma";
import {
  getCrystalContext,
  createCLIPPrompt,
  type CrystalContext,
} from "./crystal-context";

// Lazy initialization to ensure env vars are loaded
let replicateInstance: Replicate | null = null;

function getReplicate(): Replicate {
  if (!replicateInstance) {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN environment variable is not set");
    }
    replicateInstance = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }
  return replicateInstance;
}

export interface IdentificationResult {
  crystal: string;
  confidence: number;
}

export interface TopMatches {
  crystal: string;
  confidence: number;
}
[];

/**
 * Get crystal data with context for better matching
 * Uses crystal-context.ts as primary source (274+ crystals with rich descriptions)
 * Falls back to database if crystal not in context file
 */
async function getCrystalsWithContext(): Promise<
  Array<{
    name: string;
    description: string;
    colors: string[];
    otherNames: string[];
    prompt: string; // Rich prompt for CLIP matching
  }>
> {
  try {
    // PRIMARY SOURCE: Use crystal-context.ts (274+ crystals with rich visual descriptions)
    const { getAllCrystalContexts, getCrystalContext, createCLIPPrompt } =
      await import("./crystal-context");
    const contextCrystals = getAllCrystalContexts();

    // Also fetch from database to merge/fallback
    let dbCrystals: Array<{
      name: string;
      bio: string | null;
      colour: string[] | null;
      otherNames: string | null;
      crystalInfo: { info: string | null; colour: string[] | null } | null;
    }> = [];

    try {
      dbCrystals = await prisma().crystal.findMany({
        select: {
          name: true,
          bio: true,
          colour: true,
          otherNames: true,
          crystalInfo: {
            select: {
              info: true,
              colour: true,
            },
          },
        },
        distinct: ["name"],
      });
    } catch (dbError) {
      console.warn("Database query failed, using context file only:", dbError);
    }

    // Create a map of database crystals for quick lookup
    const dbCrystalMap = new Map(
      dbCrystals.map((c) => [c.name.toLowerCase(), c])
    );

    // Start with context file crystals (primary source)
    const result = contextCrystals.map((context) => {
      const dbCrystal = dbCrystalMap.get(context.name.toLowerCase());

      // Merge: prefer context file, but supplement with DB data if available
      const colors =
        context.colors.length > 0
          ? context.colors
          : [
              ...(dbCrystal?.colour || []),
              ...(dbCrystal?.crystalInfo?.colour || []),
            ];

      const otherNames =
        context.otherNames.length > 0
          ? context.otherNames
          : dbCrystal?.otherNames
          ? dbCrystal.otherNames.split(",").map((n) => n.trim())
          : [];

      return {
        name: context.name,
        description: context.visualDescription,
        colors: colors,
        otherNames: otherNames,
        prompt: createCLIPPrompt(context),
      };
    });

    // Add any database crystals not in context file
    dbCrystals.forEach((dbCrystal) => {
      const exists = result.some(
        (r) => r.name.toLowerCase() === dbCrystal.name.toLowerCase()
      );
      if (!exists) {
        const colors = [
          ...(dbCrystal.colour || []),
          ...(dbCrystal.crystalInfo?.colour || []),
        ];
        const description = dbCrystal.crystalInfo?.info || dbCrystal.bio || "";
        const otherNames = dbCrystal.otherNames
          ? dbCrystal.otherNames.split(",").map((n) => n.trim())
          : [];

        const descriptionParts: string[] = [dbCrystal.name];
        if (otherNames.length > 0) {
          descriptionParts.push(`also known as ${otherNames.join(" or ")}`);
        }
        if (colors.length > 0) {
          descriptionParts.push(`${colors.join(", ")} colored`);
        }
        if (description) {
          descriptionParts.push(description.substring(0, 200));
        } else {
          descriptionParts.push(`a crystal stone`);
        }

        result.push({
          name: dbCrystal.name,
          description: description || "",
          colors: colors,
          otherNames: otherNames,
          prompt: descriptionParts.join(", "),
        });
      }
    });

    return result;
  } catch (error) {
    console.error("Error fetching crystals:", error);
    // Fallback to basic names
    return [
      {
        name: "Amethyst",
        description: "Purple crystal",
        colors: ["purple", "violet"],
        otherNames: [],
        prompt: "Amethyst, purple crystal",
      },
      {
        name: "Rose Quartz",
        description: "Pink crystal",
        colors: ["pink", "rose"],
        otherNames: ["Pink Quartz"],
        prompt: "Rose Quartz, Pink Quartz, pink rose colored crystal",
      },
    ];
  }
}

/**
 * Identify crystal from image using CLIP visual analysis
 * Step 1: CLIP Interrogator analyzes the IMAGE visually
 * Step 2: Compare CLIP's visual understanding with crystal descriptions
 * This is TRUE visual matching - CLIP "sees" the image, not text!
 */
export async function identifyCrystal(
  imageUrl: string
): Promise<{ topMatches: TopMatches; confidence: number }> {
  try {
    // Step 1: Use CLIP Interrogator to analyze the IMAGE visually
    // This generates a description based on what CLIP SEES in the image
    // NOT text matching - CLIP analyzes visual features!
    const replicate = getReplicate();
    // Use CLIP Interrogator to analyze the image visually
    // This generates a description based on what CLIP SEES in the image
    // Latest version: 8151e1c9f47e696fa316146a2e35812ccf79cfc9eba05b11c7f450155102af70
    let imageAnalysis = (await replicate.run(
      "pharmapsychotic/clip-interrogator:8151e1c9f47e696fa316146a2e35812ccf79cfc9eba05b11c7f450155102af70",
      {
        input: {
          image: imageUrl,
          mode: "classic", // 'fast' for speed, 'classic' for better quality, 'best' for highest quality (but slower)
          clip_model_name: "ViT-L-14/openai",
        },
      }
    )) as string;

    // Filter out artistic/creative descriptions that CLIP Interrogator hallucinates
    // CLIP Interrogator was trained on art descriptions, social media, etc., so it often includes
    // irrelevant artistic references, style tags, and creative descriptions
    const irrelevantPhrases = [
      // Artistic references and social media
      /inspired by [^,]+/gi,
      /featured on [^,]+/gi,
      /reddit contest winner/gi,
      /pinterest/gi,
      /dribbble/gi,
      /pixiv/gi,
      /fffounding/gi,
      /arafed rock/gi,
      // Art styles and techniques
      /cloisonnism/gi,
      /rayonism/gi,
      /holography/gi,
      /nacre painting/gi,
      /macro photograph/gi,
      /digital rendering/gi,
      // Random creative/fantasy descriptions
      /jigsaw puzzle/gi,
      /magic frozen ice phoenix egg/gi,
      /sorceress casting/gi,
      /resin miniature/gi,
      /colored marble/gi,
      /crystaline celtic/gi,
      /earth and pastel colors/gi,
      /unrefined sparkling gold nugget/gi,
      /lustrous minerals/gi, // Too generic
      // Artist names and credits
      /by [A-Z][a-z]+ [A-Z][a-z]+/g,
      /mines, by [^,]+/gi,
      // Photo metadata
      /photo taken in \d{4}/gi,
      /made up of many bits of/gi,
      /northern france/gi,
      /with an explosion on the back/gi,
      /whole figure/gi,
      /inverse color/gi,
      /facets, \d+ \d+ \d+ \d+/gi,
      // Clean up common filler phrases
      /^a\s+/gi, // Remove leading "a " or "A "
      /\s+a\s+/gi, // Remove standalone "a" words
    ];

    // Remove irrelevant phrases
    let cleanedAnalysis = imageAnalysis;
    irrelevantPhrases.forEach((pattern) => {
      cleanedAnalysis = cleanedAnalysis.replace(pattern, "");
    });

    // Clean up punctuation and spacing
    cleanedAnalysis = cleanedAnalysis
      .replace(/,\s*,+/g, ",") // Remove multiple commas
      .replace(/,\s*,\s*/g, ",") // Remove double commas with spaces
      .replace(/^\s*,\s*/, "") // Remove leading comma
      .replace(/\s*,\s*$/, "") // Remove trailing comma
      .replace(/\s+/g, " ") // Normalize all whitespace (spaces, tabs, etc.)
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
      .trim();

    // Remove any remaining single-letter words or very short fragments
    cleanedAnalysis = cleanedAnalysis
      .split(",")
      .map((phrase) => phrase.trim())
      .filter((phrase) => phrase.length > 2 && !/^[a-z]\s*$/i.test(phrase)) // Remove single letters
      .join(", ")
      .trim();

    imageAnalysis = cleanedAnalysis || imageAnalysis; // Fallback to original if cleaned is empty

    console.log("CLIP visual analysis (cleaned):", imageAnalysis);

    // Step 2: Get crystals with context
    const crystals = await getCrystalsWithContext();
    console.log(`Found ${crystals.length} crystals in database`);

    // Step 3: Match CLIP's visual understanding with crystal descriptions
    // The imageAnalysis contains what CLIP VISUALLY detected
    // We match this against crystal properties semantically
    const imageDescLower = imageAnalysis.toLowerCase();

    // Extract visual characteristics from CLIP analysis (ignore crystal name guesses)
    // CLIP often hallucinates crystal names, so we focus on visual features
    const visualFeatures = {
      colors: [
        "blue",
        "green",
        "red",
        "purple",
        "violet",
        "pink",
        "rose",
        "yellow",
        "orange",
        "brown",
        "black",
        "white",
        "clear",
        "colorless",
        "golden",
        "silver",
        "gray",
        "grey",
        "tan",
        "cream",
        "turquoise",
        "aqua",
        "cyan",
        "indigo",
        "lavender",
        "amber",
        "honey",
        "cinnamon",
        "emerald",
        "forest",
        "olive",
        "lime",
        "peach",
        "salmon",
        "coral",
        "rust",
        "copper",
        "brass",
        "bronze",
      ],
      shapes: [
        "round",
        "spherical",
        "prismatic",
        "hexagonal",
        "cubic",
        "octahedral",
        "tabular",
        "bladed",
        "botryoidal",
        "radiating",
        "star",
        "cross",
        "dendritic",
        "fibrous",
        "needle",
        "crystal",
        "cluster",
        "massive",
        "granular",
        "stalactitic",
        "rosette",
        "flower",
        "geometric",
        "stepped",
      ],
      transparency: [
        "transparent",
        "translucent",
        "opaque",
        "clear",
        "see-through",
        "glass-like",
      ],
      texture: [
        "smooth",
        "rough",
        "glossy",
        "matte",
        "polished",
        "vitreous",
        "pearly",
        "silky",
        "waxy",
        "dull",
        "shiny",
        "reflective",
        "metallic",
        "adamantine",
        "resinous",
        "greasy",
        "earthy",
      ],
      patterns: [
        "banded",
        "striped",
        "speckled",
        "veined",
        "mottled",
        "swirling",
        "orbicular",
        "circular",
        "concentric",
        "parallel",
        "lacy",
        "floral",
        "dendritic",
        "tree-like",
        "landscape",
        "patterned",
      ],
      effects: [
        "iridescent",
        "opalescent",
        "chatoyant",
        "cat's eye",
        "asterism",
        "play of color",
        "labradorescence",
        "aventurescence",
        "colorful",
        "rainbow",
        "flashing",
        "glowing",
      ],
      size: ["large", "small", "tiny", "massive", "huge", "miniature"],
      general: [
        "stone",
        "crystal",
        "mineral",
        "gem",
        "gemstone",
        "rock",
        "specimen",
      ],
    };

    // Filter out background colors - CLIP often describes backgrounds
    // Look for phrases that indicate background vs foreground crystal
    const backgroundColorPhrases = [
      "white surface",
      "white background",
      "gray surface",
      "grey surface",
      "black background",
      "on white",
      "on gray",
      "on grey",
      "on black",
      "on brown",
      "on wood",
      "on fabric",
      "against white",
      "against gray",
      "against grey",
      "against black",
      "white base",
      "gray base",
      "grey base",
      "black base",
      "white table",
      "wooden table",
      "fabric background",
      "cloth background",
      "hand holding",
      "in hand",
      "on hand",
      "fingers",
      "palm",
    ];

    const isBackgroundColor = (color: string, desc: string) => {
      // Neutral colors are often backgrounds
      const neutralColors = [
        "white",
        "gray",
        "grey",
        "black",
        "brown",
        "tan",
        "cream",
      ];
      if (neutralColors.includes(color)) {
        // Check if color appears in background context
        return backgroundColorPhrases.some((phrase) => {
          const phraseLower = phrase.toLowerCase();
          if (phraseLower.includes(color)) {
            return desc.includes(phraseLower);
          }
          return false;
        });
      }
      return false;
    };

    // Extract colors, but be smart about background vs foreground
    // CLIP usually describes the main subject first, background later
    const detectedColorsRaw = visualFeatures.colors.filter((color) =>
      imageDescLower.includes(color)
    );

    // Score colors by position - earlier mentions are more likely to be the crystal
    const colorScores = detectedColorsRaw
      .map((color) => {
        const colorIndex = imageDescLower.indexOf(color);
        // Earlier mentions get higher scores (crystal is usually described first)
        const positionScore =
          colorIndex < 50
            ? 1.0
            : colorIndex < 100
            ? 0.8
            : colorIndex < 200
            ? 0.6
            : 0.4;
        return { color, index: colorIndex, score: positionScore };
      })
      .sort((a, b) => a.index - b.index); // Sort by position

    // Filter out background colors
    const detectedColors = colorScores
      .filter(({ color }) => {
        if (isBackgroundColor(color, imageDescLower)) {
          console.log(`Filtered out background color: ${color}`);
          return false;
        }
        return true;
      })
      .map(({ color }) => color); // Extract just the color names

    // If we filtered out too many colors, keep the first mentioned color (likely the crystal)
    // CLIP typically describes the main subject first
    if (detectedColors.length === 0 && detectedColorsRaw.length > 0) {
      // Find the first color mentioned in the description (likely the crystal)
      const firstColorMatch = colorScores
        .filter(({ color }) => !isBackgroundColor(color, imageDescLower))
        .sort((a, b) => a.index - b.index)[0]; // Get earliest non-background color

      if (firstColorMatch) {
        detectedColors.push(firstColorMatch.color);
        console.log(
          `Kept first-mentioned color (likely crystal): ${firstColorMatch.color}`
        );
      }
    }

    // Store color scores for later use in matching
    const colorScoreMap = new Map(
      colorScores.map(({ color, score }) => [color, score])
    );
    const detectedShapes = visualFeatures.shapes.filter((shape) =>
      imageDescLower.includes(shape)
    );
    const detectedTransparency = visualFeatures.transparency.filter((t) =>
      imageDescLower.includes(t)
    );
    const detectedTexture = visualFeatures.texture.filter((t) =>
      imageDescLower.includes(t)
    );
    const detectedPatterns = visualFeatures.patterns.filter((p) =>
      imageDescLower.includes(p)
    );
    const detectedEffects = visualFeatures.effects.filter((e) =>
      imageDescLower.includes(e)
    );

    console.log(
      `Visual features detected: colors=${detectedColors.join(
        ","
      )}, shapes=${detectedShapes.join(
        ","
      )}, transparency=${detectedTransparency.join(
        ","
      )}, patterns=${detectedPatterns.join(
        ","
      )}, effects=${detectedEffects.join(",")}`
    );

    const matches = crystals.map((crystal) => {
      let confidence = 0.0;
      const crystalContext = getCrystalContext(crystal.name);

      // Check if this is a combination crystal (needed for special handling)
      const isCombinationCrystal =
        crystal.name.toLowerCase().includes(" malachite") ||
        crystal.name.toLowerCase().includes(" in ") ||
        crystal.name.toLowerCase().includes(" seven") ||
        crystal.name.toLowerCase().includes(" aura");

      // PRIMARY: Color matching (most important visual characteristic)
      // Prioritize primary colors (first in list) over secondary colors
      const primaryColor = crystal.colors[0] || "";

      // Match colors more intelligently - handle color variations and combinations
      const matchedColors = crystal.colors.filter((color) => {
        const colorLower = color.toLowerCase();
        return detectedColors.some((dc) => {
          const dcLower = dc.toLowerCase();
          // Exact match
          if (dcLower === colorLower) return true;
          // Contains match (e.g., "blue-green" contains "blue")
          if (dcLower.includes(colorLower) || colorLower.includes(dcLower))
            return true;
          // Handle color combinations
          if (
            color === "blue-green" &&
            (detectedColors.includes("blue") ||
              detectedColors.includes("green"))
          )
            return true;
          if (
            color === "turquoise" &&
            (detectedColors.includes("blue") ||
              detectedColors.includes("green") ||
              detectedColors.includes("aqua"))
          )
            return true;
          if (color === "emerald" && detectedColors.includes("green"))
            return true;
          if (color === "rose" && detectedColors.includes("pink")) return true;
          return false;
        });
      });

      if (matchedColors.length > 0) {
        // Color match is important but not enough alone - start lower
        const colorMatchRatio =
          matchedColors.length / Math.max(crystal.colors.length, 1);
        // For combination crystals with multiple colors, matching multiple colors is very significant
        const isMultiColorCrystal = crystal.colors.length >= 3;
        const baseScore = isMultiColorCrystal ? 0.35 : 0.3;
        const maxScore = isMultiColorCrystal ? 0.6 : 0.55;
        let colorScore = baseScore + colorMatchRatio * (maxScore - baseScore);

        // Extra boost if PRIMARY color matches (most important)
        const primaryColorMatched =
          primaryColor &&
          detectedColors.some(
            (dc) =>
              dc.includes(primaryColor.toLowerCase()) ||
              primaryColor.toLowerCase().includes(dc)
          );
        if (primaryColorMatched) {
          colorScore += 0.1; // Boost for primary color match

          // Extra boost if primary color appears early in CLIP description (likely the crystal, not background)
          const primaryColorDetected = detectedColors.find(
            (dc) =>
              dc.includes(primaryColor.toLowerCase()) ||
              primaryColor.toLowerCase().includes(dc)
          );
          if (primaryColorDetected && colorScoreMap.has(primaryColorDetected)) {
            const positionScore =
              colorScoreMap.get(primaryColorDetected) || 0.5;
            // If color appears early (high position score), boost confidence
            if (positionScore > 0.8) {
              colorScore += 0.05; // Small boost for early mention
            }
          }
        }

        // Special boost for combination crystals when both component colors match
        // e.g., Azurite Malachite: blue + green = very strong signal
        if (isCombinationCrystal && matchedColors.length >= 2) {
          // If we match multiple colors from a combination crystal, boost significantly
          colorScore += 0.15; // Strong boost for multi-color combination match
        }

        confidence = Math.min(0.7, colorScore); // Increased max for combination crystals

        // STRONG boost if color matches crystal name (e.g., "Blue Apatite" + blue color)
        // This is a very strong indicator - if crystal is named after its color, it's likely correct
        const crystalNameLower = crystal.name.toLowerCase();
        const colorInName = matchedColors.some((color) => {
          const colorLower = color.toLowerCase();
          // Check if color word appears as a separate word in crystal name
          const nameWords = crystalNameLower.split(/\s+/);
          return (
            nameWords.includes(colorLower) ||
            nameWords.some(
              (word) =>
                word.startsWith(colorLower) || colorLower.startsWith(word)
            )
          );
        });

        if (colorInName) {
          // Color name match is a strong signal - boost significantly
          // Especially if it's the primary color
          const primaryColorInName =
            primaryColor &&
            crystalNameLower.includes(primaryColor.toLowerCase());
          const boost = primaryColorInName ? 0.3 : 0.2;
          confidence = Math.min(0.9, confidence + boost); // Strong boost for color-name match
        }
      }

      // SECONDARY: Visual features from crystal context
      // Distinctive features (transparency, effects, patterns) are MORE important than generic colors
      if (crystalContext) {
        // Match visual features (transparency, shape, texture)
        const contextFeatures = [
          ...crystalContext.visualFeatures,
          ...(crystalContext.colors || []),
        ];

        const matchedFeatures = contextFeatures.filter((feature) => {
          const featureLower = feature.toLowerCase();
          return (
            detectedShapes.includes(featureLower) ||
            detectedTransparency.includes(featureLower) ||
            detectedTexture.includes(featureLower) ||
            detectedPatterns.includes(featureLower) ||
            detectedEffects.includes(featureLower) ||
            detectedColors.some(
              (dc) => dc.includes(featureLower) || featureLower.includes(dc)
            )
          );
        });

        if (matchedFeatures.length > 0) {
          // More specific features matched = higher confidence
          // Patterns and effects are particularly distinctive
          const patternMatches = contextFeatures.filter((f) =>
            detectedPatterns.includes(f.toLowerCase())
          ).length;
          const effectMatches = contextFeatures.filter((f) =>
            detectedEffects.includes(f.toLowerCase())
          ).length;
          const transparencyMatches = contextFeatures.filter((f) =>
            detectedTransparency.includes(f.toLowerCase())
          ).length;

          const featureRatio =
            matchedFeatures.length / Math.max(contextFeatures.length, 1);

          // Base score from features - distinctive features get higher weight
          let baseScore = 0.25 + featureRatio * 0.35; // Max 0.6 from features alone

          // Strong bonuses for distinctive features
          const patternBonus = patternMatches > 0 ? 0.15 : 0; // Increased from 0.1
          const effectBonus = effectMatches > 0 ? 0.2 : 0; // Increased from 0.15 - effects are VERY distinctive
          const transparencyBonus = transparencyMatches > 0 ? 0.1 : 0; // New bonus for transparency matches

          // Special boost for crystals with very distinctive features
          // e.g., Selenite (white/clear/translucent), Angel Aura (iridescent/rainbow)
          const hasDistinctiveFeature =
            effectMatches > 0 ||
            (transparencyMatches > 0 && detectedTransparency.length > 0) ||
            patternMatches > 0;

          if (hasDistinctiveFeature && confidence < 0.5) {
            // If we have distinctive features but low confidence, boost significantly
            baseScore += 0.15;
          }

          const featureScore =
            baseScore + patternBonus + effectBonus + transparencyBonus;
          confidence = Math.max(confidence, Math.min(0.9, featureScore));
        }

        // Match visual description keywords (more specific = better)
        if (crystalContext.visualDescription) {
          const descLower = crystalContext.visualDescription.toLowerCase();
          const visualTerms = [
            ...detectedColors,
            ...detectedShapes,
            ...detectedTransparency,
            ...detectedTexture,
            ...detectedPatterns,
            ...detectedEffects,
          ];

          const matchedDescTerms = visualTerms.filter((term) =>
            descLower.includes(term)
          );
          if (matchedDescTerms.length > 0 && visualTerms.length > 0) {
            // Visual description match is strong indicator
            // More terms matched = higher confidence, but cap it
            const matchRatio = matchedDescTerms.length / visualTerms.length;
            const descScore = 0.25 + matchRatio * 0.3; // Max 0.55 from description
            confidence = Math.max(confidence, descScore);
          }
        }

        // Match keywords (but ignore generic ones)
        // Be VERY careful - only match keywords that CLIP actually detected as visual features
        if (crystalContext.keywords) {
          const meaningfulKeywords = crystalContext.keywords.filter((k) => {
            const kLower = k.toLowerCase();
            // Ignore ambiguous/generic words that might appear by chance
            const ignoreWords = [
              "crystal",
              "stone",
              "mineral",
              "lace",
              "agate",
              "quartz",
              "jade",
            ];
            if (ignoreWords.includes(kLower)) return false;
            // Don't double-count colors (already handled above)
            if (detectedColors.includes(kLower)) return false;
            return k.length > 3;
          });

          const matchedKeywords = meaningfulKeywords.filter((keyword) => {
            const keywordLower = keyword.toLowerCase();
            // STRICT: Only match if keyword appears in CLIP description AND matches detected visual features
            // This prevents false matches on words that happen to appear
            const inDescription = imageDescLower.includes(keywordLower);

            // Must match an actual detected visual feature
            const matchesFeature =
              detectedShapes.some((s) => keywordLower.includes(s)) ||
              detectedTransparency.some((t) => keywordLower.includes(t)) ||
              detectedTexture.some((t) => keywordLower.includes(t)) ||
              detectedPatterns.some((p) => keywordLower.includes(p)) ||
              detectedEffects.some((e) => keywordLower.includes(e));

            // Require BOTH: in description AND matches detected feature
            // This is strict to avoid false positives
            return inDescription && matchesFeature;
          });

          if (matchedKeywords.length > 0 && meaningfulKeywords.length > 0) {
            const keywordRatio =
              matchedKeywords.length / meaningfulKeywords.length;
            // Reduced weight - keywords are less reliable than direct visual features
            confidence = Math.max(confidence, 0.2 + keywordRatio * 0.15); // Max 0.35 from keywords
          }
        }
      }

      // TERTIARY: Description keyword matching (visual terms only)
      if (crystal.description) {
        const descLower = crystal.description.toLowerCase();
        const visualTerms = [
          ...detectedColors,
          ...detectedShapes,
          ...detectedTransparency,
          ...detectedTexture,
          ...detectedPatterns,
          ...detectedEffects,
        ];

        const matchedTerms = visualTerms.filter((term) =>
          descLower.includes(term)
        );
        if (matchedTerms.length > 0 && visualTerms.length > 0) {
          const termRatio = matchedTerms.length / visualTerms.length;
          confidence = Math.max(confidence, 0.2 + termRatio * 0.25); // Max 0.45 from description terms
        }
      }

      // BOOST: If CLIP mentions the crystal name directly, this is a strong signal
      // Especially important for combination crystals and specific names
      const crystalNameLower = crystal.name.toLowerCase();
      const nameWords = crystalNameLower.split(/\s+/);

      // Check if crystal name appears in CLIP description
      const nameMentioned =
        imageDescLower.includes(crystalNameLower) ||
        nameWords.some(
          (word) => word.length > 4 && imageDescLower.includes(word)
        );

      // Check if other names are mentioned
      const otherNameMentioned = crystal.otherNames.some((otherName) =>
        imageDescLower.includes(otherName.toLowerCase())
      );

      // Special handling for combination crystals: if CLIP mentions one component,
      // check if we also see visual evidence of the other component
      let componentMatchBoost = 0;
      if (isCombinationCrystal && crystalContext) {
        // For Azurite Malachite: detect based on blue+green color combination
        // Check both exact name match and if it's in the crystal name
        const isAzuriteMalachite =
          crystal.name.toLowerCase().includes("azurite") &&
          crystal.name.toLowerCase().includes("malachite");

        if (isAzuriteMalachite) {
          const azuriteMentioned = imageDescLower.includes("azurite");
          const malachiteMentioned = imageDescLower.includes("malachite");
          const greenDetected = detectedColors.some(
            (c) =>
              c.includes("green") ||
              c.includes("emerald") ||
              c.includes("turquoise")
          );
          const blueDetected = detectedColors.some(
            (c) => c.includes("blue") || c.includes("azure")
          );

          // Strong signal: both colors detected (blue + green = Azurite Malachite)
          // OR both component names mentioned
          // OR one component name + opposite color
          if (
            (blueDetected && greenDetected) ||
            (azuriteMentioned && malachiteMentioned) ||
            (azuriteMentioned && greenDetected) ||
            (malachiteMentioned && blueDetected)
          ) {
            componentMatchBoost = 0.35; // Increased from 0.3 - very strong boost
          } else if (azuriteMentioned || malachiteMentioned) {
            componentMatchBoost = 0.2; // Increased from 0.15
          }

          // ALWAYS boost if both blue and green detected (strong signal for Azurite Malachite)
          if (blueDetected && greenDetected) {
            componentMatchBoost = Math.max(componentMatchBoost, 0.35); // Increased from 0.3
          }
        }
        // For Unakite: green + pink combination
        else if (crystal.name.toLowerCase().includes("unakite")) {
          const greenDetected = detectedColors.some((c) => c.includes("green"));
          const pinkDetected = detectedColors.some(
            (c) =>
              c.includes("pink") || c.includes("rose") || c.includes("salmon")
          );
          const mottledDetected =
            detectedPatterns.includes("mottled") ||
            imageDescLower.includes("mottled");

          if ((greenDetected && pinkDetected) || mottledDetected) {
            componentMatchBoost = 0.3; // Strong boost for green+pink or mottled pattern
          } else if (greenDetected || pinkDetected) {
            componentMatchBoost = 0.15;
          }
        }
        // For Lepidolite Mica: look for mica-specific features
        else if (
          crystal.name.toLowerCase().includes("lepidolite") ||
          crystal.name.toLowerCase().includes("mica")
        ) {
          const flakyDetected =
            detectedTexture.includes("flaky") ||
            imageDescLower.includes("flaky");
          const scalyDetected =
            detectedTexture.includes("scaly") ||
            imageDescLower.includes("scaly");
          const layeredDetected =
            imageDescLower.includes("layered") ||
            imageDescLower.includes("sheet");
          const pinkDetected = detectedColors.some(
            (c) =>
              c.includes("pink") ||
              c.includes("purple") ||
              c.includes("lavender")
          );

          if (
            (flakyDetected || scalyDetected || layeredDetected) &&
            pinkDetected
          ) {
            componentMatchBoost = 0.3; // Strong boost for mica features + pink
          } else if (flakyDetected || scalyDetected || layeredDetected) {
            componentMatchBoost = 0.2; // Boost for mica features
          }
        }
        // For other combination crystals, boost if multiple components detected
        else if (crystalContext.keywords) {
          const componentKeywords = crystalContext.keywords.filter(
            (k) => k.length > 4
          );
          const mentionedComponents = componentKeywords.filter((k) =>
            imageDescLower.includes(k.toLowerCase())
          );
          if (mentionedComponents.length >= 2) {
            componentMatchBoost = 0.2; // Boost for multiple component mentions
          } else if (mentionedComponents.length === 1) {
            componentMatchBoost = 0.1;
          }
        }
      }

      // Apply component boost FIRST (before name matching) for combination crystals
      // This ensures blue+green detection boosts Azurite Malachite even without name mention
      if (componentMatchBoost > 0) {
        confidence = Math.min(0.95, confidence + componentMatchBoost);
      }

      if (nameMentioned || otherNameMentioned) {
        // Strong boost if name is mentioned - CLIP saw something that matches
        // For combination crystals, this is especially important
        if (confidence > 0.3) {
          // Bigger boost if we already have some visual match
          const boost = confidence > 0.5 ? 0.15 : 0.25;
          confidence = Math.min(0.95, confidence + boost);
        } else {
          // Even if confidence is low, name match is significant
          confidence = Math.max(0.4, confidence + 0.2);
        }
      }

      // Special handling for combination crystals - boost if CLIP mentions component minerals
      if (crystalContext && crystalContext.keywords) {
        const componentMentions = crystalContext.keywords.filter((keyword) => {
          const keywordLower = keyword.toLowerCase();
          // Look for component minerals mentioned in CLIP description
          // Check both exact match and word boundaries
          const exactMatch = imageDescLower.includes(keywordLower);
          const wordBoundaryMatch = new RegExp(`\\b${keywordLower}\\b`).test(
            imageDescLower
          );
          return (
            (exactMatch || wordBoundaryMatch) &&
            keywordLower.length > 3 && // Avoid very short words
            !["crystal", "stone", "mineral", "colored"].includes(keywordLower)
          );
        });

        if (componentMentions.length > 0) {
          // Multiple component mentions = stronger signal for combination crystals
          // For combination crystals, component mentions are very important
          const isCombinationCrystal =
            crystal.name.toLowerCase().includes(" in ") ||
            crystal.name.toLowerCase().includes(" malachite") ||
            crystal.name.toLowerCase().includes(" seven") ||
            crystal.name.toLowerCase().includes(" aura");

          if (isCombinationCrystal) {
            // Strong boost for combination crystals when components are detected
            const componentBoost = Math.min(
              0.2,
              componentMentions.length * 0.05
            );
            confidence = Math.min(0.95, confidence + componentBoost);
          } else {
            // Smaller boost for single crystals
            const componentBoost = Math.min(
              0.1,
              componentMentions.length * 0.03
            );
            confidence = Math.min(0.95, confidence + componentBoost);
          }
        }
      }

      // Penalty: If crystal has background colors that we filtered out, reduce confidence
      // This prevents crystals with "white" or other background colors from scoring too high
      // when those colors are from the background, not the crystal
      const hasFilteredBackgroundColors = crystal.colors.some((color) => {
        const colorLower = color.toLowerCase();
        const neutralColors = [
          "white",
          "gray",
          "grey",
          "black",
          "brown",
          "tan",
          "cream",
        ];
        return (
          neutralColors.includes(colorLower) &&
          isBackgroundColor(colorLower, imageDescLower)
        );
      });

      if (hasFilteredBackgroundColors && confidence > 0.5) {
        // Reduce confidence if crystal claims to have background colors that we filtered out
        // This suggests the crystal might be matching on background, not the crystal itself
        confidence = Math.max(0.4, confidence - 0.1);
      }

      // Final confidence: combine all indicators, but be conservative
      // High confidence (0.8+) should require multiple strong matches
      // Very high confidence (0.9+) should require distinctive features (patterns/effects) + color + features
      return {
        crystal: crystal.name,
        confidence: Math.min(0.95, Math.max(0.0, confidence)),
      };
    });

    // Sort by confidence (semantic similarity) and get top 5
    // Filter out matches with very low confidence (below 0.1)
    const topMatches = matches
      .filter((m) => m.confidence > 0.1) // Only include matches with meaningful confidence
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5)
      .map((match) => ({
        crystal: match.crystal,
        confidence: match.confidence,
      }));

    console.log(
      `Found ${topMatches.length} matches after filtering (from ${matches.length} total)`
    );
    if (topMatches.length === 0 && matches.length > 0) {
      // Show top 5 even if confidence is low, for debugging
      const debugMatches = matches
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);
      console.log(
        "Debug - Top 5 matches (including low confidence):",
        debugMatches.map(
          (m) => `${m.crystal}: ${(m.confidence * 100).toFixed(1)}%`
        )
      );
    }

    // Normalize confidence scores to make them more interpretable
    // But be conservative - don't inflate scores artificially
    if (topMatches.length > 0 && topMatches[0].confidence > 0) {
      const maxConfidence = topMatches[0].confidence;

      // Only normalize if scores are very close (within 5%)
      // This prevents artificially inflating scores
      if (topMatches.length > 1) {
        const secondConfidence = topMatches[1].confidence;
        const diff = maxConfidence - secondConfidence;

        // If top match is significantly better (>10% difference), keep as is
        // If very close (<5% difference), slightly differentiate
        if (diff < 0.05 && maxConfidence > 0.5) {
          // Slightly boost top match and reduce others to show differentiation
          topMatches[0].confidence = Math.min(0.9, maxConfidence + 0.05);
          topMatches.slice(1).forEach((match) => {
            match.confidence = Math.max(0.1, match.confidence - 0.05);
          });
        } else if (diff >= 0.1) {
          // Clear winner - boost it slightly if it's already strong
          if (maxConfidence > 0.7) {
            topMatches[0].confidence = Math.min(0.95, maxConfidence + 0.05);
          }
        }
      }
    }

    console.log(
      "Top matches:",
      topMatches.map((m) => `${m.crystal}: ${(m.confidence * 100).toFixed(1)}%`)
    );

    return {
      topMatches: topMatches as TopMatches,
      confidence: topMatches[0]?.confidence || 0,
    };
  } catch (error) {
    console.error("Replicate identification error:", error);
    throw new Error(
      `Failed to identify crystal: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Remove background from image using Replicate rembg model
 */
export async function removeBackground(imageUrl: string): Promise<string> {
  try {
    const replicate = getReplicate();
    const output = await replicate.run(
      "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003f",
      {
        input: {
          image: imageUrl,
        },
      }
    );

    // Return the processed image URL
    return output as string;
  } catch (error) {
    console.error("Background removal error:", error);
    throw new Error("Failed to remove background");
  }
}

export default getReplicate;
