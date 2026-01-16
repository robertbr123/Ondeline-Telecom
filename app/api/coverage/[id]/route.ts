import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar área de cobertura
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { city, state, status, latitude, longitude, description, launchDate } = body

    const existingArea = await query('SELECT id FROM coverage_areas WHERE id = $1', [id])
    if (!existingArea.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Área de cobertura não encontrada' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE coverage_areas 
      SET city = $1, state = $2, status = $3, latitude = $4, longitude = $5, 
          description = $6, launch_date = $7, updated_at = $8
      WHERE id = $9
    `, [
      city,
      state,
      status,
      latitude || 0,
      longitude || 0,
      description || '',
      launchDate || null,
      now,
      id
    ])

    return NextResponse.json({
      success: true,
      data: { id, city, state, status, latitude, longitude, description, launchDate },
      message: 'Área de cobertura atualizada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar área de cobertura:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar área de cobertura' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar área de cobertura
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM coverage_areas WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Área de cobertura não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Área de cobertura deletada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar área de cobertura:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar área de cobertura' },
      { status: 500 }
    )
  }
}
