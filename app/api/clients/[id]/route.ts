import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUT - Atualizar cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, logo, website, active, order } = body

    const existingClient = await query('SELECT id FROM clients WHERE id = $1', [id])
    if (!existingClient.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE clients 
      SET name = $1, logo = $2, website = $3, active = $4, display_order = $5, updated_at = $6
      WHERE id = $7
    `, [
      name,
      logo,
      website || '',
      active ? 1 : 0,
      order || 1,
      now,
      id
    ])

    return NextResponse.json({
      success: true,
      data: { id, name, logo, website, active, order },
      message: 'Cliente atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar cliente' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM clients WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Cliente deletado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar cliente' },
      { status: 500 }
    )
  }
}
