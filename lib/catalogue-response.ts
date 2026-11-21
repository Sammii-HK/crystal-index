import { z } from "zod";
const optionalText = z.string().nullable().optional();
const record = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: optionalText,
  bio: optionalText,
  otherNames: optionalText,
  origin: optionalText,
  originLocation: optionalText,
  memento: optionalText,
  intention: z.array(z.string()).optional(),
  hardness: z.number().nullable().optional(),
  createdAt: z.string(),
  image: z.array(
    z.union([
      z.number(),
      z.object({ id: z.number(), blobUrl: z.string().nullable() }),
    ]),
  ),
  crystalInfo: z
    .object({
      info: optionalText,
      colour: z.array(z.string()),
      chakra: z.array(z.string()),
    })
    .nullable()
    .optional(),
});
export function parseCatalogueResponse(input: unknown) {
  const parsed = z.object({ crystals: z.array(record) }).safeParse(input);
  return parsed.success ? parsed.data : null;
}
