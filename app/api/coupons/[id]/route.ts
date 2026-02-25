import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { invalidateCache } from '@/lib/cache'

// PUT - Atualizar cupom
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, description, discount_type, discount_value, max_uses, valid_from, valid_until, active } = body

    const existing = await query('SELECT id FROM coupons WHERE id = $1', [id])
    if (!existing.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Cupom não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE coupons
      SET code = $1, description = $2, discount_type = $3, discount_value = $4,
          max_uses = $5, valid_from = $6, valid_until = $7, active = $8, updated_at = $9
      WHERE id = $10
    `, [
      code.toUpperCase(),
      description,
      discount_type,
      discount_value,
      max_uses || 0,
      valid_from,
      valid_until,
      active ? 1 : 0,
      now,
      id
    ])

    await invalidateCache('coupons')

    return NextResponse.json({
      success: true,
      data: { id, code, description, discount_type, discount_value, max_uses, valid_from, valid_until, active },
      message: 'Cupom atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar cupom:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar cupom' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar cupom
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM coupons WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Cupom não encontrado' },
        { status: 404 }
      )
    }

    await invalidateCache('coupons')

    return NextResponse.json({
      success: true,
      message: 'Cupom deletado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar cupom:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar cupom' },
      { status: 500 }
    )
  }
}
