/**
 * Generate a URL-safe slug from a crystal name.
 * e.g. "Rose Quartz" → "rose-quartz"
 *      "Hawk's Eye"  → "hawks-eye"
 *      "Blue Lace Agate" → "blue-lace-agate"
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')       // remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '') // remove remaining special characters
    .trim()
    .replace(/\s+/g, '-')        // spaces to hyphens
    .replace(/-+/g, '-')         // collapse multiple hyphens
}
