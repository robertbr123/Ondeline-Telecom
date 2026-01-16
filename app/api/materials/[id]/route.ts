import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar material
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, file_url, file_type, category, active } = body

    const existingMaterial = await query('SELECT id FROM materials WHERE id = $1', [id])
    if (!existingMaterial.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Material não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE materials 
      SET title = $1, description = $2, file_url = $3, file_type = $4, 
          category = $5, active = $6, updated_at = $7
      WHERE id = $8
    `, [
      title,
      description || '',
      file_url,
      file_type,
      category || 'documentos',
      active ? 1 : 0,
      now,
      id
    ])

    return NextResponse.json({
      success: true,
      data: { id, title, description, file_url, file_type, category, active },
      message: 'Material atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar material:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar material' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar material
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM materials WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Material não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Material deletado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar material:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar material' },
      { status: 500 }
    )
  }
}
