import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Buscar post por slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query('SELECT * FROM blog_posts WHERE slug = $1', [params.id])
    
    if (!result.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

    const post = result.rows[0]
    
    // Incrementar views
    await query('UPDATE blog_posts SET views = views + 1 WHERE id = $1', [post.id])

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
    console.error('Erro ao buscar post:', error)
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
    const body = await request.json()
    const { title, slug, excerpt, content, cover_image, author, category, tags, published } = body

    const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [params.id])
    if (!existingPost.rows[0]) {
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

    return NextResponse.json({
      success: true,
      data: { slug: params.id, title, excerpt, content, cover_image, author, category, tags, published },
      message: 'Post atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar post:', error)
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
    const result = await query('DELETE FROM blog_posts WHERE slug = $1', [params.id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Post não encontrado' },
        { status: 404 }
      )
    }

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
