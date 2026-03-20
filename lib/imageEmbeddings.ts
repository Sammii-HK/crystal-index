import Replicate from "replicate";
import { prisma } from "./prisma";

// Lazy initialization
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

/**
 * Generate CLIP embedding for an image
 * Uses CLIP ViT-L-14 model to generate a 768-dimensional vector
 */
export async function generateImageEmbedding(imageUrl: string): Promise<number[]> {
  const replicate = getReplicate();
  
  try {
    // Use CLIP embeddings model - this generates a vector representation of the image
    // Model: nateraw/clip-embeddings
    const output = await replicate.run(
      "nateraw/clip-embeddings:main",
      {
        input: {
          image: imageUrl,
          model: "ViT-L-14", // Same model used by CLIP Interrogator for consistency
        },
      }
    ) as { embedding: number[] };

    return output.embedding;
  } catch (error) {
    console.error("Error generating image embedding:", error);
    // Fallback: try alternative model
    try {
      const output = await replicate.run(
        "pharmapsychotic/clip-interrogator:8151e1c9f47e696fa316146a2e35812ccf79cfc9eba05b11c7f450155102af70",
        {
          input: {
            image: imageUrl,
            mode: "fast", // Fast mode for embeddings
            clip_model_name: "ViT-L-14/openai",
            return_embeddings: true, // Request embeddings instead of text
          },
        }
      );
      
      // If this model doesn't support embeddings, we'll need to extract them differently
      // For now, throw error to use alternative approach
      throw new Error("Embedding generation not available, using alternative method");
    } catch (fallbackError) {
      console.error("Fallback embedding generation failed:", fallbackError);
      throw new Error("Failed to generate image embedding");
    }
  }
}

/**
 * Calculate cosine similarity between two embeddings
 * Returns a value between -1 and 1, where 1 is identical
 */
export function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  if (embedding1.length !== embedding2.length) {
    throw new Error("Embeddings must have the same dimension");
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Get crystal images with their URLs for embedding generation
 */
export async function getCrystalImages(): Promise<
  Array<{
    crystalId: number;
    crystalName: string;
    imageUrl: string;
    imageId: number;
  }>
> {
  const crystals = await prisma().crystal.findMany({
    where: {
      createdById: process.env.SUPER_USER_ID,
    },
    select: {
      id: true,
      name: true,
      image: {
        take: 1, // Use first image per crystal
        select: {
          id: true,
          blobUrl: true,
        },
      },
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://crystalindex.co.uk";

  return crystals
    .filter((crystal) => crystal.image.length > 0)
    .map((crystal) => ({
      crystalId: crystal.id,
      crystalName: crystal.name,
      imageUrl:
        crystal.image[0].blobUrl ||
        `${baseUrl}/api/image/${crystal.image[0].id}`,
      imageId: crystal.image[0].id,
    }));
}

/**
 * Cache for crystal image embeddings
 * In production, consider using Redis or a database table
 */
const embeddingCache = new Map<string, number[]>();

/**
 * Get or generate embedding for a crystal image
 * Uses cache to avoid regenerating embeddings
 */
export async function getCrystalImageEmbedding(
  imageUrl: string,
  imageId: number
): Promise<number[]> {
  const cacheKey = `image_${imageId}`;

  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey)!;
  }

  const embedding = await generateImageEmbedding(imageUrl);
  embeddingCache.set(cacheKey, embedding);

  return embedding;
}


