import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    // Generate blog post using OpenAI
    const prompt = `Write a comprehensive, SEO-optimized blog post about ${crystal.name} crystal. Include:
- Introduction to the crystal
- Physical properties and appearance
- Healing properties and metaphysical meanings
- Chakra associations: ${crystal.chakra.join(', ')}
- Color properties: ${crystal.colour.join(', ')}
- How to use and care for this crystal
- Common uses and rituals
- Conclusion

Make it engaging, informative, and approximately 1000-1500 words. Use proper headings and formatting.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable crystal expert writing engaging, SEO-optimized blog content.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''

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



