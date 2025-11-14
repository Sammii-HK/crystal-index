import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'
import { generateBlogPost } from '../../../../lib/ai'

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await prisma().user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    })

    if (user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { crystalId, crystalName } = body

    if (!crystalId && !crystalName) {
      return NextResponse.json(
        { error: 'Crystal ID or name required' },
        { status: 400 }
      )
    }

    // Get crystal data
    const crystal = await prisma().crystal.findFirst({
      where: crystalId ? { id: crystalId } : { name: crystalName },
      include: {
        crystalInfo: true,
      },
    })

    if (!crystal) {
      return NextResponse.json(
        { error: 'Crystal not found' },
        { status: 404 }
      )
    }

    // Generate blog post using AI SDK (unified interface, easy to switch models)
    const content = await generateBlogPost(
      crystal.name,
      {
        chakra: crystal.chakra,
        colour: crystal.colour,
      }
      // Optional: override default model config
      // { provider: 'anthropic', model: 'claude-3-opus-20240229' }
    )

    // Generate slug from crystal name
    const slug = crystal.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Extract excerpt (first 200 characters)
    const excerpt = content.substring(0, 200).replace(/\n/g, ' ') + '...'

    // Create blog post draft
    const blogPost = await prisma().blogPost.create({
      data: {
        title: `${crystal.name}: Complete Guide to Meaning, Properties & Uses`,
        slug,
        content,
        excerpt,
        authorId: session.userId,
        tags: [...crystal.chakra, ...crystal.colour, crystal.name],
        seoTitle: `${crystal.name} Crystal: Meaning, Healing Properties & How to Use`,
        seoDescription: `Discover everything about ${crystal.name} crystal: meaning, healing properties, chakra associations, and how to use it in your spiritual practice.`,
        published: false, // Draft by default
      },
    })

    return NextResponse.json({ blogPost })
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}



