import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { name, logo, bgColor, order, active } = body
    const { id } = params

    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`)
      values.push(name)
      paramCount++
    }

    if (logo !== undefined) {
      updates.push(`logo = $${paramCount}`)
      values.push(logo)
      paramCount++
    }

    if (bgColor !== undefined) {
      updates.push(`bg_color = $${paramCount}`)
      values.push(bgColor)
      paramCount++
    }

    if (order !== undefined) {
      updates.push(`"order" = $${paramCount}`)
      values.push(order)
      paramCount++
    }

    if (active !== undefined) {
      updates.push(`active = $${paramCount}`)
      values.push(active)
      paramCount++
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nenhum campo para atualizar' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    updates.push(`updated_at = $${paramCount}`)
    values.push(now)
    paramCount++

    values.push(id)
    const sql = `UPDATE clients SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`

    const result = await query(sql, values)

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar cliente' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query('DELETE FROM clients WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Cliente excluído com sucesso',
    })
  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir cliente' },
      { status: 500 }
    )
  }
}
