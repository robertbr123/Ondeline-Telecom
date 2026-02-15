import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { invalidateCache } from '@/lib/cache'

// PUT - Atualizar página
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: paramSlug } = await params
    const body = await request.json()
    const { title, content, description, meta_title, meta_description, keywords, hero_title, hero_subtitle, hero_image, active } = body

    // Verificar se página existe
    const existingPage = await query('SELECT id FROM pages WHERE slug = $1', [paramSlug])
    if (!existingPage.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Página não encontrada' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE pages
      SET title = $1, content = $2, description = $3, meta_title = $4, meta_description = $5,
          keywords = $6, hero_title = $7, hero_subtitle = $8, hero_image = $9, active = $10, updated_at = $11
      WHERE slug = $12
    `, [
      title,
      content,
      description || '',
      meta_title || '',
      meta_description || '',
      keywords || [],
      hero_title || '',
      hero_subtitle || '',
      hero_image || '',
      active !== false,
      now,
      paramSlug
    ])

    // Invalidar cache
    await invalidateCache('pages:')

    return NextResponse.json({
      success: true,
      data: { slug: paramSlug, title },
      message: 'Página atualizada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar página:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar página' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar página
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const result = await query('DELETE FROM pages WHERE slug = $1', [slug])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Página não encontrada' },
        { status: 404 }
      )
    }

    // Invalidar cache
    await invalidateCache('pages:')

    return NextResponse.json({
      success: true,
      message: 'Página deletada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar página:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar página' },
      { status: 500 }
    )
  }
}