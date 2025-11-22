/**
 * Crystal Context for AI/CLIP Matching
 * Rich visual descriptions optimized for image-text matching
 * These descriptions focus on VISUAL features CLIP can detect
 */

export interface CrystalContext {
  name: string;
  otherNames: string[];
  visualDescription: string; // Rich visual description for CLIP
  colors: string[];
  visualFeatures: string[]; // Texture, transparency, shape, etc.
  keywords: string[]; // Additional keywords for matching
}

/**
 * Crystal context database optimized for CLIP visual matching
 * Focuses on visual features: colors, textures, transparency, shapes
 */
export const CRYSTAL_CONTEXT: Record<string, CrystalContext> = {
  Amethyst: {
    name: "Amethyst",
    otherNames: ["Purple Quartz", "Lavender Quartz"],
    visualDescription:
      "A purple to violet colored translucent crystal, typically hexagonal in shape with visible striations. Often appears deep purple, lavender, or pale violet. Can be transparent to translucent with a vitreous luster.",
    colors: ["purple", "violet", "lavender"],
    visualFeatures: [
      "translucent",
      "transparent",
      "hexagonal",
      "striated",
      "vitreous",
      "smooth",
    ],
    keywords: ["purple crystal", "violet stone", "quartz", "geometric"],
  },
  "Rose Quartz": {
    name: "Rose Quartz",
    otherNames: ["Pink Quartz", "Love Stone"],
    visualDescription:
      "A pink to rose colored translucent to opaque crystal, often with a milky or cloudy appearance. Typically smooth and polished, ranging from pale pink to deep rose. Can have a vitreous to waxy luster.",
    colors: ["pink", "rose", "peach"],
    visualFeatures: [
      "translucent",
      "opaque",
      "milky",
      "cloudy",
      "smooth",
      "polished",
      "waxy",
    ],
    keywords: ["pink crystal", "rose stone", "quartz", "milky"],
  },
  "Clear Quartz": {
    name: "Clear Quartz",
    otherNames: ["Rock Crystal", "Crystal Quartz"],
    visualDescription:
      "A transparent to translucent colorless crystal, often perfectly clear like glass. Hexagonal prismatic shape with pointed terminations. Very shiny and reflective with vitreous luster.",
    colors: ["clear", "white", "colorless"],
    visualFeatures: [
      "transparent",
      "translucent",
      "clear",
      "shiny",
      "reflective",
      "hexagonal",
      "prismatic",
      "pointed",
    ],
    keywords: ["clear crystal", "transparent stone", "glass-like", "quartz"],
  },
  Citrine: {
    name: "Citrine",
    otherNames: ["Yellow Quartz", "Golden Quartz"],
    visualDescription:
      "A yellow to golden orange colored transparent to translucent crystal. Bright and sunny in appearance, ranging from pale yellow to deep amber. Hexagonal shape with vitreous luster.",
    colors: ["yellow", "golden", "orange", "amber"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bright",
      "shiny",
      "hexagonal",
      "vitreous",
    ],
    keywords: ["yellow crystal", "golden stone", "sunny", "quartz"],
  },
  Jade: {
    name: "Jade",
    otherNames: ["Jadeite", "Nephrite"],
    visualDescription:
      "A green to white colored opaque to translucent stone, typically smooth and polished. Can range from pale green to deep emerald green. Often has a waxy to vitreous luster and appears very smooth.",
    colors: ["green", "emerald", "white", "pale green"],
    visualFeatures: [
      "opaque",
      "translucent",
      "smooth",
      "polished",
      "waxy",
      "dense",
    ],
    keywords: ["green stone", "jade", "smooth", "polished"],
  },
  Obsidian: {
    name: "Obsidian",
    otherNames: ["Volcanic Glass", "Black Glass"],
    visualDescription:
      "A black to dark colored opaque volcanic glass, very shiny and reflective like black glass. Can have a conchoidal fracture pattern. Often appears jet black with a glassy luster.",
    colors: ["black", "dark", "jet black"],
    visualFeatures: [
      "opaque",
      "glassy",
      "shiny",
      "reflective",
      "smooth",
      "conchoidal",
    ],
    keywords: ["black glass", "volcanic glass", "shiny black", "glassy"],
  },
  "Tiger Eye": {
    name: "Tiger Eye",
    otherNames: ["Tigers Eye", "Tiger's Eye"],
    visualDescription:
      "A golden brown to yellow colored stone with distinctive chatoyant (cat's eye) effect. Shows silky bands of light that move across the surface. Opaque with a silky to vitreous luster.",
    colors: ["golden", "brown", "yellow", "amber"],
    visualFeatures: [
      "opaque",
      "chatoyant",
      "silky",
      "banded",
      "striped",
      "fibrous",
    ],
    keywords: ["tiger eye", "cat's eye", "chatoyant", "banded", "silky"],
  },
  "Lapis Lazuli": {
    name: "Lapis Lazuli",
    otherNames: ["Lapis", "Blue Stone"],
    visualDescription:
      "A deep blue to azure colored opaque stone, often with white calcite veins and golden pyrite flecks. Rich royal blue color, typically polished smooth. Opaque with a vitreous to dull luster.",
    colors: ["blue", "azure", "royal blue", "deep blue"],
    visualFeatures: ["opaque", "polished", "speckled", "veined", "dense"],
    keywords: ["blue stone", "lapis", "royal blue", "speckled"],
  },
  Turquoise: {
    name: "Turquoise",
    otherNames: ["Turkish Stone"],
    visualDescription:
      "A blue-green to sky blue colored opaque stone, often with black or brown veining (matrix). Can range from pale blue-green to deep turquoise. Typically polished smooth with a waxy to vitreous luster.",
    colors: ["blue", "green", "turquoise", "sky blue", "blue-green"],
    visualFeatures: [
      "opaque",
      "polished",
      "veined",
      "matrix",
      "waxy",
      "smooth",
    ],
    keywords: ["turquoise", "blue-green", "veined", "matrix"],
  },
  Quartz: {
    name: "Quartz",
    otherNames: ["Rock Crystal"],
    visualDescription:
      "A transparent to translucent crystal, can be colorless or various colors. Hexagonal prismatic shape, often with pointed terminations. Vitreous luster, can be very clear or milky.",
    colors: ["clear", "white", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["quartz", "crystal", "hexagonal"],
  },
  Agate: {
    name: "Agate",
    otherNames: ["Banded Agate"],
    visualDescription:
      "A banded or layered stone with distinctive parallel bands of different colors. Can be translucent to opaque, often polished smooth. Shows concentric or parallel banding patterns.",
    colors: ["various", "banded", "multicolored"],
    visualFeatures: [
      "banded",
      "layered",
      "translucent",
      "opaque",
      "polished",
      "concentric",
    ],
    keywords: ["agate", "banded", "layered", "striped"],
  },
  Carnelian: {
    name: "Carnelian",
    otherNames: ["Red Agate", "Sard"],
    visualDescription:
      "An orange-red to red colored translucent to opaque stone, often banded. Can range from pale orange to deep red. Typically polished smooth with a vitreous to waxy luster.",
    colors: ["red", "orange", "orange-red"],
    visualFeatures: [
      "translucent",
      "opaque",
      "banded",
      "polished",
      "vitreous",
      "waxy",
    ],
    keywords: ["carnelian", "red agate", "orange stone"],
  },
  Moonstone: {
    name: "Moonstone",
    otherNames: ["Adularia"],
    visualDescription:
      "A white to bluish white colored translucent stone with a distinctive adularescent (moonlight) sheen. Can appear milky white with a blue flash. Translucent with a pearly to vitreous luster.",
    colors: ["white", "blue-white", "pearly"],
    visualFeatures: [
      "translucent",
      "adularescent",
      "pearly",
      "milky",
      "shimmering",
    ],
    keywords: ["moonstone", "pearly", "shimmering", "adularescent"],
  },
  Sunstone: {
    name: "Sunstone",
    otherNames: ["Aventurine Feldspar"],
    visualDescription:
      "An orange to red colored translucent stone with sparkling inclusions (aventurescence). Can appear golden or orange with glittery flecks. Translucent with a vitreous luster.",
    colors: ["orange", "red", "golden"],
    visualFeatures: [
      "translucent",
      "sparkling",
      "glittery",
      "inclusions",
      "vitreous",
    ],
    keywords: ["sunstone", "sparkling", "glittery", "golden"],
  },
  Labradorite: {
    name: "Labradorite",
    otherNames: ["Spectrolite"],
    visualDescription:
      "A dark gray to black colored stone with iridescent flashes of blue, green, gold, and purple (labradorescence). Opaque to translucent, typically polished smooth. Shows colorful flashes when moved.",
    colors: ["gray", "black", "iridescent", "multicolored"],
    visualFeatures: [
      "opaque",
      "translucent",
      "iridescent",
      "polished",
      "colorful flashes",
    ],
    keywords: ["labradorite", "iridescent", "colorful", "flashing"],
  },
  Malachite: {
    name: "Malachite",
    otherNames: ["Green Copper"],
    visualDescription:
      "A bright green colored opaque stone with distinctive concentric banding patterns. Rich emerald to forest green color with darker green bands. Opaque with a silky to vitreous luster.",
    colors: ["green", "emerald", "forest green"],
    visualFeatures: ["opaque", "banded", "concentric", "silky", "polished"],
    keywords: ["malachite", "green", "banded", "concentric"],
  },
  Hematite: {
    name: "Hematite",
    otherNames: ["Iron Ore"],
    visualDescription:
      "A dark gray to black metallic stone, very shiny and reflective like polished metal. Can appear silver-gray when polished. Opaque with a metallic to submetallic luster.",
    colors: ["black", "gray", "silver", "metallic"],
    visualFeatures: ["opaque", "metallic", "shiny", "reflective", "polished"],
    keywords: ["hematite", "metallic", "shiny", "silver"],
  },
  Pyrite: {
    name: "Pyrite",
    otherNames: ["Fool's Gold"],
    visualDescription:
      "A brassy yellow to golden colored metallic stone with cubic or pyritohedral crystals. Very shiny and reflective like gold. Opaque with a metallic luster, often forms cubic crystals.",
    colors: ["golden", "yellow", "brass", "metallic"],
    visualFeatures: ["opaque", "metallic", "shiny", "cubic", "crystalline"],
    keywords: ["pyrite", "fool's gold", "metallic", "cubic"],
  },
  Fluorite: {
    name: "Fluorite",
    otherNames: ["Fluorspar"],
    visualDescription:
      "A colorful transparent to translucent crystal, can be purple, green, blue, yellow, or colorless. Often shows cubic or octahedral crystal forms. Vitreous luster, can be very clear.",
    colors: ["purple", "green", "blue", "yellow", "colorless", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "cubic",
      "octahedral",
      "vitreous",
      "clear",
    ],
    keywords: ["fluorite", "colorful", "cubic", "crystal"],
  },
  Selenite: {
    name: "Selenite",
    otherNames: ["Satin Spar"],
    visualDescription:
      "A white to colorless transparent to translucent crystal with a silky or satiny appearance. Often fibrous with parallel striations. Can be very clear or have a pearly sheen.",
    colors: ["white", "colorless", "clear"],
    visualFeatures: [
      "transparent",
      "translucent",
      "silky",
      "satiny",
      "fibrous",
      "striated",
    ],
    keywords: ["selenite", "silky", "satiny", "fibrous"],
  },
  "Black Tourmaline": {
    name: "Black Tourmaline",
    otherNames: ["Schorl"],
    visualDescription:
      "A black to dark brown opaque crystal with a vitreous to resinous luster. Often forms long prismatic crystals with striated surfaces. Can appear jet black and very shiny.",
    colors: ["black", "dark brown"],
    visualFeatures: [
      "opaque",
      "prismatic",
      "striated",
      "vitreous",
      "resinous",
      "shiny",
    ],
    keywords: ["black tourmaline", "schorl", "prismatic", "striated"],
  },
  "Green Tourmaline": {
    name: "Green Tourmaline",
    otherNames: ["Verdelite"],
    visualDescription:
      "A green colored transparent to translucent crystal, ranging from pale green to deep emerald. Prismatic crystal form with vitreous luster. Can be very clear and bright.",
    colors: ["green", "emerald", "forest green"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "bright",
      "clear",
    ],
    keywords: ["green tourmaline", "verdelite", "prismatic", "green crystal"],
  },
  "Pink Tourmaline": {
    name: "Pink Tourmaline",
    otherNames: ["Rubellite"],
    visualDescription:
      "A pink to red colored transparent to translucent crystal. Can range from pale pink to deep rose or red. Prismatic form with vitreous luster, often very clear and bright.",
    colors: ["pink", "rose", "red"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "bright",
      "clear",
    ],
    keywords: ["pink tourmaline", "rubellite", "pink crystal", "prismatic"],
  },
  "Watermelon Tourmaline": {
    name: "Watermelon Tourmaline",
    otherNames: ["Bicolor Tourmaline"],
    visualDescription:
      "A multicolored crystal showing pink center with green outer layer, resembling a watermelon slice. Transparent to translucent with vitreous luster. Distinctive color zoning.",
    colors: ["pink", "green", "multicolored"],
    visualFeatures: [
      "transparent",
      "translucent",
      "zoned",
      "multicolored",
      "vitreous",
    ],
    keywords: ["watermelon tourmaline", "bicolor", "zoned", "multicolored"],
  },
  Garnet: {
    name: "Garnet",
    otherNames: ["Almandine", "Pyrope"],
    visualDescription:
      "A deep red to reddish-brown transparent to translucent crystal, often appearing dark red or burgundy. Can form dodecahedral or trapezohedral crystals. Vitreous to resinous luster.",
    colors: ["red", "burgundy", "dark red", "brown-red"],
    visualFeatures: [
      "transparent",
      "translucent",
      "dodecahedral",
      "vitreous",
      "resinous",
    ],
    keywords: ["garnet", "red crystal", "dark red", "dodecahedral"],
  },
  Peridot: {
    name: "Peridot",
    otherNames: ["Olivine"],
    visualDescription:
      "A bright yellow-green to olive green transparent to translucent crystal. Very distinctive lime green color. Vitreous luster, often appears bright and clear.",
    colors: ["green", "yellow-green", "olive", "lime"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bright",
      "vitreous",
      "clear",
    ],
    keywords: ["peridot", "olivine", "lime green", "yellow-green"],
  },
  Topaz: {
    name: "Topaz",
    otherNames: ["Imperial Topaz"],
    visualDescription:
      "A transparent crystal that can be colorless, blue, yellow, pink, or golden. Very clear and bright with vitreous luster. Often forms prismatic crystals with flat terminations.",
    colors: ["blue", "yellow", "pink", "golden", "colorless"],
    visualFeatures: ["transparent", "prismatic", "vitreous", "clear", "bright"],
    keywords: ["topaz", "clear crystal", "prismatic", "bright"],
  },
  Aquamarine: {
    name: "Aquamarine",
    otherNames: ["Blue Beryl"],
    visualDescription:
      "A pale blue to blue-green transparent crystal, often very clear and bright like sea water. Hexagonal prismatic form with vitreous luster. Can range from pale sky blue to deeper blue.",
    colors: ["blue", "blue-green", "sky blue", "pale blue"],
    visualFeatures: [
      "transparent",
      "hexagonal",
      "prismatic",
      "vitreous",
      "clear",
      "bright",
    ],
    keywords: ["aquamarine", "blue beryl", "sky blue", "clear blue"],
  },
  Emerald: {
    name: "Emerald",
    otherNames: ["Green Beryl"],
    visualDescription:
      "A deep green transparent to translucent crystal, rich emerald green color. Often contains inclusions. Hexagonal prismatic form with vitreous luster. Can be very dark green.",
    colors: ["green", "emerald", "deep green"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
      "inclusions",
    ],
    keywords: ["emerald", "green beryl", "deep green", "emerald green"],
  },
  Ruby: {
    name: "Ruby",
    otherNames: ["Red Corundum"],
    visualDescription:
      "A deep red to pink-red transparent to translucent crystal. Rich red color, can be very dark or bright red. Hexagonal form with vitreous to adamantine luster. Often very clear.",
    colors: ["red", "deep red", "pink-red", "crimson"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "vitreous",
      "adamantine",
      "clear",
    ],
    keywords: ["ruby", "red corundum", "deep red", "red crystal"],
  },
  Sapphire: {
    name: "Sapphire",
    otherNames: ["Blue Corundum"],
    visualDescription:
      "A blue transparent to translucent crystal, ranging from pale blue to deep royal blue. Can also be pink, yellow, or other colors. Hexagonal form with vitreous to adamantine luster.",
    colors: ["blue", "royal blue", "pale blue", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "vitreous",
      "adamantine",
    ],
    keywords: ["sapphire", "blue corundum", "royal blue", "blue crystal"],
  },
  Diamond: {
    name: "Diamond",
    otherNames: ["Brilliant"],
    visualDescription:
      "A transparent colorless crystal, extremely clear and brilliant. Can also be yellow, brown, or other colors. Octahedral or cubic form with adamantine luster. Very shiny and reflective.",
    colors: ["colorless", "white", "yellow", "brown", "various"],
    visualFeatures: [
      "transparent",
      "octahedral",
      "cubic",
      "adamantine",
      "brilliant",
      "shiny",
    ],
    keywords: ["diamond", "brilliant", "clear", "shiny"],
  },
  Opal: {
    name: "Opal",
    otherNames: ["Precious Opal"],
    visualDescription:
      "A white to black colored stone with iridescent play of color (opalescence). Can show flashes of rainbow colors. Translucent to opaque with a waxy to vitreous luster.",
    colors: ["white", "black", "iridescent", "multicolored"],
    visualFeatures: [
      "translucent",
      "opaque",
      "iridescent",
      "opalescent",
      "waxy",
      "colorful",
    ],
    keywords: ["opal", "iridescent", "opalescent", "rainbow"],
  },
  Amber: {
    name: "Amber",
    otherNames: ["Fossil Resin"],
    visualDescription:
      "A yellow to orange colored translucent to transparent organic material. Can range from pale yellow to deep orange or brown. Often contains inclusions. Waxy to resinous luster.",
    colors: ["yellow", "orange", "brown", "golden"],
    visualFeatures: [
      "transparent",
      "translucent",
      "waxy",
      "resinous",
      "inclusions",
    ],
    keywords: ["amber", "fossil resin", "yellow", "orange"],
  },
  Coral: {
    name: "Coral",
    otherNames: ["Red Coral"],
    visualDescription:
      "A pink to red colored opaque organic material with a smooth, polished appearance. Can range from pale pink to deep red. Often shows tree-like branching patterns. Dull to vitreous luster.",
    colors: ["pink", "red", "orange", "white"],
    visualFeatures: ["opaque", "smooth", "polished", "branching", "dull"],
    keywords: ["coral", "red coral", "pink", "organic"],
  },
  Pearl: {
    name: "Pearl",
    otherNames: ["Natural Pearl"],
    visualDescription:
      "A white to cream colored organic gem with a distinctive pearly luster. Can also be black, pink, or other colors. Smooth, rounded surface with iridescent sheen. Opaque.",
    colors: ["white", "cream", "pink", "black", "various"],
    visualFeatures: ["opaque", "pearly", "smooth", "rounded", "iridescent"],
    keywords: ["pearl", "pearly", "smooth", "iridescent"],
  },
  Kyanite: {
    name: "Kyanite",
    otherNames: ["Disthene"],
    visualDescription:
      "A blue to blue-green colored transparent to translucent crystal. Often shows different hardness in different directions. Bladed or tabular crystal form with vitreous to pearly luster.",
    colors: ["blue", "blue-green", "white"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bladed",
      "tabular",
      "vitreous",
      "pearly",
    ],
    keywords: ["kyanite", "blue crystal", "bladed", "tabular"],
  },
  Tanzanite: {
    name: "Tanzanite",
    otherNames: ["Blue Zoisite"],
    visualDescription:
      "A blue to violet colored transparent to translucent crystal. Can show pleochroism (different colors from different angles). Prismatic form with vitreous luster. Rich blue-violet color.",
    colors: ["blue", "violet", "blue-violet"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "pleochroic",
    ],
    keywords: ["tanzanite", "blue zoisite", "blue-violet", "pleochroic"],
  },
  Alexandrite: {
    name: "Alexandrite",
    otherNames: ["Chrysoberyl"],
    visualDescription:
      "A color-changing crystal that appears green in daylight and red under incandescent light. Transparent to translucent with vitreous to adamantine luster. Very rare and distinctive.",
    colors: ["green", "red", "color-changing"],
    visualFeatures: [
      "transparent",
      "translucent",
      "color-changing",
      "vitreous",
      "adamantine",
    ],
    keywords: ["alexandrite", "color-changing", "green", "red"],
  },
  Apatite: {
    name: "Apatite",
    otherNames: ["Phosphorite"],
    visualDescription:
      "A green, blue, yellow, or purple colored transparent to translucent crystal. Can be very bright and clear. Hexagonal prismatic form with vitreous luster.",
    colors: ["green", "blue", "yellow", "purple"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["apatite", "colorful", "hexagonal", "prismatic"],
  },
  Aventurine: {
    name: "Aventurine",
    otherNames: ["Green Quartz"],
    visualDescription:
      "A green colored translucent to opaque stone with sparkling inclusions (aventurescence). Can also be blue, orange, or other colors. Polished smooth with vitreous luster.",
    colors: ["green", "blue", "orange", "various"],
    visualFeatures: [
      "translucent",
      "opaque",
      "sparkling",
      "polished",
      "vitreous",
    ],
    keywords: ["aventurine", "sparkling", "green quartz", "glittery"],
  },
  Bloodstone: {
    name: "Bloodstone",
    otherNames: ["Heliotrope"],
    visualDescription:
      "A dark green opaque stone with red spots or streaks resembling blood. Polished smooth, often appears dark green with red flecks. Opaque with a vitreous to dull luster.",
    colors: ["green", "dark green", "red"],
    visualFeatures: ["opaque", "polished", "speckled", "vitreous", "dull"],
    keywords: ["bloodstone", "heliotrope", "red spots", "dark green"],
  },
  Calcite: {
    name: "Calcite",
    otherNames: ["Lime Spar"],
    visualDescription:
      "A colorless to white transparent to translucent crystal, can also be yellow, orange, or other colors. Rhombohedral crystal form with vitreous to pearly luster. Often very clear.",
    colors: ["colorless", "white", "yellow", "orange", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "rhombohedral",
      "vitreous",
      "pearly",
    ],
    keywords: ["calcite", "rhombohedral", "clear", "colorful"],
  },
  Celestite: {
    name: "Celestite",
    otherNames: ["Celestine"],
    visualDescription:
      "A pale blue to colorless transparent to translucent crystal. Often forms tabular or prismatic crystals. Very delicate and fragile. Vitreous to pearly luster.",
    colors: ["blue", "pale blue", "colorless"],
    visualFeatures: [
      "transparent",
      "translucent",
      "tabular",
      "prismatic",
      "vitreous",
      "pearly",
    ],
    keywords: ["celestite", "celestine", "pale blue", "tabular"],
  },
  Chalcedony: {
    name: "Chalcedony",
    otherNames: ["Microcrystalline Quartz"],
    visualDescription:
      "A translucent to opaque stone, can be white, blue, gray, or other colors. Often banded or layered. Smooth and polished with waxy to vitreous luster.",
    colors: ["white", "blue", "gray", "various"],
    visualFeatures: [
      "translucent",
      "opaque",
      "banded",
      "smooth",
      "polished",
      "waxy",
    ],
    keywords: ["chalcedony", "banded", "smooth", "waxy"],
  },
  Charoite: {
    name: "Charoite",
    otherNames: [],
    visualDescription:
      "A purple to violet colored opaque stone with distinctive swirling patterns. Rich purple color with white or gray swirls. Polished smooth with silky to vitreous luster.",
    colors: ["purple", "violet"],
    visualFeatures: ["opaque", "swirling", "polished", "silky", "vitreous"],
    keywords: ["charoite", "purple", "swirling", "patterned"],
  },
  Chrysocolla: {
    name: "Chrysocolla",
    otherNames: [],
    visualDescription:
      "A blue-green to green colored opaque stone, often with black veining. Can range from turquoise blue to green. Polished smooth with vitreous to dull luster.",
    colors: ["blue", "green", "blue-green", "turquoise"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous", "dull"],
    keywords: ["chrysocolla", "blue-green", "veined", "turquoise"],
  },
  Chrysoprase: {
    name: "Chrysoprase",
    otherNames: ["Green Chalcedony"],
    visualDescription:
      "A bright apple green colored translucent to opaque stone. Very distinctive bright green color. Polished smooth with waxy to vitreous luster.",
    colors: ["green", "apple green"],
    visualFeatures: ["translucent", "opaque", "polished", "waxy", "vitreous"],
    keywords: ["chrysoprase", "apple green", "green chalcedony", "bright"],
  },
  Danburite: {
    name: "Danburite",
    otherNames: [],
    visualDescription:
      "A colorless to pale yellow transparent crystal. Very clear and bright. Prismatic crystal form with vitreous luster. Often appears glass-like.",
    colors: ["colorless", "white", "pale yellow"],
    visualFeatures: [
      "transparent",
      "prismatic",
      "vitreous",
      "clear",
      "glass-like",
    ],
    keywords: ["danburite", "clear", "prismatic", "colorless"],
  },
  Dioptase: {
    name: "Dioptase",
    otherNames: [],
    visualDescription:
      "A bright emerald green transparent to translucent crystal. Very distinctive rich green color. Prismatic form with vitreous luster. Can be very clear.",
    colors: ["green", "emerald"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "bright",
    ],
    keywords: ["dioptase", "emerald green", "bright", "prismatic"],
  },
  Dumortierite: {
    name: "Dumortierite",
    otherNames: [],
    visualDescription:
      "A blue to violet colored opaque to translucent stone. Often appears dark blue with white streaks. Polished smooth with vitreous luster.",
    colors: ["blue", "violet", "dark blue"],
    visualFeatures: [
      "opaque",
      "translucent",
      "polished",
      "vitreous",
      "streaked",
    ],
    keywords: ["dumortierite", "blue", "violet", "streaked"],
  },
  Feldspar: {
    name: "Feldspar",
    otherNames: ["Orthoclase", "Plagioclase"],
    visualDescription:
      "A white to pink colored transparent to translucent crystal. Can also be green (amazonite). Often shows twinning patterns. Vitreous to pearly luster.",
    colors: ["white", "pink", "green", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "twinning",
      "vitreous",
      "pearly",
    ],
    keywords: ["feldspar", "twinning", "white", "pink"],
  },
  Amazonite: {
    name: "Amazonite",
    otherNames: ["Amazon Stone"],
    visualDescription:
      "A green to blue-green colored opaque to translucent feldspar. Distinctive bright green color with white streaks. Polished smooth with vitreous luster.",
    colors: ["green", "blue-green"],
    visualFeatures: [
      "opaque",
      "translucent",
      "polished",
      "vitreous",
      "streaked",
    ],
    keywords: ["amazonite", "green feldspar", "bright green", "streaked"],
  },
  "Hematoid Quartz": {
    name: "Hematoid Quartz",
    otherNames: ["Red Quartz"],
    visualDescription:
      "A red to orange colored translucent quartz with hematite inclusions. Shows red or orange coloring throughout. Polished smooth with vitreous luster.",
    colors: ["red", "orange", "red-orange"],
    visualFeatures: ["translucent", "polished", "vitreous", "inclusions"],
    keywords: ["hematoid quartz", "red quartz", "orange", "inclusions"],
  },
  Howlite: {
    name: "Howlite",
    otherNames: [],
    visualDescription:
      "A white to gray colored opaque stone with distinctive dark gray veining. Often dyed blue to imitate turquoise. Polished smooth with subvitreous to dull luster.",
    colors: ["white", "gray"],
    visualFeatures: ["opaque", "veined", "polished", "subvitreous", "dull"],
    keywords: ["howlite", "white", "veined", "gray"],
  },
  Iolite: {
    name: "Iolite",
    otherNames: ["Cordierite"],
    visualDescription:
      "A blue to violet colored transparent to translucent crystal. Shows strong pleochroism (different colors from different angles). Vitreous luster, can be very clear.",
    colors: ["blue", "violet", "blue-violet"],
    visualFeatures: ["transparent", "translucent", "pleochroic", "vitreous"],
    keywords: ["iolite", "cordierite", "blue-violet", "pleochroic"],
  },
  Jasper: {
    name: "Jasper",
    otherNames: [],
    visualDescription:
      "An opaque stone with various colors and patterns. Can be red, yellow, brown, or multicolored. Often shows banding or patterns. Polished smooth with vitreous to dull luster.",
    colors: ["red", "yellow", "brown", "multicolored"],
    visualFeatures: ["opaque", "banded", "patterned", "polished", "vitreous"],
    keywords: ["jasper", "banded", "patterned", "multicolored"],
  },
  Kunzite: {
    name: "Kunzite",
    otherNames: ["Pink Spodumene"],
    visualDescription:
      "A pink to violet colored transparent to translucent crystal. Can show pleochroism. Prismatic form with vitreous luster. Often very clear and bright.",
    colors: ["pink", "violet", "pale pink"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "pleochroic",
      "vitreous",
    ],
    keywords: ["kunzite", "pink spodumene", "pink", "prismatic"],
  },
  Larimar: {
    name: "Larimar",
    otherNames: ["Blue Pectolite"],
    visualDescription:
      "A blue to blue-green colored opaque to translucent stone with white streaks. Distinctive ocean blue color. Polished smooth with vitreous to silky luster.",
    colors: ["blue", "blue-green", "ocean blue"],
    visualFeatures: [
      "opaque",
      "translucent",
      "streaked",
      "polished",
      "vitreous",
    ],
    keywords: ["larimar", "blue pectolite", "ocean blue", "streaked"],
  },
  Lepidolite: {
    name: "Lepidolite",
    otherNames: [],
    visualDescription:
      "A pink to purple colored opaque to translucent mica. Often shows flaky or scaly appearance. Can be very bright pink or purple. Vitreous to pearly luster.",
    colors: ["pink", "purple", "lavender"],
    visualFeatures: ["opaque", "translucent", "flaky", "scaly", "vitreous"],
    keywords: ["lepidolite", "pink mica", "flaky", "scaly"],
  },
  Moldavite: {
    name: "Moldavite",
    otherNames: ["Tektite"],
    visualDescription:
      "A green to brown-green colored transparent to translucent glass. Formed from meteorite impact. Distinctive bumpy or pitted surface. Vitreous luster.",
    colors: ["green", "brown-green"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bumpy",
      "pitted",
      "vitreous",
    ],
    keywords: ["moldavite", "tektite", "green glass", "bumpy"],
  },
  Morganite: {
    name: "Morganite",
    otherNames: ["Pink Beryl"],
    visualDescription:
      "A pink to peach colored transparent to translucent crystal. Can range from pale pink to deeper peach. Hexagonal prismatic form with vitreous luster.",
    colors: ["pink", "peach", "salmon"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["morganite", "pink beryl", "peach", "hexagonal"],
  },
  "Moss Agate": {
    name: "Moss Agate",
    otherNames: [],
    visualDescription:
      "A translucent to opaque agate with green, brown, or black dendritic inclusions resembling moss or trees. Often white or clear base with dark inclusions. Polished smooth.",
    colors: ["white", "clear", "green", "brown"],
    visualFeatures: [
      "translucent",
      "opaque",
      "dendritic",
      "polished",
      "inclusions",
    ],
    keywords: ["moss agate", "dendritic", "moss-like", "inclusions"],
  },
  Onyx: {
    name: "Onyx",
    otherNames: [],
    visualDescription:
      "A black to dark colored opaque stone with parallel bands. Often solid black or shows white bands. Polished smooth with vitreous to dull luster.",
    colors: ["black", "dark", "white"],
    visualFeatures: ["opaque", "banded", "polished", "vitreous"],
    keywords: ["onyx", "black", "banded", "smooth"],
  },
  "Peruvian Opal": {
    name: "Peruvian Opal",
    otherNames: [],
    visualDescription:
      "A blue-green to pink colored translucent to opaque stone. Often shows play of color. Smooth and polished with waxy to vitreous luster.",
    colors: ["blue-green", "pink", "various"],
    visualFeatures: ["translucent", "opaque", "polished", "waxy", "vitreous"],
    keywords: ["peruvian opal", "blue-green", "pink", "polished"],
  },
  Prehnite: {
    name: "Prehnite",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored translucent to opaque crystal. Often appears pale green or apple green. Botryoidal or tabular form with vitreous to pearly luster.",
    colors: ["green", "yellow-green", "apple green"],
    visualFeatures: [
      "translucent",
      "opaque",
      "botryoidal",
      "tabular",
      "vitreous",
    ],
    keywords: ["prehnite", "green", "botryoidal", "apple green"],
  },
  Rhodochrosite: {
    name: "Rhodochrosite",
    otherNames: [],
    visualDescription:
      "A pink to red colored translucent to opaque stone with distinctive banding. Rich pink to rose color with white bands. Polished smooth with vitreous to pearly luster.",
    colors: ["pink", "rose", "red"],
    visualFeatures: ["translucent", "opaque", "banded", "polished", "vitreous"],
    keywords: ["rhodochrosite", "pink", "banded", "rose"],
  },
  Rhodonite: {
    name: "Rhodonite",
    otherNames: [],
    visualDescription:
      "A pink to red colored opaque stone with black veining. Rich pink to rose color with distinctive black manganese oxide veins. Polished smooth with vitreous luster.",
    colors: ["pink", "rose", "red"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous"],
    keywords: ["rhodonite", "pink", "veined", "black veins"],
  },
  "Rutilated Quartz": {
    name: "Rutilated Quartz",
    otherNames: ["Rutile Quartz"],
    visualDescription:
      "A clear to white translucent quartz with golden or red needle-like rutile inclusions. The inclusions form distinctive patterns. Vitreous luster.",
    colors: ["clear", "white", "golden"],
    visualFeatures: ["translucent", "inclusions", "needle-like", "vitreous"],
    keywords: [
      "rutilated quartz",
      "rutile quartz",
      "golden needles",
      "inclusions",
    ],
  },
  "Smoky Quartz": {
    name: "Smoky Quartz",
    otherNames: ["Smoky Topaz", "Smokey Quartz"],
    visualDescription:
      "A brown to gray-brown colored transparent to translucent crystal with distinctive smoky appearance. Can range from pale brown to very dark, almost black. Hexagonal prismatic form with vitreous luster. The smoky coloration creates a hazy, clouded appearance within the transparent crystal. Often shows internal clarity despite the dark color.",
    colors: ["brown", "gray", "dark brown", "black", "gray-brown"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
      "smoky",
      "hazy",
      "clouded",
    ],
    keywords: [
      "smoky quartz",
      "smokey quartz",
      "brown",
      "dark",
      "hexagonal",
      "smoky",
      "hazy",
    ],
  },
  Sodalite: {
    name: "Sodalite",
    otherNames: [],
    visualDescription:
      "A blue to blue-violet colored opaque stone, often with white calcite veining. Rich royal blue color. Polished smooth with vitreous to dull luster.",
    colors: ["blue", "royal blue", "blue-violet"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous"],
    keywords: ["sodalite", "royal blue", "veined", "blue"],
  },
  Spinel: {
    name: "Spinel",
    otherNames: [],
    visualDescription:
      "A transparent crystal that can be red, blue, pink, or other colors. Very clear and bright. Octahedral crystal form with vitreous to adamantine luster.",
    colors: ["red", "blue", "pink", "various"],
    visualFeatures: [
      "transparent",
      "octahedral",
      "vitreous",
      "adamantine",
      "clear",
    ],
    keywords: ["spinel", "colorful", "octahedral", "clear"],
  },
  Sugilite: {
    name: "Sugilite",
    otherNames: [],
    visualDescription:
      "A purple to pink colored opaque stone. Rich purple color, can range from pale pink-purple to deep purple. Polished smooth with vitreous to waxy luster.",
    colors: ["purple", "pink-purple"],
    visualFeatures: ["opaque", "polished", "vitreous", "waxy"],
    keywords: ["sugilite", "purple", "pink-purple", "polished"],
  },
  Tektite: {
    name: "Tektite",
    otherNames: ["Meteorite Glass"],
    visualDescription:
      "A black to dark green colored glass formed from meteorite impacts. Often has a bumpy or pitted surface. Can be transparent to opaque with vitreous luster.",
    colors: ["black", "dark green"],
    visualFeatures: ["transparent", "opaque", "bumpy", "pitted", "vitreous"],
    keywords: ["tektite", "meteorite glass", "black", "bumpy"],
  },
  Unakite: {
    name: "Unakite",
    otherNames: ["Epidote Feldspar"],
    visualDescription:
      "A distinctive combination stone showing green epidote and pink feldspar together. Opaque stone with mottled or patchy pattern where green and pink areas meet. The green epidote appears as bright green patches, while pink feldspar shows as pink or salmon-colored areas. Polished smooth with vitreous luster. The mottled pattern is very distinctive.",
    colors: ["green", "pink", "salmon", "mottled"],
    visualFeatures: [
      "opaque",
      "mottled",
      "patchy",
      "polished",
      "vitreous",
      "combination",
    ],
    keywords: [
      "unakite",
      "epidote",
      "feldspar",
      "green",
      "pink",
      "mottled",
      "combination",
    ],
  },
  Zircon: {
    name: "Zircon",
    otherNames: [],
    visualDescription:
      "A transparent crystal that can be colorless, blue, yellow, or other colors. Very bright and brilliant with high dispersion. Tetragonal form with vitreous to adamantine luster.",
    colors: ["colorless", "blue", "yellow", "various"],
    visualFeatures: [
      "transparent",
      "tetragonal",
      "brilliant",
      "vitreous",
      "adamantine",
    ],
    keywords: ["zircon", "brilliant", "colorful", "tetragonal"],
  },
  Zoisite: {
    name: "Zoisite",
    otherNames: [],
    visualDescription:
      "A green to blue-green colored opaque to translucent crystal. Can also be pink (thulite). Often shows striations. Prismatic form with vitreous luster.",
    colors: ["green", "blue-green", "pink"],
    visualFeatures: [
      "opaque",
      "translucent",
      "prismatic",
      "striated",
      "vitreous",
    ],
    keywords: ["zoisite", "green", "prismatic", "striated"],
  },
  Angelite: {
    name: "Angelite",
    otherNames: ["Blue Anhydrite"],
    visualDescription:
      "A pale blue to blue-gray colored opaque stone. Often appears soft blue or lavender-blue. Polished smooth with vitreous to pearly luster.",
    colors: ["blue", "pale blue", "blue-gray", "lavender-blue"],
    visualFeatures: ["opaque", "polished", "vitreous", "pearly"],
    keywords: ["angelite", "blue anhydrite", "pale blue", "soft"],
  },
  Aragonite: {
    name: "Aragonite",
    otherNames: [],
    visualDescription:
      "A white to colorless transparent to translucent crystal, can also be yellow, orange, or brown. Often forms radiating clusters or botryoidal shapes. Vitreous to resinous luster.",
    colors: ["white", "colorless", "yellow", "orange", "brown"],
    visualFeatures: [
      "transparent",
      "translucent",
      "radiating",
      "botryoidal",
      "vitreous",
    ],
    keywords: ["aragonite", "radiating", "botryoidal", "colorful"],
  },
  Azurite: {
    name: "Azurite",
    otherNames: [],
    visualDescription:
      "A deep blue to azure colored opaque crystal. Rich royal blue color, often with green malachite. Can form botryoidal or massive forms. Vitreous to dull luster.",
    colors: ["blue", "deep blue", "azure", "royal blue"],
    visualFeatures: ["opaque", "botryoidal", "vitreous", "dull"],
    keywords: ["azurite", "deep blue", "royal blue", "botryoidal"],
  },
  Beryl: {
    name: "Beryl",
    otherNames: [],
    visualDescription:
      "A transparent to translucent crystal that can be green (emerald), blue (aquamarine), pink (morganite), or yellow. Hexagonal prismatic form with vitreous luster.",
    colors: ["green", "blue", "pink", "yellow", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["beryl", "hexagonal", "prismatic", "colorful"],
  },
  "Black Obsidian": {
    name: "Black Obsidian",
    otherNames: ["Volcanic Glass"],
    visualDescription:
      "A jet black opaque volcanic glass, very shiny and reflective. Can have conchoidal fracture patterns. Often appears like polished black glass with vitreous luster.",
    colors: ["black", "jet black"],
    visualFeatures: ["opaque", "glassy", "shiny", "reflective", "conchoidal"],
    keywords: ["black obsidian", "volcanic glass", "shiny black", "glassy"],
  },
  "Blue Lace Agate": {
    name: "Blue Lace Agate",
    otherNames: [],
    visualDescription:
      "A pale blue to white colored translucent to opaque agate with distinctive lacy banding patterns. Soft blue color with white bands creating lace-like patterns. Polished smooth.",
    colors: ["blue", "pale blue", "white"],
    visualFeatures: ["translucent", "opaque", "banded", "lacy", "polished"],
    keywords: ["blue lace agate", "lacy", "banded", "pale blue"],
  },
  "Botswana Agate": {
    name: "Botswana Agate",
    otherNames: [],
    visualDescription:
      "A gray to pink colored banded agate with distinctive parallel bands. Often shows pink, gray, and white bands. Translucent to opaque, polished smooth.",
    colors: ["gray", "pink", "white"],
    visualFeatures: ["translucent", "opaque", "banded", "parallel", "polished"],
    keywords: ["botswana agate", "banded", "pink", "gray"],
  },
  Cavansite: {
    name: "Cavansite",
    otherNames: [],
    visualDescription:
      "A bright blue colored transparent to translucent crystal. Very distinctive vibrant blue color. Often forms radiating clusters. Vitreous luster.",
    colors: ["blue", "bright blue", "vibrant blue"],
    visualFeatures: ["transparent", "translucent", "radiating", "vitreous"],
    keywords: ["cavansite", "bright blue", "radiating", "vibrant"],
  },
  "Chrysanthemum Stone": {
    name: "Chrysanthemum Stone",
    otherNames: [],
    visualDescription:
      "A black to gray colored stone with white or colored flower-like patterns resembling chrysanthemums. Opaque with distinctive floral patterns. Polished smooth.",
    colors: ["black", "gray", "white"],
    visualFeatures: ["opaque", "patterned", "floral", "polished"],
    keywords: ["chrysanthemum stone", "floral", "patterned", "flower-like"],
  },
  Cinnabar: {
    name: "Cinnabar",
    otherNames: [],
    visualDescription:
      "A bright red to vermilion colored opaque crystal. Very distinctive bright red color. Often forms massive or granular forms. Adamantine to dull luster.",
    colors: ["red", "bright red", "vermilion"],
    visualFeatures: ["opaque", "massive", "granular", "adamantine"],
    keywords: ["cinnabar", "bright red", "vermilion", "red crystal"],
  },
  Covellite: {
    name: "Covellite",
    otherNames: [],
    visualDescription:
      "A deep blue to indigo colored opaque crystal with metallic luster. Very distinctive indigo blue color with iridescent tarnish. Often appears dark blue-purple.",
    colors: ["blue", "indigo", "blue-purple"],
    visualFeatures: ["opaque", "metallic", "iridescent", "tarnished"],
    keywords: ["covellite", "indigo", "metallic", "iridescent"],
  },
  Crocoite: {
    name: "Crocoite",
    otherNames: [],
    visualDescription:
      "A bright orange-red to red colored transparent to translucent crystal. Very distinctive bright orange-red color. Prismatic form with adamantine to vitreous luster.",
    colors: ["red", "orange-red", "bright orange"],
    visualFeatures: ["transparent", "translucent", "prismatic", "adamantine"],
    keywords: ["crocoite", "orange-red", "bright", "prismatic"],
  },
  Cuprite: {
    name: "Cuprite",
    otherNames: [],
    visualDescription:
      "A deep red to dark red colored transparent to translucent crystal. Very dark red, almost black in some cases. Can form octahedral crystals. Adamantine to submetallic luster.",
    colors: ["red", "deep red", "dark red"],
    visualFeatures: ["transparent", "translucent", "octahedral", "adamantine"],
    keywords: ["cuprite", "deep red", "dark red", "octahedral"],
  },
  "Desert Rose": {
    name: "Desert Rose",
    otherNames: ["Gypsum Rose"],
    visualDescription:
      "A white to tan colored crystal formation resembling rose petals. Forms rosette clusters with a flower-like appearance. Opaque with a dull to vitreous luster.",
    colors: ["white", "tan", "brown"],
    visualFeatures: ["opaque", "rosette", "flower-like", "dull"],
    keywords: ["desert rose", "gypsum rose", "rosette", "flower-like"],
  },
  "Druzy Quartz": {
    name: "Druzy Quartz",
    otherNames: ["Drusy Quartz"],
    visualDescription:
      "A crystal formation with tiny sparkling crystals covering a surface. Can be various colors. Very sparkly and glittery appearance. Vitreous luster.",
    colors: ["various", "sparkling"],
    visualFeatures: ["sparkling", "glittery", "tiny crystals", "vitreous"],
    keywords: ["druzy quartz", "sparkling", "glittery", "tiny crystals"],
  },
  Epidote: {
    name: "Epidote",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored transparent to translucent crystal. Often appears pistachio green. Prismatic form with vitreous luster.",
    colors: ["green", "yellow-green", "pistachio"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["epidote", "green", "pistachio", "prismatic"],
  },
  "Fire Agate": {
    name: "Fire Agate",
    otherNames: [],
    visualDescription:
      "A brown to red colored agate with iridescent fire-like flashes. Shows play of color with red, orange, and yellow flashes. Polished smooth with vitreous luster.",
    colors: ["brown", "red", "orange", "iridescent"],
    visualFeatures: ["opaque", "iridescent", "polished", "vitreous"],
    keywords: ["fire agate", "iridescent", "fire-like", "colorful"],
  },
  "Fire Opal": {
    name: "Fire Opal",
    otherNames: [],
    visualDescription:
      "An orange to red colored transparent to translucent opal. Bright orange or red color, can show play of color. Very bright and vibrant. Vitreous to resinous luster.",
    colors: ["orange", "red", "bright orange"],
    visualFeatures: ["transparent", "translucent", "bright", "vitreous"],
    keywords: ["fire opal", "orange", "red", "bright"],
  },
  Fossil: {
    name: "Fossil",
    otherNames: ["Petrified Wood", "Ammonite"],
    visualDescription:
      "Fossilized organic material, can be petrified wood showing tree rings, or ammonite shells with spiral patterns. Often shows preserved organic structures. Polished smooth.",
    colors: ["brown", "tan", "various"],
    visualFeatures: ["opaque", "patterned", "organic", "polished"],
    keywords: ["fossil", "petrified", "organic", "patterned"],
  },
  "Garnet Almandine": {
    name: "Garnet Almandine",
    otherNames: ["Almandine"],
    visualDescription:
      "A deep red to purplish-red colored transparent to translucent garnet. Very dark red, almost black in some cases. Dodecahedral form with vitreous luster.",
    colors: ["red", "deep red", "purplish-red"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["garnet almandine", "deep red", "dodecahedral", "dark"],
  },
  "Garnet Spessartine": {
    name: "Garnet Spessartine",
    otherNames: ["Spessartine"],
    visualDescription:
      "An orange to orange-red colored transparent to translucent garnet. Bright orange color. Dodecahedral form with vitreous luster.",
    colors: ["orange", "orange-red"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["garnet spessartine", "orange", "bright", "dodecahedral"],
  },
  Geode: {
    name: "Geode",
    otherNames: [],
    visualDescription:
      "A hollow rock with crystals lining the interior. Outer surface is often dull, but interior shows sparkling crystals. Can be various colors depending on crystal type.",
    colors: ["various"],
    visualFeatures: ["hollow", "crystalline interior", "dull exterior"],
    keywords: ["geode", "hollow", "crystalline", "sparkling"],
  },
  "Green Aventurine": {
    name: "Green Aventurine",
    otherNames: [],
    visualDescription:
      "A green colored translucent to opaque quartz with sparkling mica inclusions. Bright green color with glittery appearance. Polished smooth with vitreous luster.",
    colors: ["green", "bright green"],
    visualFeatures: [
      "translucent",
      "opaque",
      "sparkling",
      "polished",
      "vitreous",
    ],
    keywords: ["green aventurine", "sparkling", "glittery", "green"],
  },
  "Herkimer Diamond": {
    name: "Herkimer Diamond",
    otherNames: ["Herkimer Quartz"],
    visualDescription:
      "A very clear, double-terminated quartz crystal. Extremely clear and transparent, often perfectly formed. Very shiny and brilliant with vitreous luster.",
    colors: ["clear", "colorless"],
    visualFeatures: [
      "transparent",
      "double-terminated",
      "clear",
      "brilliant",
      "vitreous",
    ],
    keywords: [
      "herkimer diamond",
      "clear quartz",
      "double-terminated",
      "brilliant",
    ],
  },
  Hiddenite: {
    name: "Hiddenite",
    otherNames: ["Green Spodumene"],
    visualDescription:
      "A green to yellow-green colored transparent to translucent crystal. Can range from pale green to emerald green. Prismatic form with vitreous luster.",
    colors: ["green", "yellow-green", "emerald"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["hiddenite", "green spodumene", "green", "prismatic"],
  },
  "Honey Calcite": {
    name: "Honey Calcite",
    otherNames: [],
    visualDescription:
      "A golden yellow to honey colored transparent to translucent calcite. Warm golden color. Rhombohedral form with vitreous to pearly luster.",
    colors: ["yellow", "golden", "honey"],
    visualFeatures: ["transparent", "translucent", "rhombohedral", "vitreous"],
    keywords: ["honey calcite", "golden", "honey", "yellow"],
  },
  "Iceland Spar": {
    name: "Iceland Spar",
    otherNames: ["Optical Calcite"],
    visualDescription:
      "A perfectly clear, transparent calcite crystal. Extremely clear, shows double refraction. Rhombohedral form with vitreous luster.",
    colors: ["clear", "colorless"],
    visualFeatures: [
      "transparent",
      "clear",
      "rhombohedral",
      "vitreous",
      "double-refracting",
    ],
    keywords: ["iceland spar", "optical calcite", "clear", "double-refracting"],
  },
  "Indigo Gabbro": {
    name: "Indigo Gabbro",
    otherNames: ["Mystic Merlinite"],
    visualDescription:
      "A black to dark gray colored stone with white or gray speckles and patterns. Often shows swirling patterns. Polished smooth with vitreous luster.",
    colors: ["black", "gray", "white"],
    visualFeatures: ["opaque", "speckled", "swirling", "polished", "vitreous"],
    keywords: ["indigo gabbro", "mystic merlinite", "speckled", "swirling"],
  },
  "Iris Agate": {
    name: "Iris Agate",
    otherNames: [],
    visualDescription:
      "A translucent agate that shows rainbow colors when backlit. Can appear colorless or white, but reveals iridescent colors. Polished smooth.",
    colors: ["colorless", "white", "iridescent"],
    visualFeatures: ["translucent", "iridescent", "polished"],
    keywords: ["iris agate", "iridescent", "rainbow", "translucent"],
  },
  Jadeite: {
    name: "Jadeite",
    otherNames: ["Imperial Jade"],
    visualDescription:
      "A green to white colored opaque to translucent stone. Can range from pale green to deep emerald. Very smooth and polished with vitreous to waxy luster.",
    colors: ["green", "emerald", "white"],
    visualFeatures: ["opaque", "translucent", "smooth", "polished", "vitreous"],
    keywords: ["jadeite", "imperial jade", "green", "smooth"],
  },
  "Kambaba Jasper": {
    name: "Kambaba Jasper",
    otherNames: ["Crocodile Jasper"],
    visualDescription:
      "A dark green to black colored opaque stone with circular or orbicular patterns. Often appears dark green with lighter green circles. Polished smooth.",
    colors: ["green", "dark green", "black"],
    visualFeatures: ["opaque", "orbicular", "patterned", "polished"],
    keywords: ["kambaba jasper", "crocodile jasper", "orbicular", "patterned"],
  },
  Kunzite: {
    name: "Kunzite",
    otherNames: ["Pink Spodumene"],
    visualDescription:
      "A pink to violet colored transparent to translucent crystal. Can show pleochroism. Prismatic form with vitreous luster. Often very clear and bright.",
    colors: ["pink", "violet", "pale pink"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "pleochroic",
      "vitreous",
    ],
    keywords: ["kunzite", "pink spodumene", "pink", "prismatic"],
  },
  Labradorite: {
    name: "Labradorite",
    otherNames: ["Spectrolite"],
    visualDescription:
      "A dark gray to black colored stone with iridescent flashes of blue, green, gold, and purple (labradorescence). Opaque to translucent, typically polished smooth. Shows colorful flashes when moved.",
    colors: ["gray", "black", "iridescent", "multicolored"],
    visualFeatures: [
      "opaque",
      "translucent",
      "iridescent",
      "polished",
      "colorful flashes",
    ],
    keywords: ["labradorite", "iridescent", "colorful", "flashing"],
  },
  Larimar: {
    name: "Larimar",
    otherNames: ["Blue Pectolite"],
    visualDescription:
      "A blue to blue-green colored opaque to translucent stone with white streaks. Distinctive ocean blue color. Polished smooth with vitreous to silky luster.",
    colors: ["blue", "blue-green", "ocean blue"],
    visualFeatures: [
      "opaque",
      "translucent",
      "streaked",
      "polished",
      "vitreous",
    ],
    keywords: ["larimar", "blue pectolite", "ocean blue", "streaked"],
  },
  Lepidolite: {
    name: "Lepidolite",
    otherNames: ["Lepidolite Mica", "Pink Mica"],
    visualDescription:
      "A pink to purple colored opaque to translucent mica. Often shows flaky or scaly appearance. Can be very bright pink or purple. Vitreous to pearly luster. Distinctive flaky, layered structure typical of mica minerals.",
    colors: ["pink", "purple", "lavender"],
    visualFeatures: [
      "opaque",
      "translucent",
      "flaky",
      "scaly",
      "layered",
      "vitreous",
      "pearly",
    ],
    keywords: [
      "lepidolite",
      "lepidolite mica",
      "pink mica",
      "flaky",
      "scaly",
      "mica",
      "layered",
    ],
  },
  "Lepidolite Mica": {
    name: "Lepidolite Mica",
    otherNames: ["Lepidolite", "Pink Mica"],
    visualDescription:
      "A pink to purple colored opaque to translucent mica mineral. Shows distinctive flaky, scaly, or layered appearance typical of mica minerals. Can be very bright pink or purple. Vitreous to pearly luster. Often appears in sheets or flakes.",
    colors: ["pink", "purple", "lavender", "rose"],
    visualFeatures: [
      "opaque",
      "translucent",
      "flaky",
      "scaly",
      "layered",
      "sheet-like",
      "vitreous",
      "pearly",
    ],
    keywords: [
      "lepidolite mica",
      "lepidolite",
      "pink mica",
      "flaky",
      "scaly",
      "mica",
      "layered",
      "sheet-like",
    ],
  },
  Magnesite: {
    name: "Magnesite",
    otherNames: [],
    visualDescription:
      "A white to colorless opaque to translucent crystal. Often appears white or cream colored. Can form botryoidal or massive forms. Vitreous to dull luster.",
    colors: ["white", "colorless", "cream"],
    visualFeatures: ["opaque", "translucent", "botryoidal", "vitreous"],
    keywords: ["magnesite", "white", "botryoidal", "cream"],
  },
  "Mahogany Obsidian": {
    name: "Mahogany Obsidian",
    otherNames: [],
    visualDescription:
      "A dark brown to black colored volcanic glass with reddish-brown streaks or patches. Opaque with vitreous luster. Shows mahogany-colored patterns.",
    colors: ["black", "brown", "reddish-brown"],
    visualFeatures: ["opaque", "glassy", "vitreous", "streaked"],
    keywords: ["mahogany obsidian", "brown", "streaked", "volcanic glass"],
  },
  Meteorite: {
    name: "Meteorite",
    otherNames: ["Space Rock"],
    visualDescription:
      "A metallic or stony material from space. Can be metallic silver-gray or stony black. Often shows fusion crust or Widmanstätten patterns. Metallic to dull luster.",
    colors: ["silver", "gray", "black"],
    visualFeatures: ["metallic", "patterned", "fusion crust", "dull"],
    keywords: ["meteorite", "space rock", "metallic", "patterned"],
  },
  Mookaite: {
    name: "Mookaite",
    otherNames: ["Australian Jasper"],
    visualDescription:
      "A multicolored opaque jasper with red, yellow, white, and brown patterns. Very colorful with distinctive patterns. Polished smooth with vitreous luster.",
    colors: ["red", "yellow", "white", "brown", "multicolored"],
    visualFeatures: ["opaque", "patterned", "polished", "vitreous"],
    keywords: ["mookaite", "australian jasper", "multicolored", "patterned"],
  },
  Nuummite: {
    name: "Nuummite",
    otherNames: [],
    visualDescription:
      "A black to dark gray colored opaque stone with golden or iridescent flashes. Very dark base with colorful flashes. Polished smooth with vitreous luster.",
    colors: ["black", "gray", "iridescent"],
    visualFeatures: ["opaque", "iridescent", "polished", "vitreous"],
    keywords: ["nuummite", "black", "iridescent", "flashing"],
  },
  "Ocean Jasper": {
    name: "Ocean Jasper",
    otherNames: [],
    visualDescription:
      "A multicolored opaque jasper with circular or orbicular patterns. Often shows pink, green, white, and yellow circles. Very distinctive orbicular patterns.",
    colors: ["pink", "green", "white", "yellow", "multicolored"],
    visualFeatures: ["opaque", "orbicular", "patterned", "polished"],
    keywords: ["ocean jasper", "orbicular", "circular", "multicolored"],
  },
  "Picture Jasper": {
    name: "Picture Jasper",
    otherNames: [],
    visualDescription:
      "An opaque jasper with landscape-like patterns resembling pictures or scenes. Often shows brown, tan, and cream colors creating scenic patterns. Polished smooth.",
    colors: ["brown", "tan", "cream"],
    visualFeatures: ["opaque", "patterned", "landscape-like", "polished"],
    keywords: ["picture jasper", "landscape", "patterned", "scenic"],
  },
  Pietersite: {
    name: "Pietersite",
    otherNames: [],
    visualDescription:
      "A blue to brown colored opaque stone with chatoyant (cat's eye) effect and swirling patterns. Shows silky bands of light. Polished smooth with silky luster.",
    colors: ["blue", "brown", "golden"],
    visualFeatures: ["opaque", "chatoyant", "swirling", "silky", "polished"],
    keywords: ["pietersite", "chatoyant", "swirling", "silky"],
  },
  Prasiolite: {
    name: "Prasiolite",
    otherNames: ["Green Amethyst"],
    visualDescription:
      "A green colored transparent to translucent quartz. Pale to medium green color. Hexagonal form with vitreous luster. Can be very clear.",
    colors: ["green", "pale green"],
    visualFeatures: ["transparent", "translucent", "hexagonal", "vitreous"],
    keywords: ["prasiolite", "green amethyst", "green quartz", "hexagonal"],
  },
  Purpurite: {
    name: "Purpurite",
    otherNames: [],
    visualDescription:
      "A purple to pink-purple colored opaque crystal. Rich purple color. Often appears dark purple. Dull to submetallic luster.",
    colors: ["purple", "pink-purple"],
    visualFeatures: ["opaque", "dull", "submetallic"],
    keywords: ["purpurite", "purple", "dark purple"],
  },
  "Rainbow Obsidian": {
    name: "Rainbow Obsidian",
    otherNames: [],
    visualDescription:
      "A black volcanic glass with iridescent rainbow sheen. Appears black but shows rainbow colors when polished and viewed at angles. Vitreous luster.",
    colors: ["black", "iridescent"],
    visualFeatures: ["opaque", "glassy", "iridescent", "vitreous"],
    keywords: ["rainbow obsidian", "iridescent", "rainbow", "volcanic glass"],
  },
  "Red Jasper": {
    name: "Red Jasper",
    otherNames: [],
    visualDescription:
      "A red to reddish-brown colored opaque stone. Rich red color, can range from bright red to dark red-brown. Polished smooth with vitreous to dull luster.",
    colors: ["red", "reddish-brown", "dark red"],
    visualFeatures: ["opaque", "polished", "vitreous", "dull"],
    keywords: ["red jasper", "red", "brown-red", "opaque"],
  },
  Rhodizite: {
    name: "Rhodizite",
    otherNames: [],
    visualDescription:
      "A colorless to white transparent to translucent crystal. Very clear and bright. Can form octahedral crystals. Vitreous luster.",
    colors: ["colorless", "white"],
    visualFeatures: ["transparent", "translucent", "octahedral", "vitreous"],
    keywords: ["rhodizite", "clear", "octahedral", "colorless"],
  },
  Rhodonite: {
    name: "Rhodonite",
    otherNames: [],
    visualDescription:
      "A pink to red colored opaque stone with black veining. Rich pink to rose color with distinctive black manganese oxide veins. Polished smooth with vitreous luster.",
    colors: ["pink", "rose", "red"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous"],
    keywords: ["rhodonite", "pink", "veined", "black veins"],
  },
  Rutile: {
    name: "Rutile",
    otherNames: [],
    visualDescription:
      "A golden yellow to red colored transparent to translucent crystal. Often forms needle-like crystals. Can be very bright golden. Adamantine to metallic luster.",
    colors: ["golden", "yellow", "red"],
    visualFeatures: ["transparent", "translucent", "needle-like", "adamantine"],
    keywords: ["rutile", "golden", "needle-like", "bright"],
  },
  Sardonyx: {
    name: "Sardonyx",
    otherNames: [],
    visualDescription:
      "A red to brown colored banded agate with white bands. Shows parallel bands of red/brown and white. Polished smooth with vitreous luster.",
    colors: ["red", "brown", "white"],
    visualFeatures: ["opaque", "banded", "parallel", "polished", "vitreous"],
    keywords: ["sardonyx", "banded", "red", "white bands"],
  },
  Serpentine: {
    name: "Serpentine",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored opaque to translucent stone. Can range from pale green to dark green. Often shows mottled patterns. Waxy to vitreous luster.",
    colors: ["green", "yellow-green", "dark green"],
    visualFeatures: ["opaque", "translucent", "mottled", "waxy", "vitreous"],
    keywords: ["serpentine", "green", "mottled", "waxy"],
  },
  "Shiva Lingam": {
    name: "Shiva Lingam",
    otherNames: [],
    visualDescription:
      "An egg-shaped stone from India, typically brown to gray with red or white markings. Smooth, polished surface. Opaque with vitreous luster.",
    colors: ["brown", "gray", "red", "white"],
    visualFeatures: ["opaque", "smooth", "polished", "egg-shaped", "vitreous"],
    keywords: ["shiva lingam", "egg-shaped", "smooth", "polished"],
  },
  Smithsonite: {
    name: "Smithsonite",
    otherNames: [],
    visualDescription:
      "A blue to green colored translucent to opaque crystal. Can also be pink, yellow, or other colors. Often forms botryoidal clusters. Vitreous to pearly luster.",
    colors: ["blue", "green", "pink", "yellow", "various"],
    visualFeatures: ["translucent", "opaque", "botryoidal", "vitreous"],
    keywords: ["smithsonite", "botryoidal", "colorful", "blue-green"],
  },
  "Snowflake Obsidian": {
    name: "Snowflake Obsidian",
    otherNames: [],
    visualDescription:
      "A black volcanic glass with white snowflake-like patterns. Black base with white cristobalite inclusions forming snowflake patterns. Polished smooth.",
    colors: ["black", "white"],
    visualFeatures: ["opaque", "patterned", "snowflake-like", "polished"],
    keywords: [
      "snowflake obsidian",
      "snowflake",
      "patterned",
      "black and white",
    ],
  },
  Spectrolite: {
    name: "Spectrolite",
    otherNames: ["Labradorite"],
    visualDescription:
      "A dark stone with intense iridescent flashes of multiple colors. Very colorful labradorescence showing blues, greens, golds, and purples. Polished smooth.",
    colors: ["dark", "iridescent", "multicolored"],
    visualFeatures: ["opaque", "iridescent", "polished", "colorful"],
    keywords: ["spectrolite", "labradorite", "iridescent", "colorful"],
  },
  Staurolite: {
    name: "Staurolite",
    otherNames: ["Fairy Cross"],
    visualDescription:
      "A brown to reddish-brown colored opaque crystal that forms cross-shaped twins. Distinctive cross formation. Dull to subvitreous luster.",
    colors: ["brown", "reddish-brown"],
    visualFeatures: ["opaque", "cross-shaped", "twinned", "dull"],
    keywords: ["staurolite", "fairy cross", "cross-shaped", "twinned"],
  },
  Stibnite: {
    name: "Stibnite",
    otherNames: [],
    visualDescription:
      "A metallic gray to black colored crystal forming long, needle-like or bladed crystals. Very shiny metallic luster. Often appears like metallic needles.",
    colors: ["gray", "black", "metallic"],
    visualFeatures: ["opaque", "metallic", "needle-like", "bladed", "shiny"],
    keywords: ["stibnite", "metallic", "needle-like", "bladed"],
  },
  Sunstone: {
    name: "Sunstone",
    otherNames: ["Aventurine Feldspar"],
    visualDescription:
      "An orange to red colored translucent stone with sparkling inclusions (aventurescence). Can appear golden or orange with glittery flecks. Translucent with a vitreous luster.",
    colors: ["orange", "red", "golden"],
    visualFeatures: [
      "translucent",
      "sparkling",
      "glittery",
      "inclusions",
      "vitreous",
    ],
    keywords: ["sunstone", "sparkling", "glittery", "golden"],
  },
  Tanzanite: {
    name: "Tanzanite",
    otherNames: ["Blue Zoisite"],
    visualDescription:
      "A blue to violet colored transparent to translucent crystal. Can show pleochroism (different colors from different angles). Prismatic form with vitreous luster. Rich blue-violet color.",
    colors: ["blue", "violet", "blue-violet"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "pleochroic",
    ],
    keywords: ["tanzanite", "blue zoisite", "blue-violet", "pleochroic"],
  },
  Tektite: {
    name: "Tektite",
    otherNames: ["Meteorite Glass"],
    visualDescription:
      "A black to dark green colored glass formed from meteorite impacts. Often has a bumpy or pitted surface. Can be transparent to opaque with vitreous luster.",
    colors: ["black", "dark green"],
    visualFeatures: ["transparent", "opaque", "bumpy", "pitted", "vitreous"],
    keywords: ["tektite", "meteorite glass", "black", "bumpy"],
  },
  Thulite: {
    name: "Thulite",
    otherNames: ["Pink Zoisite"],
    visualDescription:
      "A pink to rose colored opaque to translucent zoisite. Rich pink color, often with white streaks. Polished smooth with vitreous luster.",
    colors: ["pink", "rose"],
    visualFeatures: [
      "opaque",
      "translucent",
      "streaked",
      "polished",
      "vitreous",
    ],
    keywords: ["thulite", "pink zoisite", "pink", "rose"],
  },
  "Tiger Iron": {
    name: "Tiger Iron",
    otherNames: [],
    visualDescription:
      "A banded stone showing alternating layers of tiger eye, red jasper, and black hematite. Very distinctive banded pattern. Polished smooth.",
    colors: ["brown", "red", "black", "golden"],
    visualFeatures: ["opaque", "banded", "layered", "polished"],
    keywords: ["tiger iron", "banded", "layered", "multicolored"],
  },
  Tourmaline: {
    name: "Tourmaline",
    otherNames: [],
    visualDescription:
      "A colorful transparent to translucent crystal that can be black, green, pink, blue, or multicolored. Prismatic form with vitreous luster. Often shows color zoning.",
    colors: ["black", "green", "pink", "blue", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "zoned",
      "vitreous",
    ],
    keywords: ["tourmaline", "prismatic", "colorful", "zoned"],
  },
  Turquoise: {
    name: "Turquoise",
    otherNames: ["Turkish Stone"],
    visualDescription:
      "A blue-green to sky blue colored opaque stone, often with black or brown veining (matrix). Can range from pale blue-green to deep turquoise. Typically polished smooth with a waxy to vitreous luster.",
    colors: ["blue", "green", "turquoise", "sky blue", "blue-green"],
    visualFeatures: [
      "opaque",
      "polished",
      "veined",
      "matrix",
      "waxy",
      "smooth",
    ],
    keywords: ["turquoise", "blue-green", "veined", "matrix"],
  },
  Vanadinite: {
    name: "Vanadinite",
    otherNames: [],
    visualDescription:
      "A bright red to orange-red colored transparent to translucent crystal. Very distinctive bright red-orange color. Forms hexagonal prismatic crystals. Adamantine to resinous luster.",
    colors: ["red", "orange-red", "bright red"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "adamantine",
    ],
    keywords: ["vanadinite", "red-orange", "bright", "hexagonal"],
  },
  Variscite: {
    name: "Variscite",
    otherNames: [],
    visualDescription:
      "A green to blue-green colored translucent to opaque stone. Often appears apple green or turquoise green. Polished smooth with waxy to vitreous luster.",
    colors: ["green", "blue-green", "apple green"],
    visualFeatures: ["translucent", "opaque", "polished", "waxy", "vitreous"],
    keywords: ["variscite", "green", "apple green", "polished"],
  },
  Wavellite: {
    name: "Wavellite",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored translucent to opaque crystal. Often forms radiating clusters or spherical forms. Vitreous to pearly luster.",
    colors: ["green", "yellow-green"],
    visualFeatures: [
      "translucent",
      "opaque",
      "radiating",
      "spherical",
      "vitreous",
    ],
    keywords: ["wavellite", "green", "radiating", "spherical"],
  },
  Wulfenite: {
    name: "Wulfenite",
    otherNames: [],
    visualDescription:
      "An orange to yellow colored transparent to translucent crystal. Very bright orange or yellow color. Forms tabular or square crystals. Adamantine to resinous luster.",
    colors: ["orange", "yellow", "bright orange"],
    visualFeatures: [
      "transparent",
      "translucent",
      "tabular",
      "square",
      "adamantine",
    ],
    keywords: ["wulfenite", "orange", "yellow", "tabular"],
  },
  Zincite: {
    name: "Zincite",
    otherNames: [],
    visualDescription:
      "A bright red to orange colored transparent to translucent crystal. Very distinctive bright red-orange color. Often forms massive forms. Adamantine luster.",
    colors: ["red", "orange", "red-orange"],
    visualFeatures: ["transparent", "translucent", "massive", "adamantine"],
    keywords: ["zincite", "red-orange", "bright", "massive"],
  },
  Andalusite: {
    name: "Andalusite",
    otherNames: ["Chiastolite"],
    visualDescription:
      "A brown to green colored transparent to translucent crystal. Often shows cross-shaped inclusions (chiastolite). Prismatic form with vitreous luster.",
    colors: ["brown", "green", "yellow-brown"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "cross-shaped",
      "vitreous",
    ],
    keywords: ["andalusite", "chiastolite", "cross-shaped", "prismatic"],
  },
  "Apache Tears": {
    name: "Apache Tears",
    otherNames: ["Obsidian Nodules"],
    visualDescription:
      "Small black obsidian nodules that are translucent when held to light. Jet black but shows transparency at edges. Smooth, rounded shapes.",
    colors: ["black"],
    visualFeatures: ["translucent", "rounded", "smooth", "glassy"],
    keywords: ["apache tears", "obsidian", "black", "rounded"],
  },
  "Aragonite Star Cluster": {
    name: "Aragonite Star Cluster",
    otherNames: ["Sputnik Aragonite"],
    visualDescription:
      "White to tan colored radiating crystal clusters resembling stars or sputniks. Forms radiating needle-like crystals. Vitreous luster.",
    colors: ["white", "tan", "brown"],
    visualFeatures: ["radiating", "star-like", "needle-like", "vitreous"],
    keywords: ["aragonite star", "sputnik", "radiating", "star-like"],
  },
  "Aurora Quartz": {
    name: "Aurora Quartz",
    otherNames: ["Rainbow Quartz"],
    visualDescription:
      "Clear quartz with iridescent coating creating rainbow colors. Transparent base with colorful surface coating. Very shiny and colorful.",
    colors: ["clear", "iridescent", "rainbow"],
    visualFeatures: ["transparent", "iridescent", "colorful", "shiny"],
    keywords: ["aurora quartz", "rainbow quartz", "iridescent", "colorful"],
  },
  "Banded Amethyst": {
    name: "Banded Amethyst",
    otherNames: [],
    visualDescription:
      "Purple amethyst with white or clear banding patterns. Shows alternating bands of purple and white. Translucent with vitreous luster.",
    colors: ["purple", "violet", "white"],
    visualFeatures: ["translucent", "banded", "vitreous"],
    keywords: ["banded amethyst", "purple", "banded", "striped"],
  },
  Baryte: {
    name: "Baryte",
    otherNames: ["Barite"],
    visualDescription:
      "A white to colorless transparent to translucent crystal, can also be yellow, blue, or brown. Often forms tabular or bladed crystals. Vitreous to pearly luster.",
    colors: ["white", "colorless", "yellow", "blue", "brown"],
    visualFeatures: [
      "transparent",
      "translucent",
      "tabular",
      "bladed",
      "vitreous",
    ],
    keywords: ["baryte", "barite", "tabular", "bladed"],
  },
  Bismuth: {
    name: "Bismuth",
    otherNames: [],
    visualDescription:
      "A metallic crystal with iridescent rainbow colors. Forms stepped, hopper-shaped crystals. Very distinctive geometric shapes with colorful tarnish.",
    colors: ["metallic", "iridescent", "rainbow"],
    visualFeatures: [
      "metallic",
      "iridescent",
      "geometric",
      "stepped",
      "hoppered",
    ],
    keywords: ["bismuth", "iridescent", "geometric", "stepped"],
  },
  "Black Kyanite": {
    name: "Black Kyanite",
    otherNames: [],
    visualDescription:
      "A black to dark colored bladed crystal. Forms long, blade-like crystals. Very dark, almost black. Vitreous to pearly luster.",
    colors: ["black", "dark"],
    visualFeatures: ["opaque", "bladed", "vitreous", "pearly"],
    keywords: ["black kyanite", "bladed", "dark", "black"],
  },
  "Blue Apatite": {
    name: "Blue Apatite",
    otherNames: [],
    visualDescription:
      "A blue to blue-green colored transparent to translucent crystal. Bright blue color. Hexagonal prismatic form with vitreous luster.",
    colors: ["blue", "blue-green"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["blue apatite", "blue", "hexagonal", "prismatic"],
  },
  "Blue Goldstone": {
    name: "Blue Goldstone",
    otherNames: ["Aventurine Glass"],
    visualDescription:
      "A blue colored man-made glass with sparkling copper inclusions. Very sparkly and glittery. Opaque with vitreous luster.",
    colors: ["blue"],
    visualFeatures: ["opaque", "sparkling", "glittery", "vitreous"],
    keywords: ["blue goldstone", "sparkling", "glittery", "blue"],
  },
  "Boji Stone": {
    name: "Boji Stone",
    otherNames: ["Kansas Pop Rocks"],
    visualDescription:
      "A brown to yellow colored concretion with smooth, polished surface. Often appears spherical or egg-shaped. Opaque with smooth surface.",
    colors: ["brown", "yellow", "tan"],
    visualFeatures: ["opaque", "smooth", "spherical", "polished"],
    keywords: ["boji stone", "kansas pop rocks", "spherical", "smooth"],
  },
  "Botryoidal Chalcedony": {
    name: "Botryoidal Chalcedony",
    otherNames: ["Grape Agate"],
    visualDescription:
      "A purple to blue colored chalcedony forming botryoidal (grape-like) clusters. Distinctive grape cluster appearance. Translucent with vitreous luster.",
    colors: ["purple", "blue", "lavender"],
    visualFeatures: ["translucent", "botryoidal", "grape-like", "vitreous"],
    keywords: [
      "botryoidal chalcedony",
      "grape agate",
      "botryoidal",
      "grape-like",
    ],
  },
  "Bumblebee Jasper": {
    name: "Bumblebee Jasper",
    otherNames: [],
    visualDescription:
      "A yellow and black colored opaque stone with distinctive bumblebee-like patterns. Bright yellow with black bands. Polished smooth.",
    colors: ["yellow", "black"],
    visualFeatures: ["opaque", "banded", "patterned", "polished"],
    keywords: ["bumblebee jasper", "yellow", "black", "banded"],
  },
  Cacoxenite: {
    name: "Cacoxenite",
    otherNames: [],
    visualDescription:
      "A yellow to golden colored crystal forming radiating clusters. Often found as inclusions in amethyst. Bright golden color. Vitreous luster.",
    colors: ["yellow", "golden", "orange"],
    visualFeatures: ["translucent", "radiating", "vitreous"],
    keywords: ["cacoxenite", "golden", "radiating", "yellow"],
  },
  Carnelian: {
    name: "Carnelian",
    otherNames: ["Red Agate"],
    visualDescription:
      "An orange-red to red colored translucent to opaque stone, often banded. Can range from pale orange to deep red. Typically polished smooth with a vitreous to waxy luster.",
    colors: ["red", "orange", "orange-red"],
    visualFeatures: [
      "translucent",
      "opaque",
      "banded",
      "polished",
      "vitreous",
      "waxy",
    ],
    keywords: ["carnelian", "red agate", "orange stone"],
  },
  Cavansite: {
    name: "Cavansite",
    otherNames: [],
    visualDescription:
      "A bright blue colored transparent to translucent crystal. Very distinctive vibrant blue color. Often forms radiating clusters. Vitreous luster.",
    colors: ["blue", "bright blue", "vibrant blue"],
    visualFeatures: ["transparent", "translucent", "radiating", "vitreous"],
    keywords: ["cavansite", "bright blue", "radiating", "vibrant"],
  },
  Cerussite: {
    name: "Cerussite",
    otherNames: [],
    visualDescription:
      "A white to colorless transparent to translucent crystal. Often forms twinned crystals creating star or cross shapes. Very clear. Adamantine to vitreous luster.",
    colors: ["white", "colorless"],
    visualFeatures: [
      "transparent",
      "translucent",
      "twinned",
      "star-shaped",
      "adamantine",
    ],
    keywords: ["cerussite", "white", "twinned", "star-shaped"],
  },
  Chalcopyrite: {
    name: "Chalcopyrite",
    otherNames: ["Peacock Ore"],
    visualDescription:
      "A metallic yellow to brassy colored crystal with iridescent tarnish showing rainbow colors. Very colorful peacock-like appearance. Metallic luster.",
    colors: ["yellow", "brass", "iridescent"],
    visualFeatures: ["opaque", "metallic", "iridescent", "tarnished"],
    keywords: ["chalcopyrite", "peacock ore", "iridescent", "metallic"],
  },
  Chlorite: {
    name: "Chlorite",
    otherNames: [],
    visualDescription:
      "A green colored translucent to opaque crystal. Often appears as inclusions in other crystals. Dark to bright green. Vitreous to pearly luster.",
    colors: ["green", "dark green"],
    visualFeatures: ["translucent", "opaque", "vitreous", "pearly"],
    keywords: ["chlorite", "green", "inclusions"],
  },
  Chrysotile: {
    name: "Chrysotile",
    otherNames: ["White Asbestos"],
    visualDescription:
      "A white to green colored fibrous mineral. Forms silky, fibrous masses. Can appear white, green, or yellow. Silky luster.",
    colors: ["white", "green", "yellow"],
    visualFeatures: ["opaque", "fibrous", "silky"],
    keywords: ["chrysotile", "fibrous", "silky", "white"],
  },
  "Cobalt Calcite": {
    name: "Cobalt Calcite",
    otherNames: [],
    visualDescription:
      "A pink to rose colored calcite with cobalt inclusions. Distinctive pink color. Rhombohedral form with vitreous luster.",
    colors: ["pink", "rose"],
    visualFeatures: ["translucent", "rhombohedral", "vitreous"],
    keywords: ["cobalt calcite", "pink", "rose", "rhombohedral"],
  },
  Cobaltite: {
    name: "Cobaltite",
    otherNames: [],
    visualDescription:
      "A silver-white to red colored metallic crystal. Often appears silvery with red tints. Forms cubic or octahedral crystals. Metallic luster.",
    colors: ["silver", "white", "red"],
    visualFeatures: ["opaque", "metallic", "cubic", "octahedral"],
    keywords: ["cobaltite", "metallic", "silver", "cubic"],
  },
  "Crocodile Jasper": {
    name: "Crocodile Jasper",
    otherNames: ["Kambaba Jasper"],
    visualDescription:
      "A dark green to black colored opaque stone with circular or orbicular patterns. Often appears dark green with lighter green circles. Polished smooth.",
    colors: ["green", "dark green", "black"],
    visualFeatures: ["opaque", "orbicular", "patterned", "polished"],
    keywords: ["crocodile jasper", "kambaba jasper", "orbicular", "patterned"],
  },
  "Dendritic Agate": {
    name: "Dendritic Agate",
    otherNames: ["Tree Agate"],
    visualDescription:
      "A white to clear colored agate with black or brown tree-like dendritic inclusions. Shows branching patterns resembling trees. Polished smooth.",
    colors: ["white", "clear"],
    visualFeatures: ["translucent", "dendritic", "tree-like", "polished"],
    keywords: ["dendritic agate", "tree agate", "dendritic", "tree-like"],
  },
  Dumortierite: {
    name: "Dumortierite",
    otherNames: [],
    visualDescription:
      "A blue to violet colored opaque to translucent stone. Often appears dark blue with white streaks. Polished smooth with vitreous luster.",
    colors: ["blue", "violet", "dark blue"],
    visualFeatures: [
      "opaque",
      "translucent",
      "polished",
      "vitreous",
      "streaked",
    ],
    keywords: ["dumortierite", "blue", "violet", "streaked"],
  },
  "Eilat Stone": {
    name: "Eilat Stone",
    otherNames: ["King Solomon Stone"],
    visualDescription:
      "A blue-green to green colored opaque stone composed of chrysocolla, malachite, and turquoise. Very colorful with blue and green patterns. Polished smooth.",
    colors: ["blue", "green", "blue-green"],
    visualFeatures: ["opaque", "mottled", "polished", "vitreous"],
    keywords: ["eilat stone", "king solomon stone", "blue-green", "mottled"],
  },
  Epidote: {
    name: "Epidote",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored transparent to translucent crystal. Often appears pistachio green. Prismatic form with vitreous luster.",
    colors: ["green", "yellow-green", "pistachio"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["epidote", "green", "pistachio", "prismatic"],
  },
  Eudialyte: {
    name: "Eudialyte",
    otherNames: [],
    visualDescription:
      "A red to pink colored transparent to translucent crystal. Often appears bright pink or red. Can form massive forms. Vitreous to greasy luster.",
    colors: ["red", "pink", "bright pink"],
    visualFeatures: ["transparent", "translucent", "massive", "vitreous"],
    keywords: ["eudialyte", "pink", "red", "bright"],
  },
  "Faden Quartz": {
    name: "Faden Quartz",
    otherNames: [],
    visualDescription:
      "A clear quartz crystal with a white line (faden) running through it. The line represents healing fractures. Transparent with visible white line.",
    colors: ["clear", "white"],
    visualFeatures: ["transparent", "line", "fractured", "vitreous"],
    keywords: ["faden quartz", "clear", "line", "fractured"],
  },
  Feldspar: {
    name: "Feldspar",
    otherNames: ["Orthoclase", "Plagioclase"],
    visualDescription:
      "A white to pink colored transparent to translucent crystal. Can also be green (amazonite). Often shows twinning patterns. Vitreous to pearly luster.",
    colors: ["white", "pink", "green", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "twinning",
      "vitreous",
      "pearly",
    ],
    keywords: ["feldspar", "twinning", "white", "pink"],
  },
  "Fiber Optic Quartz": {
    name: "Fiber Optic Quartz",
    otherNames: ["Hair Quartz"],
    visualDescription:
      "A clear quartz with fine needle-like inclusions creating a fiber optic effect. Shows light transmission along the fibers. Transparent with inclusions.",
    colors: ["clear"],
    visualFeatures: ["transparent", "fiber optic", "needle-like", "vitreous"],
    keywords: [
      "fiber optic quartz",
      "hair quartz",
      "fiber optic",
      "needle-like",
    ],
  },
  "Fire Quartz": {
    name: "Fire Quartz",
    otherNames: ["Hematoid Quartz"],
    visualDescription:
      "A red to orange colored quartz with hematite inclusions. Shows red or orange coloring throughout. Translucent with vitreous luster.",
    colors: ["red", "orange", "red-orange"],
    visualFeatures: ["translucent", "inclusions", "vitreous"],
    keywords: ["fire quartz", "hematoid quartz", "red", "orange"],
  },
  Fluorite: {
    name: "Fluorite",
    otherNames: ["Fluorspar"],
    visualDescription:
      "A colorful transparent to translucent crystal, can be purple, green, blue, yellow, or colorless. Often shows cubic or octahedral crystal forms. Vitreous luster, can be very clear.",
    colors: ["purple", "green", "blue", "yellow", "colorless", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "cubic",
      "octahedral",
      "vitreous",
      "clear",
    ],
    keywords: ["fluorite", "colorful", "cubic", "crystal"],
  },
  "Fossil Coral": {
    name: "Fossil Coral",
    otherNames: ["Agatized Coral"],
    visualDescription:
      "Fossilized coral replaced by agate, showing preserved coral structures. Often shows circular patterns from coral polyps. Polished smooth.",
    colors: ["white", "brown", "tan"],
    visualFeatures: ["opaque", "patterned", "organic", "polished"],
    keywords: ["fossil coral", "agatized coral", "patterned", "organic"],
  },
  "Garnet Grossular": {
    name: "Garnet Grossular",
    otherNames: ["Grossular"],
    visualDescription:
      "A green to yellow-green colored transparent to translucent garnet. Can range from pale green to deep green. Dodecahedral form with vitreous luster.",
    colors: ["green", "yellow-green"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["garnet grossular", "grossular", "green", "dodecahedral"],
  },
  "Garnet Pyrope": {
    name: "Garnet Pyrope",
    otherNames: ["Pyrope"],
    visualDescription:
      "A deep red to dark red colored transparent to translucent garnet. Very dark red, almost black. Dodecahedral form with vitreous luster.",
    colors: ["red", "deep red", "dark red"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["garnet pyrope", "pyrope", "deep red", "dodecahedral"],
  },
  Girasol: {
    name: "Girasol",
    otherNames: ["Fire Opal"],
    visualDescription:
      "An opal with a milky or hazy appearance that shows a glowing effect. Can be white, blue, or other colors. Translucent with opalescent effect.",
    colors: ["white", "blue", "various"],
    visualFeatures: ["translucent", "milky", "opalescent", "glowing"],
    keywords: ["girasol", "fire opal", "milky", "glowing"],
  },
  Goethite: {
    name: "Goethite",
    otherNames: [],
    visualDescription:
      "A brown to black colored opaque crystal, often forming botryoidal or stalactitic forms. Can appear dark brown or black. Dull to submetallic luster.",
    colors: ["brown", "black", "dark brown"],
    visualFeatures: ["opaque", "botryoidal", "stalactitic", "dull"],
    keywords: ["goethite", "brown", "botryoidal", "dark"],
  },
  Goldstone: {
    name: "Goldstone",
    otherNames: ["Aventurine Glass"],
    visualDescription:
      "A brown to orange colored man-made glass with sparkling copper inclusions. Very sparkly and glittery. Opaque with vitreous luster.",
    colors: ["brown", "orange", "golden"],
    visualFeatures: ["opaque", "sparkling", "glittery", "vitreous"],
    keywords: ["goldstone", "sparkling", "glittery", "golden"],
  },
  "Green Calcite": {
    name: "Green Calcite",
    otherNames: [],
    visualDescription:
      "A green colored transparent to translucent calcite. Pale to medium green color. Rhombohedral form with vitreous to pearly luster.",
    colors: ["green", "pale green"],
    visualFeatures: ["transparent", "translucent", "rhombohedral", "vitreous"],
    keywords: ["green calcite", "green", "rhombohedral", "pale"],
  },
  "Green Goldstone": {
    name: "Green Goldstone",
    otherNames: [],
    visualDescription:
      "A green colored man-made glass with sparkling inclusions. Very sparkly and glittery. Opaque with vitreous luster.",
    colors: ["green"],
    visualFeatures: ["opaque", "sparkling", "glittery", "vitreous"],
    keywords: ["green goldstone", "sparkling", "glittery", "green"],
  },
  Hackmanite: {
    name: "Hackmanite",
    otherNames: [],
    visualDescription:
      "A pink to violet colored sodalite that shows tenebrescence (color change when exposed to light). Can appear pink, violet, or white. Vitreous luster.",
    colors: ["pink", "violet", "white"],
    visualFeatures: ["opaque", "color-changing", "vitreous"],
    keywords: ["hackmanite", "color-changing", "pink", "violet"],
  },
  Hematite: {
    name: "Hematite",
    otherNames: ["Iron Ore"],
    visualDescription:
      "A dark gray to black metallic stone, very shiny and reflective like polished metal. Can appear silver-gray when polished. Opaque with a metallic to submetallic luster.",
    colors: ["black", "gray", "silver", "metallic"],
    visualFeatures: ["opaque", "metallic", "shiny", "reflective", "polished"],
    keywords: ["hematite", "metallic", "shiny", "silver"],
  },
  Hessonite: {
    name: "Hessonite",
    otherNames: ["Cinnamon Stone"],
    visualDescription:
      "An orange to brown-orange colored transparent to translucent garnet. Warm cinnamon color. Dodecahedral form with vitreous luster.",
    colors: ["orange", "brown-orange", "cinnamon"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["hessonite", "cinnamon stone", "orange", "dodecahedral"],
  },
  Hiddenite: {
    name: "Hiddenite",
    otherNames: ["Green Spodumene"],
    visualDescription:
      "A green to yellow-green colored transparent to translucent crystal. Can range from pale green to emerald green. Prismatic form with vitreous luster.",
    colors: ["green", "yellow-green", "emerald"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["hiddenite", "green spodumene", "green", "prismatic"],
  },
  Hornblende: {
    name: "Hornblende",
    otherNames: [],
    visualDescription:
      "A black to dark green colored opaque crystal. Often forms prismatic or bladed crystals. Very dark, almost black. Vitreous to dull luster.",
    colors: ["black", "dark green"],
    visualFeatures: ["opaque", "prismatic", "bladed", "vitreous"],
    keywords: ["hornblende", "black", "prismatic", "dark"],
  },
  "Hyalite Opal": {
    name: "Hyalite Opal",
    otherNames: ["Water Opal"],
    visualDescription:
      "A colorless to white transparent to translucent opal. Very clear, glass-like appearance. Can show play of color. Vitreous luster.",
    colors: ["colorless", "white", "clear"],
    visualFeatures: ["transparent", "translucent", "clear", "vitreous"],
    keywords: ["hyalite opal", "water opal", "clear", "glass-like"],
  },
  Indicolite: {
    name: "Indicolite",
    otherNames: ["Blue Tourmaline"],
    visualDescription:
      "A blue colored transparent to translucent tourmaline. Can range from pale blue to deep blue. Prismatic form with vitreous luster.",
    colors: ["blue", "pale blue", "deep blue"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["indicolite", "blue tourmaline", "blue", "prismatic"],
  },
  Iolite: {
    name: "Iolite",
    otherNames: ["Cordierite"],
    visualDescription:
      "A blue to violet colored transparent to translucent crystal. Shows strong pleochroism (different colors from different angles). Vitreous luster, can be very clear.",
    colors: ["blue", "violet", "blue-violet"],
    visualFeatures: ["transparent", "translucent", "pleochroic", "vitreous"],
    keywords: ["iolite", "cordierite", "blue-violet", "pleochroic"],
  },
  Jasper: {
    name: "Jasper",
    otherNames: [],
    visualDescription:
      "An opaque stone with various colors and patterns. Can be red, yellow, brown, or multicolored. Often shows banding or patterns. Polished smooth with vitreous to dull luster.",
    colors: ["red", "yellow", "brown", "multicolored"],
    visualFeatures: ["opaque", "banded", "patterned", "polished", "vitreous"],
    keywords: ["jasper", "banded", "patterned", "multicolored"],
  },
  Kunzite: {
    name: "Kunzite",
    otherNames: ["Pink Spodumene"],
    visualDescription:
      "A pink to violet colored transparent to translucent crystal. Can show pleochroism. Prismatic form with vitreous luster. Often very clear and bright.",
    colors: ["pink", "violet", "pale pink"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "pleochroic",
      "vitreous",
    ],
    keywords: ["kunzite", "pink spodumene", "pink", "prismatic"],
  },
  Kyanite: {
    name: "Kyanite",
    otherNames: ["Disthene"],
    visualDescription:
      "A blue to blue-green colored transparent to translucent crystal. Often shows different hardness in different directions. Bladed or tabular crystal form with vitreous to pearly luster.",
    colors: ["blue", "blue-green", "white"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bladed",
      "tabular",
      "vitreous",
      "pearly",
    ],
    keywords: ["kyanite", "blue crystal", "bladed", "tabular"],
  },
  Larimar: {
    name: "Larimar",
    otherNames: ["Blue Pectolite"],
    visualDescription:
      "A blue to blue-green colored opaque to translucent stone with white streaks. Distinctive ocean blue color. Polished smooth with vitreous to silky luster.",
    colors: ["blue", "blue-green", "ocean blue"],
    visualFeatures: [
      "opaque",
      "translucent",
      "streaked",
      "polished",
      "vitreous",
    ],
    keywords: ["larimar", "blue pectolite", "ocean blue", "streaked"],
  },
  Lepidocrocite: {
    name: "Lepidocrocite",
    otherNames: [],
    visualDescription:
      "A red to orange-red colored translucent to opaque crystal. Often forms scaly or platy aggregates. Can appear bright red. Vitreous to pearly luster.",
    colors: ["red", "orange-red"],
    visualFeatures: ["translucent", "opaque", "scaly", "platy", "vitreous"],
    keywords: ["lepidocrocite", "red", "scaly", "platy"],
  },
  Limonite: {
    name: "Limonite",
    otherNames: [],
    visualDescription:
      "A yellow to brown colored opaque mineral, often forming botryoidal or stalactitic forms. Can appear yellow-brown or dark brown. Dull to earthy luster.",
    colors: ["yellow", "brown", "yellow-brown"],
    visualFeatures: ["opaque", "botryoidal", "stalactitic", "dull"],
    keywords: ["limonite", "yellow", "brown", "botryoidal"],
  },
  Magnesite: {
    name: "Magnesite",
    otherNames: [],
    visualDescription:
      "A white to colorless opaque to translucent crystal. Often appears white or cream colored. Can form botryoidal or massive forms. Vitreous to dull luster.",
    colors: ["white", "colorless", "cream"],
    visualFeatures: ["opaque", "translucent", "botryoidal", "vitreous"],
    keywords: ["magnesite", "white", "botryoidal", "cream"],
  },
  Malachite: {
    name: "Malachite",
    otherNames: ["Green Copper"],
    visualDescription:
      "A bright green colored opaque stone with distinctive concentric banding patterns. Rich emerald to forest green color with darker green bands. Opaque with a silky to vitreous luster.",
    colors: ["green", "emerald", "forest green"],
    visualFeatures: ["opaque", "banded", "concentric", "silky", "polished"],
    keywords: ["malachite", "green", "banded", "concentric"],
  },
  Meteorite: {
    name: "Meteorite",
    otherNames: ["Space Rock"],
    visualDescription:
      "A metallic or stony material from space. Can be metallic silver-gray or stony black. Often shows fusion crust or Widmanstätten patterns. Metallic to dull luster.",
    colors: ["silver", "gray", "black"],
    visualFeatures: ["metallic", "patterned", "fusion crust", "dull"],
    keywords: ["meteorite", "space rock", "metallic", "patterned"],
  },
  Moldavite: {
    name: "Moldavite",
    otherNames: ["Tektite"],
    visualDescription:
      "A green to brown-green colored transparent to translucent glass. Formed from meteorite impact. Distinctive bumpy or pitted surface. Vitreous luster.",
    colors: ["green", "brown-green"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bumpy",
      "pitted",
      "vitreous",
    ],
    keywords: ["moldavite", "tektite", "green glass", "bumpy"],
  },
  Mookaite: {
    name: "Mookaite",
    otherNames: ["Australian Jasper"],
    visualDescription:
      "A multicolored opaque jasper with red, yellow, white, and brown patterns. Very colorful with distinctive patterns. Polished smooth with vitreous luster.",
    colors: ["red", "yellow", "white", "brown", "multicolored"],
    visualFeatures: ["opaque", "patterned", "polished", "vitreous"],
    keywords: ["mookaite", "australian jasper", "multicolored", "patterned"],
  },
  Morganite: {
    name: "Morganite",
    otherNames: ["Pink Beryl"],
    visualDescription:
      "A pink to peach colored transparent to translucent crystal. Can range from pale pink to deeper peach. Hexagonal prismatic form with vitreous luster.",
    colors: ["pink", "peach", "salmon"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "vitreous",
    ],
    keywords: ["morganite", "pink beryl", "peach", "hexagonal"],
  },
  Nuummite: {
    name: "Nuummite",
    otherNames: [],
    visualDescription:
      "A black to dark gray colored opaque stone with golden or iridescent flashes. Very dark base with colorful flashes. Polished smooth with vitreous luster.",
    colors: ["black", "gray", "iridescent"],
    visualFeatures: ["opaque", "iridescent", "polished", "vitreous"],
    keywords: ["nuummite", "black", "iridescent", "flashing"],
  },
  Olivine: {
    name: "Olivine",
    otherNames: ["Peridot"],
    visualDescription:
      "A bright yellow-green to olive green transparent to translucent crystal. Very distinctive lime green color. Vitreous luster, often appears bright and clear.",
    colors: ["green", "yellow-green", "olive", "lime"],
    visualFeatures: [
      "transparent",
      "translucent",
      "bright",
      "vitreous",
      "clear",
    ],
    keywords: ["olivine", "peridot", "lime green", "yellow-green"],
  },
  Onyx: {
    name: "Onyx",
    otherNames: [],
    visualDescription:
      "A black to dark colored opaque stone with parallel bands. Often solid black or shows white bands. Polished smooth with vitreous to dull luster.",
    colors: ["black", "dark", "white"],
    visualFeatures: ["opaque", "banded", "polished", "vitreous"],
    keywords: ["onyx", "black", "banded", "smooth"],
  },
  Opal: {
    name: "Opal",
    otherNames: ["Precious Opal"],
    visualDescription:
      "A white to black colored stone with iridescent play of color (opalescence). Can show flashes of rainbow colors. Translucent to opaque with a waxy to vitreous luster.",
    colors: ["white", "black", "iridescent", "multicolored"],
    visualFeatures: [
      "translucent",
      "opaque",
      "iridescent",
      "opalescent",
      "waxy",
      "colorful",
    ],
    keywords: ["opal", "iridescent", "opalescent", "rainbow"],
  },
  Orthoclase: {
    name: "Orthoclase",
    otherNames: ["Feldspar"],
    visualDescription:
      "A white to pink colored transparent to translucent feldspar. Often shows twinning patterns. Vitreous to pearly luster.",
    colors: ["white", "pink"],
    visualFeatures: ["transparent", "translucent", "twinning", "vitreous"],
    keywords: ["orthoclase", "feldspar", "white", "pink"],
  },
  Pectolite: {
    name: "Pectolite",
    otherNames: [],
    visualDescription:
      "A white to gray colored translucent to opaque crystal. Often forms radiating or fibrous aggregates. Can appear white or gray. Vitreous to silky luster.",
    colors: ["white", "gray"],
    visualFeatures: [
      "translucent",
      "opaque",
      "radiating",
      "fibrous",
      "vitreous",
    ],
    keywords: ["pectolite", "white", "radiating", "fibrous"],
  },
  "Petrified Wood": {
    name: "Petrified Wood",
    otherNames: ["Fossil Wood"],
    visualDescription:
      "Fossilized wood replaced by minerals, showing preserved tree ring patterns. Often shows brown, tan, and cream colors with wood grain patterns. Polished smooth.",
    colors: ["brown", "tan", "cream"],
    visualFeatures: ["opaque", "patterned", "wood grain", "polished"],
    keywords: ["petrified wood", "fossil wood", "wood grain", "patterned"],
  },
  Phenakite: {
    name: "Phenakite",
    otherNames: [],
    visualDescription:
      "A colorless to white transparent crystal. Very clear and bright. Forms rhombohedral or prismatic crystals. Vitreous luster.",
    colors: ["colorless", "white"],
    visualFeatures: ["transparent", "rhombohedral", "prismatic", "vitreous"],
    keywords: ["phenakite", "clear", "colorless", "rhombohedral"],
  },
  Pietersite: {
    name: "Pietersite",
    otherNames: [],
    visualDescription:
      "A blue to brown colored opaque stone with chatoyant (cat's eye) effect and swirling patterns. Shows silky bands of light. Polished smooth with silky luster.",
    colors: ["blue", "brown", "golden"],
    visualFeatures: ["opaque", "chatoyant", "swirling", "silky", "polished"],
    keywords: ["pietersite", "chatoyant", "swirling", "silky"],
  },
  "Pink Calcite": {
    name: "Pink Calcite",
    otherNames: [],
    visualDescription:
      "A pink colored transparent to translucent calcite. Pale to medium pink color. Rhombohedral form with vitreous to pearly luster.",
    colors: ["pink", "pale pink"],
    visualFeatures: ["transparent", "translucent", "rhombohedral", "vitreous"],
    keywords: ["pink calcite", "pink", "rhombohedral", "pale"],
  },
  Prasiolite: {
    name: "Prasiolite",
    otherNames: ["Green Amethyst"],
    visualDescription:
      "A green colored transparent to translucent quartz. Pale to medium green color. Hexagonal form with vitreous luster. Can be very clear.",
    colors: ["green", "pale green"],
    visualFeatures: ["transparent", "translucent", "hexagonal", "vitreous"],
    keywords: ["prasiolite", "green amethyst", "green quartz", "hexagonal"],
  },
  Prehnite: {
    name: "Prehnite",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored translucent to opaque crystal. Often appears pale green or apple green. Botryoidal or tabular form with vitreous to pearly luster.",
    colors: ["green", "yellow-green", "apple green"],
    visualFeatures: [
      "translucent",
      "opaque",
      "botryoidal",
      "tabular",
      "vitreous",
    ],
    keywords: ["prehnite", "green", "botryoidal", "apple green"],
  },
  Purpurite: {
    name: "Purpurite",
    otherNames: [],
    visualDescription:
      "A purple to pink-purple colored opaque crystal. Rich purple color. Often appears dark purple. Dull to submetallic luster.",
    colors: ["purple", "pink-purple"],
    visualFeatures: ["opaque", "dull", "submetallic"],
    keywords: ["purpurite", "purple", "dark purple"],
  },
  Pyrite: {
    name: "Pyrite",
    otherNames: ["Fool's Gold"],
    visualDescription:
      "A brassy yellow to golden colored metallic stone with cubic or pyritohedral crystals. Very shiny and reflective like gold. Opaque with a metallic luster, often forms cubic crystals.",
    colors: ["golden", "yellow", "brass", "metallic"],
    visualFeatures: ["opaque", "metallic", "shiny", "cubic", "crystalline"],
    keywords: ["pyrite", "fool's gold", "metallic", "cubic"],
  },
  Rhodizite: {
    name: "Rhodizite",
    otherNames: [],
    visualDescription:
      "A colorless to white transparent to translucent crystal. Very clear and bright. Can form octahedral crystals. Vitreous luster.",
    colors: ["colorless", "white"],
    visualFeatures: ["transparent", "translucent", "octahedral", "vitreous"],
    keywords: ["rhodizite", "clear", "octahedral", "colorless"],
  },
  Rhodochrosite: {
    name: "Rhodochrosite",
    otherNames: [],
    visualDescription:
      "A pink to red colored translucent to opaque stone with distinctive banding. Rich pink to rose color with white bands. Polished smooth with vitreous to pearly luster.",
    colors: ["pink", "rose", "red"],
    visualFeatures: ["translucent", "opaque", "banded", "polished", "vitreous"],
    keywords: ["rhodochrosite", "pink", "banded", "rose"],
  },
  Rhodonite: {
    name: "Rhodonite",
    otherNames: [],
    visualDescription:
      "A pink to red colored opaque stone with black veining. Rich pink to rose color with distinctive black manganese oxide veins. Polished smooth with vitreous luster.",
    colors: ["pink", "rose", "red"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous"],
    keywords: ["rhodonite", "pink", "veined", "black veins"],
  },
  Rutile: {
    name: "Rutile",
    otherNames: [],
    visualDescription:
      "A golden yellow to red colored transparent to translucent crystal. Often forms needle-like crystals. Can be very bright golden. Adamantine to metallic luster.",
    colors: ["golden", "yellow", "red"],
    visualFeatures: ["transparent", "translucent", "needle-like", "adamantine"],
    keywords: ["rutile", "golden", "needle-like", "bright"],
  },
  Sardonyx: {
    name: "Sardonyx",
    otherNames: [],
    visualDescription:
      "A red to brown colored banded agate with white bands. Shows parallel bands of red/brown and white. Polished smooth with vitreous luster.",
    colors: ["red", "brown", "white"],
    visualFeatures: ["opaque", "banded", "parallel", "polished", "vitreous"],
    keywords: ["sardonyx", "banded", "red", "white bands"],
  },
  Scapolite: {
    name: "Scapolite",
    otherNames: [],
    visualDescription:
      "A white to yellow colored transparent to translucent crystal. Can also be pink or violet. Prismatic form with vitreous luster.",
    colors: ["white", "yellow", "pink", "violet"],
    visualFeatures: ["transparent", "translucent", "prismatic", "vitreous"],
    keywords: ["scapolite", "white", "prismatic", "colorful"],
  },
  Scheelite: {
    name: "Scheelite",
    otherNames: [],
    visualDescription:
      "A white to yellow colored transparent to translucent crystal. Can also be orange. Forms tetragonal crystals. Vitreous to adamantine luster.",
    colors: ["white", "yellow", "orange"],
    visualFeatures: ["transparent", "translucent", "tetragonal", "vitreous"],
    keywords: ["scheelite", "white", "yellow", "tetragonal"],
  },
  Serpentine: {
    name: "Serpentine",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored opaque to translucent stone. Can range from pale green to dark green. Often shows mottled patterns. Waxy to vitreous luster.",
    colors: ["green", "yellow-green", "dark green"],
    visualFeatures: ["opaque", "translucent", "mottled", "waxy", "vitreous"],
    keywords: ["serpentine", "green", "mottled", "waxy"],
  },
  Smithsonite: {
    name: "Smithsonite",
    otherNames: [],
    visualDescription:
      "A blue to green colored translucent to opaque crystal. Can also be pink, yellow, or other colors. Often forms botryoidal clusters. Vitreous to pearly luster.",
    colors: ["blue", "green", "pink", "yellow", "various"],
    visualFeatures: ["translucent", "opaque", "botryoidal", "vitreous"],
    keywords: ["smithsonite", "botryoidal", "colorful", "blue-green"],
  },
  Sodalite: {
    name: "Sodalite",
    otherNames: [],
    visualDescription:
      "A blue to blue-violet colored opaque stone, often with white calcite veining. Rich royal blue color. Polished smooth with vitreous to dull luster.",
    colors: ["blue", "royal blue", "blue-violet"],
    visualFeatures: ["opaque", "veined", "polished", "vitreous"],
    keywords: ["sodalite", "royal blue", "veined", "blue"],
  },
  Spectrolite: {
    name: "Spectrolite",
    otherNames: ["Labradorite"],
    visualDescription:
      "A dark stone with intense iridescent flashes of multiple colors. Very colorful labradorescence showing blues, greens, golds, and purples. Polished smooth.",
    colors: ["dark", "iridescent", "multicolored"],
    visualFeatures: ["opaque", "iridescent", "polished", "colorful"],
    keywords: ["spectrolite", "labradorite", "iridescent", "colorful"],
  },
  Spessartine: {
    name: "Spessartine",
    otherNames: ["Garnet"],
    visualDescription:
      "An orange to orange-red colored transparent to translucent garnet. Bright orange color. Dodecahedral form with vitreous luster.",
    colors: ["orange", "orange-red"],
    visualFeatures: ["transparent", "translucent", "dodecahedral", "vitreous"],
    keywords: ["spessartine", "garnet", "orange", "dodecahedral"],
  },
  Sphene: {
    name: "Sphene",
    otherNames: ["Titanite"],
    visualDescription:
      "A yellow to green colored transparent to translucent crystal. Very bright and brilliant with high dispersion. Wedge-shaped crystals. Adamantine luster.",
    colors: ["yellow", "green", "brown"],
    visualFeatures: [
      "transparent",
      "translucent",
      "wedge-shaped",
      "adamantine",
      "brilliant",
    ],
    keywords: ["sphene", "titanite", "brilliant", "wedge-shaped"],
  },
  Spinel: {
    name: "Spinel",
    otherNames: [],
    visualDescription:
      "A transparent crystal that can be red, blue, pink, or other colors. Very clear and bright. Octahedral crystal form with vitreous to adamantine luster.",
    colors: ["red", "blue", "pink", "various"],
    visualFeatures: [
      "transparent",
      "octahedral",
      "vitreous",
      "adamantine",
      "clear",
    ],
    keywords: ["spinel", "colorful", "octahedral", "clear"],
  },
  Staurolite: {
    name: "Staurolite",
    otherNames: ["Fairy Cross"],
    visualDescription:
      "A brown to reddish-brown colored opaque crystal that forms cross-shaped twins. Distinctive cross formation. Dull to subvitreous luster.",
    colors: ["brown", "reddish-brown"],
    visualFeatures: ["opaque", "cross-shaped", "twinned", "dull"],
    keywords: ["staurolite", "fairy cross", "cross-shaped", "twinned"],
  },
  Stibnite: {
    name: "Stibnite",
    otherNames: [],
    visualDescription:
      "A metallic gray to black colored crystal forming long, needle-like or bladed crystals. Very shiny metallic luster. Often appears like metallic needles.",
    colors: ["gray", "black", "metallic"],
    visualFeatures: ["opaque", "metallic", "needle-like", "bladed", "shiny"],
    keywords: ["stibnite", "metallic", "needle-like", "bladed"],
  },
  Sugilite: {
    name: "Sugilite",
    otherNames: [],
    visualDescription:
      "A purple to pink colored opaque stone. Rich purple color, can range from pale pink-purple to deep purple. Polished smooth with vitreous to waxy luster.",
    colors: ["purple", "pink-purple"],
    visualFeatures: ["opaque", "polished", "vitreous", "waxy"],
    keywords: ["sugilite", "purple", "pink-purple", "polished"],
  },
  Sunstone: {
    name: "Sunstone",
    otherNames: ["Aventurine Feldspar"],
    visualDescription:
      "An orange to red colored translucent stone with sparkling inclusions (aventurescence). Can appear golden or orange with glittery flecks. Translucent with a vitreous luster.",
    colors: ["orange", "red", "golden"],
    visualFeatures: [
      "translucent",
      "sparkling",
      "glittery",
      "inclusions",
      "vitreous",
    ],
    keywords: ["sunstone", "sparkling", "glittery", "golden"],
  },
  Tanzanite: {
    name: "Tanzanite",
    otherNames: ["Blue Zoisite"],
    visualDescription:
      "A blue to violet colored transparent to translucent crystal. Can show pleochroism (different colors from different angles). Prismatic form with vitreous luster. Rich blue-violet color.",
    colors: ["blue", "violet", "blue-violet"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "vitreous",
      "pleochroic",
    ],
    keywords: ["tanzanite", "blue zoisite", "blue-violet", "pleochroic"],
  },
  Tektite: {
    name: "Tektite",
    otherNames: ["Meteorite Glass"],
    visualDescription:
      "A black to dark green colored glass formed from meteorite impacts. Often has a bumpy or pitted surface. Can be transparent to opaque with vitreous luster.",
    colors: ["black", "dark green"],
    visualFeatures: ["transparent", "opaque", "bumpy", "pitted", "vitreous"],
    keywords: ["tektite", "meteorite glass", "black", "bumpy"],
  },
  Thulite: {
    name: "Thulite",
    otherNames: ["Pink Zoisite"],
    visualDescription:
      "A pink to rose colored opaque to translucent zoisite. Rich pink color, often with white streaks. Polished smooth with vitreous luster.",
    colors: ["pink", "rose"],
    visualFeatures: [
      "opaque",
      "translucent",
      "streaked",
      "polished",
      "vitreous",
    ],
    keywords: ["thulite", "pink zoisite", "pink", "rose"],
  },
  Tourmaline: {
    name: "Tourmaline",
    otherNames: [],
    visualDescription:
      "A colorful transparent to translucent crystal that can be black, green, pink, blue, or multicolored. Prismatic form with vitreous luster. Often shows color zoning.",
    colors: ["black", "green", "pink", "blue", "various"],
    visualFeatures: [
      "transparent",
      "translucent",
      "prismatic",
      "zoned",
      "vitreous",
    ],
    keywords: ["tourmaline", "prismatic", "colorful", "zoned"],
  },
  Turquoise: {
    name: "Turquoise",
    otherNames: ["Turkish Stone"],
    visualDescription:
      "A blue-green to sky blue colored opaque stone, often with black or brown veining (matrix). Can range from pale blue-green to deep turquoise. Typically polished smooth with a waxy to vitreous luster.",
    colors: ["blue", "green", "turquoise", "sky blue", "blue-green"],
    visualFeatures: [
      "opaque",
      "polished",
      "veined",
      "matrix",
      "waxy",
      "smooth",
    ],
    keywords: ["turquoise", "blue-green", "veined", "matrix"],
  },
  Vanadinite: {
    name: "Vanadinite",
    otherNames: [],
    visualDescription:
      "A bright red to orange-red colored transparent to translucent crystal. Very distinctive bright red-orange color. Forms hexagonal prismatic crystals. Adamantine to resinous luster.",
    colors: ["red", "orange-red", "bright red"],
    visualFeatures: [
      "transparent",
      "translucent",
      "hexagonal",
      "prismatic",
      "adamantine",
    ],
    keywords: ["vanadinite", "red-orange", "bright", "hexagonal"],
  },
  Variscite: {
    name: "Variscite",
    otherNames: [],
    visualDescription:
      "A green to blue-green colored translucent to opaque stone. Often appears apple green or turquoise green. Polished smooth with waxy to vitreous luster.",
    colors: ["green", "blue-green", "apple green"],
    visualFeatures: ["translucent", "opaque", "polished", "waxy", "vitreous"],
    keywords: ["variscite", "green", "apple green", "polished"],
  },
  Wavellite: {
    name: "Wavellite",
    otherNames: [],
    visualDescription:
      "A green to yellow-green colored translucent to opaque crystal. Often forms radiating clusters or spherical forms. Vitreous to pearly luster.",
    colors: ["green", "yellow-green"],
    visualFeatures: [
      "translucent",
      "opaque",
      "radiating",
      "spherical",
      "vitreous",
    ],
    keywords: ["wavellite", "green", "radiating", "spherical"],
  },
  Wulfenite: {
    name: "Wulfenite",
    otherNames: [],
    visualDescription:
      "An orange to yellow colored transparent to translucent crystal. Very bright orange or yellow color. Forms tabular or square crystals. Adamantine to resinous luster.",
    colors: ["orange", "yellow", "bright orange"],
    visualFeatures: [
      "transparent",
      "translucent",
      "tabular",
      "square",
      "adamantine",
    ],
    keywords: ["wulfenite", "orange", "yellow", "tabular"],
  },
  Zincite: {
    name: "Zincite",
    otherNames: [],
    visualDescription:
      "A bright red to orange colored transparent to translucent crystal. Very distinctive bright red-orange color. Often forms massive forms. Adamantine luster.",
    colors: ["red", "orange", "red-orange"],
    visualFeatures: ["transparent", "translucent", "massive", "adamantine"],
    keywords: ["zincite", "red-orange", "bright", "massive"],
  },
  Zoisite: {
    name: "Zoisite",
    otherNames: [],
    visualDescription:
      "A green to blue-green colored opaque to translucent crystal. Can also be pink (thulite). Often shows striations. Prismatic form with vitreous luster.",
    colors: ["green", "blue-green", "pink"],
    visualFeatures: [
      "opaque",
      "translucent",
      "prismatic",
      "striated",
      "vitreous",
    ],
    keywords: ["zoisite", "green", "prismatic", "striated"],
  },
  "Rubellite in Granite": {
    name: "Rubellite in Granite",
    otherNames: ["Pink Tourmaline in Granite", "Rubellite Granite"],
    visualDescription:
      "A combination stone featuring pink to red rubellite (pink tourmaline) crystals embedded in granite matrix. The granite base is typically gray, white, or black with visible feldspar and mica crystals. The rubellite appears as bright pink to deep red prismatic crystals scattered throughout the granite. The tourmaline crystals are transparent to translucent with vitreous luster, contrasting sharply with the opaque, granular granite background. Often shows a speckled or mottled appearance.",
    colors: ["pink", "red", "white", "black", "gray"],
    visualFeatures: [
      "opaque",
      "translucent",
      "transparent",
      "prismatic",
      "granular",
      "speckled",
      "mottled",
      "embedded",
      "vitreous",
      "contrasting",
    ],
    keywords: [
      "rubellite",
      "pink tourmaline",
      "granite",
      "feldspar",
      "mica",
      "embedded",
      "combination",
      "speckled",
    ],
  },
  "Super Seven": {
    name: "Super Seven",
    otherNames: ["Melody Stone", "Sacred Seven"],
    visualDescription:
      "A powerful combination crystal containing seven minerals: Amethyst (purple), Cacoxenite (golden yellow), Goethite (brown/black), Lepidocrocite (red), Clear Quartz (transparent), Rutile (golden needles), and Smoky Quartz (brown/black). The stone typically shows a purple base (amethyst) with visible inclusions of golden yellow fibers (cacoxenite), brown/black patches (goethite), red streaks (lepidocrocite), golden needle-like inclusions (rutile), and smoky brown areas (smoky quartz). Transparent to translucent areas (clear quartz) allow light to pass through. The overall appearance is complex and multicolored with a vitreous to glassy luster.",
    colors: [
      "purple",
      "yellow",
      "golden",
      "brown",
      "black",
      "red",
      "clear",
      "multicolored",
    ],
    visualFeatures: [
      "transparent",
      "translucent",
      "opaque",
      "vitreous",
      "glassy",
      "included",
      "fibrous",
      "needle-like",
      "streaked",
      "patched",
      "complex",
      "multicolored",
    ],
    keywords: [
      "super seven",
      "melody stone",
      "sacred seven",
      "amethyst",
      "cacoxenite",
      "rutile",
      "combination",
      "included",
      "multimineral",
    ],
  },
  "Angel Aura Quartz": {
    name: "Angel Aura Quartz",
    otherNames: ["Opal Aura Quartz", "Rainbow Aura Quartz"],
    visualDescription:
      "A transparent to translucent clear quartz crystal with an iridescent rainbow coating. The base crystal is clear and glass-like, but the surface displays a brilliant rainbow or opalescent sheen that shifts colors in the light. Colors include pink, blue, purple, gold, and green iridescence. The coating creates a metallic or pearlescent appearance over the transparent crystal. Hexagonal prismatic form with vitreous luster enhanced by the rainbow coating. The iridescent effect is most visible when viewed at different angles.",
    colors: [
      "clear",
      "rainbow",
      "iridescent",
      "pink",
      "blue",
      "purple",
      "gold",
      "green",
    ],
    visualFeatures: [
      "transparent",
      "translucent",
      "iridescent",
      "opalescent",
      "pearlescent",
      "metallic",
      "hexagonal",
      "prismatic",
      "vitreous",
      "coated",
      "shimmering",
      "rainbow",
    ],
    keywords: [
      "angel aura",
      "aura quartz",
      "rainbow",
      "iridescent",
      "opalescent",
      "coated",
      "shimmering",
      "clear quartz",
    ],
  },
  "Azurite Malachite": {
    name: "Azurite Malachite",
    otherNames: ["Azure-Malachite", "Blue-Green Combination"],
    visualDescription:
      "A combination crystal featuring both azurite (blue) and malachite (green) minerals together. The stone displays distinctive blue and green banding, swirling patterns, or patches where the two minerals meet. Azurite appears as deep blue to azure blue areas, while malachite shows bright green to emerald green areas. The colors often blend together creating turquoise-like zones. Opaque to translucent in different areas. Can have a vitreous to silky luster. The banding patterns are often concentric, swirling, or irregular. The blue and green colors create a striking contrast.",
    colors: ["blue", "green", "azure", "emerald", "turquoise", "blue-green"],
    visualFeatures: [
      "opaque",
      "translucent",
      "banded",
      "swirling",
      "patched",
      "concentric",
      "irregular",
      "vitreous",
      "silky",
      "contrasting",
      "multicolored",
    ],
    keywords: [
      "azurite",
      "malachite",
      "blue-green",
      "banded",
      "swirling",
      "combination",
      "azure",
      "emerald",
    ],
  },
};

/**
 * Get crystal context for CLIP matching
 * Falls back to database if not in context file
 */
export function getCrystalContext(crystalName: string): CrystalContext | null {
  return CRYSTAL_CONTEXT[crystalName] || null;
}

/**
 * Get all crystal contexts
 */
export function getAllCrystalContexts(): CrystalContext[] {
  return Object.values(CRYSTAL_CONTEXT);
}

/**
 * Create rich prompt for CLIP matching from context
 */
export function createCLIPPrompt(context: CrystalContext): string {
  const parts = [
    context.name,
    ...context.otherNames,
    ...context.colors.map((c) => `${c} colored`),
    context.visualDescription,
    ...context.visualFeatures,
  ];
  return parts.join(", ");
}
