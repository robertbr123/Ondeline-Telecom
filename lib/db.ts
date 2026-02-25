import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

// Connection string do PostgreSQL
const connectionString = process.env.DATABASE_URL

// Detectar se estamos em tempo de build (next build)
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.argv.includes('build') ||
                    process.env.npm_lifecycle_event === 'build'

// Verificar se DATABASE_URL está configurado
if (!connectionString && !isBuildTime) {
  console.warn('⚠️  DATABASE_URL não está configurado. O app não funcionará corretamente.')
  console.warn('Configure a variável DATABASE_URL no Dokploy antes do deploy.')
}

// Criar pool de conexões (apenas se DATABASE_URL existe e não estamos em build time)
let pool: Pool | null = null

if (connectionString && !isBuildTime) {
  // Verificar se deve usar SSL (apenas se explicitamente configurado)
  // Dokploy interno não usa SSL, então default é false
  const useSSL = process.env.DATABASE_SSL === 'true'
  
  const sslConfig = useSSL ? { rejectUnauthorized: false } : false
  
  console.log(`🔗 Database connection: SSL=${useSSL}`)
  
  pool = new Pool({
    connectionString,
    ssl: sslConfig,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })
} else if (isBuildTime) {
  console.log('🔨 Build time detected - skipping database connection')
}

