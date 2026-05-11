import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PATCH - Atualizar status do lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, notes, last_contact_at, installation_date, source, plan_interest } = body

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status é obrigatório' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE leads 
      SET status = $1,
          notes = COALESCE($2, notes),
          last_contact_at = COALESCE($3, last_contact_at),
          installation_date = COALESCE($4, installation_date),
          source = COALESCE($5, source),
          plan_interest = COALESCE($6, plan_interest),
          updated_at = $7
      WHERE id = $8
    `, [
      status,
      notes ?? null,
      last_contact_at ?? null,
      installation_date ?? null,
      source ?? null,
      plan_interest ?? null,
      now,
      id,
    ])

    return NextResponse.json({
      success: true,
      data: { id, status, notes, last_contact_at, installation_date },
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
