import { MetadataRoute } from 'next'
import { prisma } from '../lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crystalindex.co.uk'

  // Get all published blog posts
  const blogPosts = await prisma().blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  // Get all crystals
  const crystals = await prisma().crystal.findMany({
    select: { id: true, updatedAt: true },
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

  // Crystal pages
  const crystalPages: MetadataRoute.Sitemap = crystals.map((crystal) => ({
    url: `${baseUrl}/crystals/${crystal.id}`,
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

  return [...staticPages, ...crystalPages, ...blogPages]
}



