// Configurações do Site
export interface SiteConfig {
  title: string
  description: string
  contactPhone: string
  contactEmail: string
  whatsappNumber: string
  address: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  seo: {
    keywords: string[]
  }
}

// Planos
export interface Plan {
  id: string
  name: string
  speed: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

// FAQ
export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  order: number
  active: boolean
}

// Leads/Pré-cadastro
export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: 'new' | 'contacted' | 'converted' | 'lost'
  planInterest?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Áreas de Cobertura
export interface CoverageArea {
  id: string
  city: string
  state: string
  neighborhoods: string[]
  status: 'active' | 'coming-soon' | 'planned'
  coordinates?: {
    lat: number
    lng: number
  }
}

// Cidades suportadas
export type City = 'Ipixuna' | 'Eirunepe' | 'Itamarati' | 'Carauari'

// Status do Lead
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'

// Estatísticas do Admin
export interface AdminStats {
  totalLeads: number
  activeLeads: number
  convertedLeads: number
  totalPlans: number
  activePlans: number
  totalFAQ: number
  recentLeads: Lead[]
}

// Usuário Admin
export interface AdminUser {
  username: string
  role: 'admin' | 'editor'
  createdAt: string
  lastLogin?: string
}

// Resposta da API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Dados do formulário de pré-cadastro
export interface PreregistrationFormData {
  name: string
  email: string
  phone: string
  city: string
}
