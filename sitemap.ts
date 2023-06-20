import { MetadataRoute } from 'next'

// type Sitemap = Array<{
//   url: string
//   lastModified?: string | Date
// }>

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://crystalindex.co.uk',
      lastModified: new Date(),
    },
    {
      url: 'https://crystalindex.co.uk/crystals',
      lastModified: new Date(),
    },
    {
      url: 'https://crystalindex.co.uk/locations',
      lastModified: new Date(),
    },
  ]
}