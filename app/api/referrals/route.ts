import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { query } from '@/lib/db'
import { referralSchema } from '@/lib/validations'
import { z } from 'zod'
import nodemailer from 'nodemailer'

// GET - Listar indicações (admin)
export async function GET() {
  try {
    const result = await query('SELECT * FROM referrals ORDER BY created_at DESC')
    const referrals = result.rows

    return NextResponse.json({
      success: true,
      data: referrals,
    })
  } catch (error) {
    console.error('Erro ao buscar indicações:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar indicações' },
      { status: 500 }
    )
  }
}

// POST - Criar indicação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados
    const validatedData = referralSchema.parse(body)

    const id = nanoid()
    const referralCode = nanoid(8).toUpperCase()
    const now = new Date().toISOString()

    // Inserir no banco
    await query(`
      INSERT INTO referrals (
        id, referrer_name, referrer_email, referrer_phone,
        referred_name, referred_email, referred_phone,
        city, referral_code, status, reward_claimed,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', 0, $10, $11)
    `, [
      id,
      validatedData.referrer_name,
      validatedData.referrer_email,
      validatedData.referrer_phone,
      validatedData.referred_name,
      validatedData.referred_email,
      validatedData.referred_phone,
      validatedData.city,
      referralCode,
      now,
      now
    ])

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

      // Email para o indicador
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: validatedData.referrer_email,
        subject: 'Obrigado pela Indicação! - Ondeline',
        html: `
          <h2>Obrigado por indicar a Ondeline!</h2>
          <p>Olá ${validatedData.referrer_name},</p>
          <p>Recebemos sua indicação de <strong>${validatedData.referred_name}</strong>.</p>
          <p><strong>Seu código de indicação:</strong> ${referralCode}</p>
          <p>Quando a indicação for convertida em cliente, você receberá seu benefício!</p>
          <p>Continue indicando e ganhe mais vantagens.</p>
          <br>
          <p>Equipe Ondeline</p>
        `,
      })

      // Email para o admin
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `Nova Indicação - ${validatedData.referrer_name}`,
        html: `
          <h2>Nova Indicação Recebida</h2>
          <h3>Indicador:</h3>
          <p><strong>Nome:</strong> ${validatedData.referrer_name}</p>
          <p><strong>Email:</strong> ${validatedData.referrer_email}</p>
          <p><strong>Telefone:</strong> ${validatedData.referrer_phone}</p>
          
          <h3>Indicado:</h3>
          <p><strong>Nome:</strong> ${validatedData.referred_name}</p>
          <p><strong>Email:</strong> ${validatedData.referred_email}</p>
          <p><strong>Telefone:</strong> ${validatedData.referred_phone}</p>
          
          <p><strong>Cidade:</strong> ${validatedData.city}</p>
          <p><strong>Código:</strong> ${referralCode}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `,
      })
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
    }

    return NextResponse.json({
      success: true,
      data: { id, ...validatedData, referralCode },
      message: 'Indicação registrada com sucesso!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao criar indicação:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar indicação' },
      { status: 500 }
    )
  }
}
