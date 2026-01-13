import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = path.join(process.cwd(), 'data')

// Criar diretório de dados se não existir
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'db.sqlite')
const db = new Database(dbPath)

// Habilitar foreign keys
db.pragma('foreign_keys = ON')

// Inicializar tabelas
export function initializeDatabase() {
  // Tabela de configurações do site
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `)

  // Tabela de planos
  db.exec(`
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
  db.exec(`
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
  db.exec(`
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
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      username TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TEXT NOT NULL,
      last_login TEXT
    )
  `)

  // Inserir configurações padrão se não existirem
  const defaultConfig = db.prepare('SELECT COUNT(*) as count FROM site_config').get() as { count: number }
  if (defaultConfig.count === 0) {
    const insert = db.prepare('INSERT INTO site_config (key, value) VALUES (?, ?)')
    insert.run('title', 'Ondeline - Internet Rápida no Amazonas')
    insert.run('description', 'Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.')
    insert.run('contactPhone', '(92) 98460-7721')
    insert.run('contactEmail', 'contato@ondeline.com.br')
    insert.run('whatsappNumber', '5592984607721')
    insert.run('address', 'Amazonas, Brasil')
    insert.run('facebook', '')
    insert.run('instagram', '')
    insert.run('twitter', '')
    insert.run('linkedin', '')
    insert.run('keywords', JSON.stringify(['internet', 'wifi', 'amazonas', 'ipixuna', 'eirunepe', 'itamarati', 'carauari', 'provedor', 'fibra óptica']))
  }

  // Inserir planos padrão se não existirem
  const plansCount = db.prepare('SELECT COUNT(*) as count FROM plans').get() as { count: number }
  if (plansCount.count === 0) {
    const insertPlan = db.prepare(`
      INSERT INTO plans (id, name, speed, price, description, features, highlighted, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const now = new Date().toISOString()
    
    insertPlan.run(
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
    )

    insertPlan.run(
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
    )

    insertPlan.run(
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
    )

    insertPlan.run(
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
    )
  }

  // Inserir FAQ padrão se não existirem
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faq').get() as { count: number }
  if (faqCount.count === 0) {
    const insertFAQ = db.prepare(`
      INSERT INTO faq (id, question, answer, category, "order", active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    insertFAQ.run(
      'faq-1',
      'Como funciona a instalação?',
      'Nossa equipe técnica agendará uma visita para instalar o equipamento e configurar sua conexão. O processo leva cerca de 2 horas.',
      'Geral',
      1,
      1
    )

    insertFAQ.run(
      'faq-2',
      'Qual é o prazo de instalação?',
      'Após a contratação, instalamos em até 3 dias úteis, dependendo da disponibilidade técnica na sua região.',
      'Geral',
      2,
      1
    )

    insertFAQ.run(
      'faq-3',
      'O que acontece se cair a internet?',
      'Oferecemos suporte 24/7. Basta entrar em contato pelo WhatsApp ou telefone e nossa equipe resolverá o problema o mais rápido possível.',
      'Suporte',
      3,
      1
    )

    insertFAQ.run(
      'faq-4',
      'Posso mudar de plano depois?',
      'Sim! Você pode solicitar mudança de plano a qualquer momento sem custos adicionais.',
      'Planos',
      4,
      1
    )

    insertFAQ.run(
      'faq-5',
      'Em quais cidades vocês operam?',
      'Atualmente operamos em Ipixuna e Eirunepe. Em breve estaremos em Itamarati e Carauari.',
      'Cobertura',
      5,
      1
    )
  }

  // Criar usuário admin padrão se não existir
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number }
  if (adminCount.count === 0) {
    const bcrypt = require('bcryptjs')
    const defaultHash = bcrypt.hashSync('admin123', 10)
    const now = new Date().toISOString()
    
    db.prepare(`
      INSERT INTO admin_users (username, password_hash, role, created_at)
      VALUES (?, ?, 'admin', ?)
    `).run('admin', defaultHash, now)
  }
}

// Inicializar o banco de dados
initializeDatabase()

export default db
