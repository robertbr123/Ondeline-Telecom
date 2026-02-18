import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { invalidateCache } from '@/lib/cache'
import { featureSchema } from '@/lib/validations'
import { z } from 'zod'

// PUT - Atualizar feature
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params

    // Validar dados
    const validatedData = featureSchema.parse(body)

    const now = new Date().toISOString()

    // Atualizar no banco
    await query(`
      UPDATE features
      SET title = $1, description = $2, icon = $3, color = $4, "order" = $5, active = $6, updated_at = $7
      WHERE id = $8
    `, [
      validatedData.title,
      validatedData.description,
      validatedData.icon,
      validatedData.color,
      validatedData.order,
      validatedData.active ? 1 : 0,
      now,
      id
    ])

    await invalidateCache('features')

    return NextResponse.json({
      success: true,
      message: 'Feature atualizada com sucesso!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar feature:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar feature' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar feature
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await query('DELETE FROM features WHERE id = $1', [id])

    await invalidateCache('features')

    return NextResponse.json({
      success: true,
      message: 'Feature deletada com sucesso!',
    })
  } catch (error) {
    console.error('Erro ao deletar feature:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar feature' },
      { status: 500 }
    )
  }
}
