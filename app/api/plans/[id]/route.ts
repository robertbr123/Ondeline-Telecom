import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

// PUT - Atualizar plano
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, speed, price, description, features, highlighted, active } = body

    const existingPlan = db.prepare('SELECT id FROM plans WHERE id = ?').get(params.id)
    if (!existingPlan) {
      return NextResponse.json(
        { success: false, error: 'Plano não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    db.prepare(`
      UPDATE plans 
      SET name = ?, speed = ?, price = ?, description = ?, features = ?, 
          highlighted = ?, active = ?, updated_at = ?
      WHERE id = ?
    `).run(
      name,
      speed,
      price,
      description,
      JSON.stringify(features),
      highlighted ? 1 : 0,
      active ? 1 : 0,
      now,
      params.id
    )

    return NextResponse.json({
      success: true,
      data: { id: params.id, name, speed, price, description, features, highlighted, active },
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
  { params }: { params: { id: string } }
) {
  try {
    const result = db.prepare('DELETE FROM plans WHERE id = ?').run(params.id)

    if (result.changes === 0) {
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
