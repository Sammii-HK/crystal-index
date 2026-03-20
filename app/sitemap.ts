import { MetadataRoute } from 'next'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/helpers/slugify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'

  // Get all published blog posts
  const blogPosts = await prisma().blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Get all crystals — use stored slug if present, else derive from name
  const crystals = await prisma().crystal.findMany({
    select: { id: true, name: true, slug: true, updatedAt: true },
  })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/crystals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/identify`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Crystal pages — canonical slug URLs
  const crystalPages: MetadataRoute.Sitemap = crystals.map((crystal) => ({
    url: `${baseUrl}/crystals/${crystal.slug || slugify(crystal.name)}`,
    lastModified: crystal.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Chakra filter pages for SEO
  const chakras = ['root', 'sacral', 'solar-plexus', 'heart', 'throat', 'third-eye', 'crown']
  const chakraPages: MetadataRoute.Sitemap = chakras.map((chakra) => ({
    url: `${baseUrl}/crystals?chakra=${chakra}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Colour filter pages for SEO
  const colours = ['red', 'pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'brown', 'black', 'white', 'clear']
  const colourPages: MetadataRoute.Sitemap = colours.map((colour) => ({
    url: `${baseUrl}/crystals?colour=${colour}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [...staticPages, ...crystalPages, ...blogPages, ...chakraPages, ...colourPages]
}
