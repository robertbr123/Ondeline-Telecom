import { z } from 'zod'
import { CITIES, FAQ_CATEGORIES, BLOG_CATEGORIES, MATERIAL_CATEGORIES, FEATURE_ICONS } from './constants'

// Lead/Pré-cadastro
export const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido').regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Formato: (92) 98460-7721'),
  city: z.enum(CITIES, { errorMap: () => ({ message: 'Cidade inválida' }) }),
  plan_interest: z.string().optional(),
  notes: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

// Planos
export const planSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  speed: z.string().min(1, 'Velocidade é obrigatória'),
  price: z.string().min(1, 'Preço é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  features: z.array(z.string()).min(1, 'Adicione pelo menos 1 feature'),
  highlighted: z.boolean().default(false),
  active: z.boolean().default(true),
})

export type PlanInput = z.infer<typeof planSchema>

// FAQ
export const faqSchema = z.object({
  question: z.string().min(5, 'Pergunta deve ter pelo menos 5 caracteres'),
  answer: z.string().min(10, 'Resposta deve ter pelo menos 10 caracteres'),
  category: z.enum(FAQ_CATEGORIES, { errorMap: () => ({ message: 'Categoria inválida' }) }),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type FAQInput = z.infer<typeof faqSchema>

// Blog
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  slug: z.string().min(3, 'Slug é obrigatório').regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().min(20, 'Resumo deve ter pelo menos 20 caracteres').optional(),
  content: z.string().min(50, 'Conteúdo deve ter pelo menos 50 caracteres'),
  cover_image: z.string().url('URL da imagem inválida').optional(),
  author: z.string().min(2, 'Nome do autor é obrigatório'),
  category: z.enum(BLOG_CATEGORIES, { errorMap: () => ({ message: 'Categoria inválida' }) }),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
})

export type BlogPostInput = z.infer<typeof blogPostSchema>

// Features
export const featureSchema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  icon: z.enum(FEATURE_ICONS, { errorMap: () => ({ message: 'Ícone inválido' }) }),
  color: z.string().regex(/^from-\w+-\d+ to-\w+-\d+$/, 'Cor inválida (use formato: from-color-500 to-color-600)'),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type FeatureInput = z.infer<typeof featureSchema>

// Materiais/Downloads
export const materialSchema = z.object({
  title: z.string().min(3, 'Título é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres').optional(),
  file_url: z.string().url('URL do arquivo inválida'),
  file_type: z.string().min(2, 'Tipo do arquivo é obrigatório'),
  category: z.enum(MATERIAL_CATEGORIES, { errorMap: () => ({ message: 'Categoria inválida' }) }),
  active: z.boolean().default(true),
})

export type MaterialInput = z.infer<typeof materialSchema>

// Cobertura
export const coverageSchema = z.object({
  city: z.enum(CITIES, { errorMap: () => ({ message: 'Cidade inválida' }) }),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  status: z.enum(['available', 'coming_soon', 'unavailable'], { errorMap: () => ({ message: 'Status inválido' }) }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  active: z.boolean().default(true),
})

export type CoverageInput = z.infer<typeof coverageSchema>

// Sistema de Indicação
export const referralSchema = z.object({
  referrer_name: z.string().min(2, 'Nome é obrigatório'),
  referrer_email: z.string().email('Email inválido'),
  referrer_phone: z.string().min(14, 'Telefone inválido').regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Formato: (92) 98460-7721'),
  referred_name: z.string().min(2, 'Nome do indicado é obrigatório'),
  referred_email: z.string().email('Email do indicado inválido'),
  referred_phone: z.string().min(14, 'Telefone do indicado inválido').regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Formato: (92) 98460-7721'),
  city: z.enum(CITIES, { errorMap: () => ({ message: 'Cidade inválida' }) }),
})

export type ReferralInput = z.infer<typeof referralSchema>

// Site Config
export const siteConfigSchema = z.object({
  title: z.string().min(5, 'Título é obrigatório'),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  contactPhone: z.string().min(10, 'Telefone de contato inválido'),
  contactEmail: z.string().email('Email de contato inválido'),
  whatsappNumber: z.string().min(10, 'Número do WhatsApp inválido'),
  address: z.string().min(10, 'Endereço é obrigatório'),
  facebook: z.string().url('URL do Facebook inválida').optional().or(z.literal('')),
  instagram: z.string().url('URL do Instagram inválida').optional().or(z.literal('')),
  twitter: z.string().url('URL do Twitter inválida').optional().or(z.literal('')),
  linkedin: z.string().url('URL do LinkedIn inválida').optional().or(z.literal('')),
  keywords: z.array(z.string()).min(3, 'Adicione pelo menos 3 palavras-chave'),
})

export type SiteConfigInput = z.infer<typeof siteConfigSchema>

// Validação de ambiente
export const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET deve ter pelo menos 32 caracteres'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL inválida'),
  ADMIN_USERNAME: z.string().min(3, 'ADMIN_USERNAME deve ter pelo menos 3 caracteres'),
  ADMIN_PASSWORD_HASH: z.string().min(30, 'ADMIN_PASSWORD_HASH inválido'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().email('SMTP_USER inválido').optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>
