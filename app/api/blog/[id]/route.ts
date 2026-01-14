import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Buscar post por slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('=== API BLOG [ID] - GET ===')
    console.log('Slug buscado:', params.id)
    
    const result = await query('SELECT * FROM blog_posts WHERE slug = $1', [params.id])
    
    if (!result.rows[0]) {
      console.log('Post não encontrado para slug:', params.id)
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    const post = result.rows[0]
    
    // Incrementar views
    await query('UPDATE blog_posts SET views = views + 1 WHERE slug = $1', [params.id])

    console.log('Post encontrado e views incrementado:', post.title, 'views:', post.views + 1)

    return NextResponse.json({
      success: true,
      data: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.cover_image,
        author: post.author,
        category: post.category,
        tags: post.tags ? JSON.parse(post.tags) : [],
        published: post.published === 1,
        views: post.views + 1,
        created_at: post.created_at,
        updated_at: post.updated_at,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar post' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('=== API BLOG [ID] - PUT ===')
    console.log('Slug do post:', params.id)
    
    const body = await request.json()
    console.log('Body recebido para PUT:', body)
    
    const { title, slug, excerpt, content, cover_image, author, category, tags, published } = body

    // Verificar se post existe
    const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [params.id])
    if (!existingPost.rows[0]) {
      console.log('Post não encontrado para edição')
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE blog_posts 
      SET title = $1, slug = $2, excerpt = $3, content = $4, cover_image = $5, 
          author = $6, category = $7, tags = $8, published = $9, updated_at = $10
      WHERE slug = $11
    `, [
      title,
      slug,
      excerpt || '',
      content,
      cover_image || '',
      author,
      category || 'geral',
      JSON.stringify(tags || []),
      published ? 1 : 0,
      now,
      params.id
    ])

    console.log('Post atualizado com sucesso')

    return NextResponse.json({
      success: true,
      data: { slug: params.id, title, slug, excerpt, content, cover_image, author, category, tags, published },
      message: 'Post atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar post:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar post' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('=== API BLOG [ID] - DELETE ===')
    console.log('Slug do post para deletar:', params.id)
    
    const result = await query('DELETE FROM blog_posts WHERE slug = $1', [params.id])

    if (result.rowCount === 0) {
      console.log('Post não encontrado para deleção')
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    console.log('Post deletado com sucesso')

    return NextResponse.json({
      success: true,
      message: 'Post deletado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar post:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar post' },
      { status: 500 }
    )
  }
}
