import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar plano
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, speed, price, description, features, highlighted, active } = body

    const existingPlan = await query('SELECT id FROM plans WHERE id = $1', [id])
    if (!existingPlan.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Plano não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE plans 
      SET name = $1, speed = $2, price = $3, description = $4, features = $5, 
          highlighted = $6, active = $7, updated_at = $8
      WHERE id = $9
    `, [
      name,
      speed,
      price,
      description,
      JSON.stringify(features),
      highlighted ? 1 : 0,
      active ? 1 : 0,
      now,
      id
    ])

    return NextResponse.json({
      success: true,
      data: { id, name, speed, price, description, features, highlighted, active },
      message: 'Plano atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar plano:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar plano' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar plano
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM plans WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plano não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Plano deletado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar plano:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar plano' },
      { status: 500 }
    )
  }
}
