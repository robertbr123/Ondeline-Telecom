import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

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

    await query(`
      UPDATE leads 
      SET status = $1, notes = $2, updated_at = $3
      WHERE id = $4
    `, [status, notes || null, now, params.id])

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
