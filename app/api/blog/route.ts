import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'
import { getCachedData, invalidateCache, DEFAULT_TTL } from '@/lib/cache'
import { blogLogger } from '@/lib/logger'

// GET - Buscar todos os posts (apenas publicados)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('unpublished') === 'true'

    const posts = await getCachedData(
      'blog:posts',
      async () => {
        const result = await query(`
          SELECT * FROM blog_posts
          ${!includeUnpublished ? 'WHERE published = 1' : ''}
          ORDER BY created_at DESC
        `)

        blogLogger.debug({ count: result.rows.length }, 'Fetched blog posts')

        return result.rows.map((p: any) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          content: p.content,
          cover_image: p.cover_image,
          video_url: p.video_url || '',
          author: p.author,
          category: p.category,
          tags: p.tags ? JSON.parse(p.tags) : [],
          published: p.published === 1,
          views: p.views,
          created_at: p.created_at,
          updated_at: p.updated_at,
        }))
      },
      includeUnpublished ? DEFAULT_TTL.SHORT : DEFAULT_TTL.LONG,
      { includeUnpublished }
    )

    return NextResponse.json({
      success: true,
      data: posts,
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to fetch posts')
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, cover_image, video_url, author, category, tags, published } = body

    if (!title || !content || !author) {
      blogLogger.warn({ title: !!title, content: !!content, author: !!author }, 'Missing required fields for blog post')
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: title, content, author' },
        { status: 400 }
      )
    }

    // Gerar slug automaticamente se não fornecido
    const postSlug = slug || title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50)

    const id = `blog-${nanoid(8)}`
    const now = new Date().toISOString()

    // Usar o valor de published do body (se não fornecido, assume 0 para novos posts)
    const publishedValue = published ? 1 : 0

    blogLogger.info({ id, title, slug: postSlug, published: publishedValue }, 'Creating blog post')

    await query(`
      INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, video_url, author, category, tags, published, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `, [
      id,
      title,
      postSlug,
      excerpt || '',
      content,
      cover_image || '',
      video_url || '',
      author,
      category || 'geral',
      JSON.stringify(tags || []),
      publishedValue,
      now,
      now
    ])

    blogLogger.info({ id, slug: postSlug }, 'Blog post created successfully')

    // Invalidar cache do blog
    await invalidateCache('blog:')

    return NextResponse.json({
      success: true,
      data: { id, title, slug: postSlug, excerpt, content, cover_image, video_url, author, category, tags, published: publishedValue === 1 },
      message: 'Post criado com sucesso',
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to create blog post')
    return NextResponse.json(
      { success: false, error: 'Erro ao criar post: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
