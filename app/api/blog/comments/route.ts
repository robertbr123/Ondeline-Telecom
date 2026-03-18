import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'
import { blogLogger } from '@/lib/logger'

// GET - Fetch comments for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const includeUnapproved = searchParams.get('all') === 'true'

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'postId is required' },
        { status: 400 }
      )
    }

    const result = await query(
      `SELECT * FROM blog_comments
       WHERE post_id = $1 ${!includeUnapproved ? 'AND approved = 1' : ''}
       ORDER BY created_at DESC`,
      [postId]
    )

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to fetch comments')
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, authorName, authorEmail, content } = body

    if (!postId || !authorName || !content) {
      return NextResponse.json(
        { success: false, error: 'postId, authorName, and content are required' },
        { status: 400 }
      )
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Comment too long (max 2000 characters)' },
        { status: 400 }
      )
    }

    const id = `comment-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(
      `INSERT INTO blog_comments (id, post_id, author_name, author_email, content, approved, created_at)
       VALUES ($1, $2, $3, $4, $5, 0, $6)`,
      [id, postId, authorName, authorEmail || '', content, now]
    )

    blogLogger.info({ commentId: id, postId }, 'New blog comment submitted')

    return NextResponse.json({
      success: true,
      data: { id },
      message: 'Comentário enviado! Será publicado após aprovação.',
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to create comment')
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

// PATCH - Approve/reject a comment (admin)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, approved } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id is required' },
        { status: 400 }
      )
    }

    await query(
      'UPDATE blog_comments SET approved = $1 WHERE id = $2',
      [approved ? 1 : 0, id]
    )

    return NextResponse.json({
      success: true,
      message: approved ? 'Comentário aprovado' : 'Comentário rejeitado',
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to update comment')
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a comment (admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id is required' },
        { status: 400 }
      )
    }

    await query('DELETE FROM blog_comments WHERE id = $1', [id])

    return NextResponse.json({
      success: true,
      message: 'Comentário excluído',
    })
  } catch (error) {
    blogLogger.error({ err: error }, 'Failed to delete comment')
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
