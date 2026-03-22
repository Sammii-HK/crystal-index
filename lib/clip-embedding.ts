import { prisma } from './prisma'

const DEEPINFRA_CLIP = 'https://api.deepinfra.com/v1/inference/sentence-transformers/clip-ViT-B-32'

/**
 * Generate a 512-dim CLIP embedding for an image URL via DeepInfra.
 * Returns null on failure (non-fatal — learning DB is best-effort).
 */
export async function generateClipEmbedding(imageUrl: string): Promise<number[] | null> {
  try {
    const response = await fetch(DEEPINFRA_CLIP, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPINFRA_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: [imageUrl] }),
    })

    if (!response.ok) {
      console.error('CLIP embedding failed:', response.status)
      return null
    }

    const data = await response.json()
    return data.embeddings?.[0] ?? null
  } catch (error) {
    console.error('CLIP embedding error:', error)
    return null
  }
}

/**
 * Find visually similar confirmed crystals using pgvector cosine similarity.
 * Returns empty array if pgvector is unavailable or no data exists yet.
 */
export async function findSimilarConfirmed(
  embedding: number[],
  limit = 5
): Promise<Array<{ crystalName: string; similarity: number }>> {
  try {
    const vectorStr = `[${embedding.join(',')}]`
    const results = await prisma().$queryRaw<Array<{ crystal_name: string; similarity: number }>>`
      SELECT "crystalName" AS crystal_name,
             1 - (embedding <=> ${vectorStr}::vector) AS similarity
      FROM "ImageEmbedding"
      WHERE embedding IS NOT NULL
        AND "confirmedCount" > 0
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT ${limit}
    `
    return results.map(r => ({ crystalName: r.crystal_name, similarity: r.similarity }))
  } catch {
    // pgvector not yet set up, or table empty — degrade gracefully
    return []
  }
}

/**
 * Store or update a confirmed CLIP embedding in the learning database.
 */
export async function storeConfirmedEmbedding(
  imageHash: string,
  crystalName: string,
  embedding: number[]
): Promise<void> {
  try {
    const vectorStr = `[${embedding.join(',')}]`
    await prisma().$executeRaw`
      INSERT INTO "ImageEmbedding" (id, "imageHash", "crystalName", embedding, "confirmedCount", "createdAt", "updatedAt")
      VALUES (gen_random_uuid()::text, ${imageHash}, ${crystalName}, ${vectorStr}::vector, 1, NOW(), NOW())
      ON CONFLICT ("imageHash") DO UPDATE SET
        "crystalName"    = ${crystalName},
        "confirmedCount" = "ImageEmbedding"."confirmedCount" + 1,
        "updatedAt"      = NOW()
    `
  } catch (error) {
    console.error('Store embedding error:', error)
  }
}
