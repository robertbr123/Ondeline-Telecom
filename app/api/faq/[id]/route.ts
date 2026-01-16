import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar FAQ
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { question, answer, category, order, active } = body

    const existingFaq = await query('SELECT id FROM faq WHERE id = $1', [id])
    if (!existingFaq.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'FAQ não encontrada' },
        { status: 404 }
      )
    }

    await query(`
      UPDATE faq 
      SET question = $1, answer = $2, category = $3, "order" = $4, active = $5
      WHERE id = $6
    `, [
      question,
      answer,
      category,
      order || 1,
      active ? 1 : 0,
      id
    ])

    return NextResponse.json({
      success: true,
      data: { id, question, answer, category, order, active },
      message: 'FAQ atualizada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar FAQ' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar FAQ
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM faq WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ deletada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar FAQ' },
      { status: 500 }
    )
  }
}
