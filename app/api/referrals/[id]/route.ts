import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar status de indicação (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    const { status, reward_claimed } = body

    const now = new Date().toISOString()

    await query(`
      UPDATE referrals 
      SET status = $1, reward_claimed = $2, updated_at = $3
      WHERE id = $4
    `, [status, reward_claimed ? 1 : 0, now, id])

    return NextResponse.json({
      success: true,
      message: 'Indicação atualizada com sucesso!',
    })
  } catch (error) {
    console.error('Erro ao atualizar indicação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar indicação' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar indicação (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await query('DELETE FROM referrals WHERE id = $1', [id])

    return NextResponse.json({
      success: true,
      message: 'Indicação deletada com sucesso!',
    })
  } catch (error) {
    console.error('Erro ao deletar indicação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar indicação' },
      { status: 500 }
    )
  }
}
