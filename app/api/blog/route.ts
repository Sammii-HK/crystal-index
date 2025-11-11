import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const published = searchParams.get('published')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const blogPosts = await prisma().blogPost.findMany({
      where: published === 'true' ? { published: true } : undefined,
      orderBy: { publishedAt: 'desc' },
      take: limit,
      skip: offset,
    })

    return NextResponse.json({ blogPosts })
  } catch (error) {
    console.error('Blog fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}



