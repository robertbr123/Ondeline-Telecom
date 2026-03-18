import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { query } from '@/lib/db'
import { leadSchema } from '@/lib/validations'
import { leadLogger, emailLogger } from '@/lib/logger'
import { calculateLeadScore } from '@/lib/lead-scoring'

// GET - Listar leads (admin)
export async function GET(request: NextRequest) {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC')
    const leads = result.rows as any[]

    return NextResponse.json({
      success: true,
      data: leads,
    })
  } catch (error) {
    leadLogger.error({ err: error }, 'Failed to fetch leads')
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar leads' },
      { status: 500 }
    )
  }
}

// POST - Criar lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados
    const validatedData = leadSchema.parse(body)
    const couponCode = body.coupon_code || null

    const id = nanoid()
    const now = new Date().toISOString()

    // Calculate lead score
    const score = calculateLeadScore({
      city: validatedData.city,
      plan_interest: body.plan_interest || null,
      coupon_code: couponCode,
      email: validatedData.email,
      phone: validatedData.phone,
    })

    // Inserir no banco
    await query(`
      INSERT INTO leads (id, name, email, phone, city, status, coupon_code, score, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'new', $6, $7, $8, $9)
    `, [id, validatedData.name, validatedData.email, validatedData.phone, validatedData.city, couponCode, score, now, now])

    // Incrementar uso do cupom se fornecido
    if (couponCode) {
      await query(
        'UPDATE coupons SET current_uses = current_uses + 1 WHERE code = $1 AND active = 1',
        [couponCode.toUpperCase()]
      ).catch(() => {})
    }

    // Enviar email de notificação
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `Novo Lead - ${validatedData.name}`,
        html: `
          <h2>Novo Pré-cadastro Recebido</h2>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Telefone:</strong> ${validatedData.phone}</p>
          <p><strong>Cidade:</strong> ${validatedData.city}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `,
      })
    } catch (emailError) {
      emailLogger.error({ err: emailError }, 'Failed to send lead notification email')
      // Não falhar se o email não for enviado
    }

    return NextResponse.json({
      success: true,
      data: { id, ...validatedData },
      message: 'Pré-cadastro realizado com sucesso!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    leadLogger.error({ err: error }, 'Failed to create lead')
    return NextResponse.json(
      { success: false, error: 'Erro ao criar lead' },
      { status: 500 }
    )
  }
}
