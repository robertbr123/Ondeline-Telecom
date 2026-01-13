import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

// PATCH - Atualizar status do lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, notes } = body

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status é obrigatório' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    db.prepare(`
      UPDATE leads 
      SET status = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `).run(status, notes || null, now, params.id)

    return NextResponse.json({
      success: true,
      data: { id: params.id, status },
      message: 'Status atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar lead:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar lead' },
      { status: 500 }
    )
  }
}
