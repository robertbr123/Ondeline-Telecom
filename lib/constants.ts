export const CITIES = ['Ipixuna', 'Eirunepe', 'Itamarati', 'Carauari'] as const
export type City = typeof CITIES[number]

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  CONVERTED: 'converted',
  LOST: 'lost',
} as const

export type LeadStatus = typeof LEAD_STATUS[keyof typeof LEAD_STATUS]

export const FAQ_CATEGORIES = ['Geral', 'Planos', 'Suporte', 'Cobertura', 'Pagamento'] as const
export type FAQCategory = typeof FAQ_CATEGORIES[number]

export const BLOG_CATEGORIES = ['geral', 'tecnologia', 'dicas', 'novidades', 'promocoes'] as const
export type BlogCategory = typeof BLOG_CATEGORIES[number]

export const MATERIAL_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'zip'] as const
export type MaterialType = typeof MATERIAL_TYPES[number]

export const MATERIAL_CATEGORIES = ['documentos', 'manuais', 'contratos', 'formularios'] as const
export type MaterialCategory = typeof MATERIAL_CATEGORIES[number]

export const FEATURE_ICONS = ['Zap', 'Shield', 'Rocket', 'Award', 'Wifi', 'Clock', 'Phone', 'Users', 'Star', 'Heart'] as const
export type FeatureIcon = typeof FEATURE_ICONS[number]

export const PUBLIC_ROUTES = [
  '/admin/login',
  '/api/auth/login',
  '/api/leads',
  '/api/plans',
  '/api/faq',
  '/api/site/config',
  '/api/blog',
  '/api/coverage',
  '/api/features',
  '/api/referrals',
  '/api/clients',
] as const

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5592984607721'
export const SITE_NAME = 'Ondeline Telecom'
export const SITE_DESCRIPTION = 'Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.'
