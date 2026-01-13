import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

// Connection string do PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://ondel:Ipx102030@ondeline-ondeline-f0zpnd:5432/site'

// Criar pool de conexões
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Inicializar tabelas
export async function initializeDatabase() {
  try {
    // Tabela de configurações do site
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `)

    // Tabela de planos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        speed TEXT NOT NULL,
        price TEXT NOT NULL,
        description TEXT NOT NULL,
        features TEXT NOT NULL,
        highlighted INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de FAQ
    await pool.query(`
      CREATE TABLE IF NOT EXISTS faq (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL,
        "order" INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1
      )
    `)

    // Tabela de leads
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        plan_interest TEXT,
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de usuários admin
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        username TEXT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at TEXT NOT NULL,
        last_login TEXT
      )
    `)

    // Inserir configurações padrão se não existirem
    const defaultConfig = await pool.query('SELECT COUNT(*) as count FROM site_config')
    if (parseInt(defaultConfig.rows[0].count) === 0) {
      const insert = 'INSERT INTO site_config (key, value) VALUES ($1, $2)'
      await pool.query(insert, ['title', 'Ondeline - Internet Rápida no Amazonas'])
      await pool.query(insert, ['description', 'Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.'])
      await pool.query(insert, ['contactPhone', '(92) 98460-7721'])
      await pool.query(insert, ['contactEmail', 'contato@ondeline.com.br'])
      await pool.query(insert, ['whatsappNumber', '5592984607721'])
      await pool.query(insert, ['address', 'Amazonas, Brasil'])
      await pool.query(insert, ['facebook', ''])
      await pool.query(insert, ['instagram', ''])
      await pool.query(insert, ['twitter', ''])
      await pool.query(insert, ['linkedin', ''])
      await pool.query(insert, ['keywords', JSON.stringify(['internet', 'wifi', 'amazonas', 'ipixuna', 'eirunepe', 'itamarati', 'carauari', 'provedor', 'fibra óptica'])])
    }

    // Inserir planos padrão se não existirem
    const plansCount = await pool.query('SELECT COUNT(*) as count FROM plans')
    if (parseInt(plansCount.rows[0].count) === 0) {
      const insertPlan = `
        INSERT INTO plans (id, name, speed, price, description, features, highlighted, active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `

      const now = new Date().toISOString()
      
      await pool.query(insertPlan, [
        'plan-1',
        'Inicial',
        '20 MB',
        'R$ 100',
        'Perfeito para uso residencial básico',
        JSON.stringify(['20 MB de velocidade', 'Wi-Fi grátis', 'Suporte 24/7', 'Roteador incluído']),
        0,
        1,
        now,
        now
      ])

      await pool.query(insertPlan, [
        'plan-2',
        'Profissional',
        '50 MB',
        'R$ 130',
        'Ideal para trabalho e múltiplos dispositivos',
        JSON.stringify(['50 MB de velocidade', 'Wi-Fi de longo alcance', 'Suporte prioritário', 'Roteador mesh', 'IP fixo opcional']),
        1,
        1,
        now,
        now
      ])

      await pool.query(insertPlan, [
        'plan-3',
        'Premium',
        '80 MB',
        'R$ 150',
        'Máximo desempenho para sua casa ou escritório',
        JSON.stringify(['80 MB de velocidade', 'Wi-Fi 6 Mesh', 'Suporte VIP', 'IP fixo incluído', 'Garantia expandida', 'Backup de internet']),
        0,
        1,
        now,
        now
      ])

      await pool.query(insertPlan, [
        'plan-4',
        'Empresarial',
        'Customizado',
        'Sob Orçamento',
        'Soluções personalizadas para sua empresa',
        JSON.stringify(['Velocidade sob medida', 'SLA garantido', 'Técnico dedicado', 'Conexão redundante', 'Monitoramento 24/7']),
        0,
        1,
        now,
        now
      ])
    }

    // Inserir FAQ padrão se não existirem
    const faqCount = await pool.query('SELECT COUNT(*) as count FROM faq')
    if (parseInt(faqCount.rows[0].count) === 0) {
      const insertFAQ = `
        INSERT INTO faq (id, question, answer, category, "order", active)
        VALUES ($1, $2, $3, $4, $5, $6)
      `

      await pool.query(insertFAQ, [
        'faq-1',
        'Como funciona a instalação?',
        'Nossa equipe técnica agendará uma visita para instalar o equipamento e configurar sua conexão. O processo leva cerca de 2 horas.',
        'Geral',
        1,
        1
      ])

      await pool.query(insertFAQ, [
        'faq-2',
        'Qual é o prazo de instalação?',
        'Após a contratação, instalamos em até 3 dias úteis, dependendo da disponibilidade técnica na sua região.',
        'Geral',
        2,
        1
      ])

      await pool.query(insertFAQ, [
        'faq-3',
        'O que acontece se cair a internet?',
        'Oferecemos suporte 24/7. Basta entrar em contato pelo WhatsApp ou telefone e nossa equipe resolverá o problema o mais rápido possível.',
        'Suporte',
        3,
        1
      ])

      await pool.query(insertFAQ, [
        'faq-4',
        'Posso mudar de plano depois?',
        'Sim! Você pode solicitar mudança de plano a qualquer momento sem custos adicionais.',
        'Planos',
        4,
        1
      ])

      await pool.query(insertFAQ, [
        'faq-5',
        'Em quais cidades vocês operam?',
        'Atualmente operamos em Ipixuna e Eirunepe. Em breve estaremos em Itamarati e Carauari.',
        'Cobertura',
        5,
        1
      ])
    }

    // Criar usuário admin padrão se não existir
    const adminCount = await pool.query('SELECT COUNT(*) as count FROM admin_users')
    if (parseInt(adminCount.rows[0].count) === 0) {
      const defaultHash = bcrypt.hashSync('admin123', 10)
      const now = new Date().toISOString()
      
      await pool.query(`
        INSERT INTO admin_users (username, password_hash, role, created_at)
        VALUES ($1, $2, 'admin', $3)
      `, ['admin', defaultHash, now])
    }

    console.log('✅ Database initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  }
}

// Inicializar o banco de dados
initializeDatabase().catch(console.error)

// Helper para queries
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Query error:', error)
    throw error
  }
}

export default pool