// Inicializar tabelas
export async function initializeDatabase() {
  try {
    // Pular durante build time
    if (isBuildTime) {
      console.log('🔨 Build time - skipping database initialization')
      return
    }

    if (!pool) {
      console.warn('⚠️  Pulando inicialização do banco: pool não disponível (DATABASE_URL não configurada)')
      return
    }

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

    // Tabela de posts do blog
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        cover_image TEXT,
        video_url TEXT DEFAULT '',
        author TEXT NOT NULL,
        category TEXT DEFAULT 'geral',
        tags TEXT,
        published INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Migração: adicionar video_url se não existir (tabelas criadas antes desta versão)
    await pool.query(`
      ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT ''
    `)

    // Tabela de materiais (downloads)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS materials (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL,
        file_type TEXT NOT NULL,
        category TEXT DEFAULT 'documentos',
        downloads INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de features
    await pool.query(`
      CREATE TABLE IF NOT EXISTS features (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        "order" INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de sistema de indicação
    await pool.query(`
      CREATE TABLE IF NOT EXISTS referrals (
        id TEXT PRIMARY KEY,
        referrer_name TEXT NOT NULL,
        referrer_email TEXT NOT NULL,
        referrer_phone TEXT NOT NULL,
        referred_name TEXT NOT NULL,
        referred_email TEXT NOT NULL,
        referred_phone TEXT NOT NULL,
        city TEXT NOT NULL,
        referral_code TEXT NOT NULL UNIQUE,
        status TEXT DEFAULT 'pending',
        reward_claimed INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de clientes/empresas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT NOT NULL,
        bg_color TEXT DEFAULT 'bg-white',
        "order" INTEGER DEFAULT 0,
        active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de cupons/promoções
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        discount_type TEXT NOT NULL,
        discount_value REAL NOT NULL,
        max_uses INTEGER DEFAULT 0,
        current_uses INTEGER DEFAULT 0,
        valid_from TEXT NOT NULL,
        valid_until TEXT NOT NULL,
        active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Tabela de campanhas/landing pages
    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        hero_image TEXT,
        cta_text TEXT DEFAULT 'Contratar Agora',
        cta_whatsapp_message TEXT,
        coupon_code TEXT,
        default_city TEXT,
        features TEXT,
        active INTEGER DEFAULT 1,
        views INTEGER DEFAULT 0,
        leads_count INTEGER DEFAULT 0,
        starts_at TEXT,
        ends_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `)

    // Adicionar coluna coupon_code na tabela leads (se não existir)
    await pool.query(`
      ALTER TABLE leads ADD COLUMN IF NOT EXISTS coupon_code TEXT
    `).catch(() => {})

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

    // Inserir features padrão se não existirem
    const featuresCount = await pool.query('SELECT COUNT(*) as count FROM features')
    if (parseInt(featuresCount.rows[0].count) === 0) {
      const insertFeature = `
        INSERT INTO features (id, title, description, icon, color, "order", active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `

      const now = new Date().toISOString()
      
      await pool.query(insertFeature, [
        'feature-1',
        'Suporte 24/7',
        'Atendimento rápido e eficiente para resolver seus problemas em tempo real',
        'Zap',
        'from-yellow-500 to-yellow-600',
        1,
        1,
        now,
        now
      ])

      await pool.query(insertFeature, [
        'feature-2',
        'Internet Estável',
        'Conexão confiável que você pode depender para seu negócio todos os dias',
        'Shield',
        'from-blue-500 to-blue-600',
        2,
        1,
        now,
        now
      ])

      await pool.query(insertFeature, [
        'feature-3',
        'Conexão Rápida',
        'Velocidade de fibra óptica para downloads e uploads instantâneos',
        'Rocket',
        'from-cyan-500 to-cyan-600',
        3,
        1,
        now,
        now
      ])

      await pool.query(insertFeature, [
        'feature-4',
        'Melhor Custo',
        'Melhor custo-benefício da região com planos flexíveis',
        'Award',
        'from-emerald-500 to-emerald-600',
        4,
        1,
        now,
        now
      ])
    }

    // Inserir clientes padrão se não existirem
    const clientsCount = await pool.query('SELECT COUNT(*) as count FROM clients')
    if (parseInt(clientsCount.rows[0].count) === 0) {
      const insertClient = `
        INSERT INTO clients (id, name, logo, bg_color, "order", active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `

      const now = new Date().toISOString()
      
      await pool.query(insertClient, [
        'client-1',
        'Bradesco',
        'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/412265266_744572124373375_4671948206819075660_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=F6tNzh_K9twQ7kNvwGPJzRT&_nc_oc=Adk4SH-mG7wwdTAAvZOb_Xv9DOHC-xa-hpYPU5jlvHIqh2qwqJx2bLvzr5-JfqPk3vg&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=63w5xFAPmuLfb6Wmj84BvA&oh=00_Afp_AVicUuH6_aPk4qEy8ihXOdZ0N7ipdtp01Kx4FxFcKQ&oe=69704723',
        'bg-white',
        1,
        1,
        now,
        now
      ])

      await pool.query(insertClient, [
        'client-2',
        'Correios',
        'https://static.ndmais.com.br/2014/05/06-05-2014-21-21-40-nova-marca.jpg',
        'bg-white',
        2,
        1,
        now,
        now
      ])

      await pool.query(insertClient, [
        'client-3',
        'CETAM',
        'https://www.cetam.am.gov.br/wp-content/uploads/2023/03/Logo-CETAM.png',
        'bg-white',
        3,
        1,
        now,
        now
      ])

      await pool.query(insertClient, [
        'client-4',
        'Prefeitura de Ipixuna',
        'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/472245549_1026396992867064_8301775409847835316_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=K1SxIXuAcYYQ7kNvwFB7xgg&_nc_oc=AdkpPKszVi8UCFo9eC37aucUeBpThQNwNw_F0HXrnWI2tolZyH7HCpVuiCKeIxvEsFA&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=nrkEz9s4TDgnYnuSPqIw8A&oh=00_AfokYRLkUk7y8QSBS0OjYzIznyJwDwuXL-V2pzn-NetJAw&oe=697066DF',
        'bg-white',
        4,
        1,
        now,
        now
      ])

      await pool.query(insertClient, [
        'client-5',
        'Prefeitura de Eirunepé',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Bandeira_de_Eirunep%C3%A9.png/120px-Bandeira_de_Eirunep%C3%A9.png',
        'bg-white',
        5,
        1,
        now,
        now
      ])

      await pool.query(insertClient, [
        'client-6',
        'Caixa Econômica',
        'https://images.seeklogo.com/logo-png/2/1/caixa-economica-federal-logo-png_seeklogo-24768.png',
        'bg-white',
        6,
        1,
        now,
        now
      ])
    }

    // Criar ou atualizar usuário admin
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    // Aceita senha em texto puro (ADMIN_PASSWORD) ou hash pronto (ADMIN_PASSWORD_HASH)
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const adminPasswordHash = bcrypt.hashSync(adminPassword, 10)
    const now = new Date().toISOString()

    const adminExists = await pool.query('SELECT username, password_hash FROM admin_users WHERE username = $1', [adminUsername])
    if (adminExists.rows.length === 0) {
      console.log(`🔐 Creating admin user: ${adminUsername}`)
      await pool.query(`
        INSERT INTO admin_users (username, password_hash, role, created_at)
        VALUES ($1, $2, 'admin', $3)
      `, [adminUsername, adminPasswordHash, now])
    } else if (process.env.ADMIN_PASSWORD) {
      // Sempre atualizar a senha se ADMIN_PASSWORD estiver definida
      await pool.query('UPDATE admin_users SET password_hash = $1 WHERE username = $2', [adminPasswordHash, adminUsername])
      console.log(`🔐 Admin password updated for user: ${adminUsername}`)
    }

    console.log('✅ Database initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  }
}

// Controle de inicialização lazy - só roda uma vez na primeira query
let dbInitialized = false
let dbInitPromise: Promise<void> | null = null

async function ensureInitialized() {
  if (dbInitialized || isBuildTime) return
  if (!dbInitPromise) {
    dbInitPromise = initializeDatabase()
      .then(() => { dbInitialized = true })
      .catch((err) => {
        dbInitPromise = null // permite tentar novamente em caso de erro
        console.error('❌ Error initializing database:', err)
      })
  }
  await dbInitPromise
}

// Helper para queries - inicializa o banco na primeira chamada
export async function query(text: string, params?: any[]) {
  // Durante build time, retornar resultado vazio silenciosamente
  if (isBuildTime || !pool) {
    return { rows: [], rowCount: 0 }
  }

  await ensureInitialized()

  const res = await pool.query(text, params)
  return res
}

export default pool
