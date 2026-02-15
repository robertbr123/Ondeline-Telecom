import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

// GET - Buscar todos os posts (apenas publicados)
export async function GET(request: NextRequest) {
  try {
    console.log('=== API BLOG - GET ===')
    
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('unpublished') === 'true'

    console.log('includeUnpublished:', includeUnpublished)

    const result = await query(`
      SELECT * FROM blog_posts 
      ${!includeUnpublished ? 'WHERE published = 1' : ''}
      ORDER BY created_at DESC
    `)

    console.log(`Encontrados ${result.rows.length} posts`)

    const posts = result.rows.map(p => ({
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

    return NextResponse.json({
      success: true,
      data: posts,
    })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
  try {
    console.log('=== API BLOG - POST ===')
    
    const body = await request.json()
    console.log('Body recebido:', body)
    
    const { title, slug, excerpt, content, cover_image, video_url, author, category, tags } = body

    console.log('Campos:', { title, slug, excerpt, content: cover_image, author, category, tags })

    if (!title || !content || !author) {
      console.error('Campos obrigatórios faltando:', { title: !!title, content: !!content, author: !!author })
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

    console.log('Slug gerado:', postSlug)

    const id = `blog-${nanoid(8)}`
    const now = new Date().toISOString()

    console.log('Inserindo no banco:', {
      id,
      title,
      slug: postSlug,
      excerpt: excerpt || '',
      content,
      cover_image: cover_image || '',
      author,
      category: category || 'geral',
      tags: tags || [],
    })

    // Verificar se a tabela existe
    const checkTable = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'blog_posts'
      )
    `)
    console.log('Tabela blog_posts existe:', checkTable.rows[0])

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
      0,
      now,
      now
    ])

    console.log('Post inserido com sucesso')

    return NextResponse.json({
      success: true,
      data: { id, title, slug: postSlug, excerpt, content, cover_image, video_url, author, category, tags },
      message: 'Post criado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar post:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar post: ' + error.message },
      { status: 500 }
    )
  }
}
