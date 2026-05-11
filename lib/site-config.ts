import { query } from './db'

export interface SiteConfigData {
  title: string
  description: string
  contactPhone: string
  contactEmail: string
  whatsappNumber: string
  address: string
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
  keywords: string[]
  logoUrl: string
  heroTitle: string
  heroSubtitle: string
  heroBadge: string
  promoBannerText: string
  // SEO
  googleAnalyticsId: string
  googleTagManagerId: string
  facebookPixelId: string
  metaRobots: string
  canonicalUrl: string
  ogImage: string
}

const defaultConfig: SiteConfigData = {
  title: "Ondeline Telecom",
  description: "Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.",
  contactPhone: "(92) 98460-7721",
  contactEmail: "contato@ondeline.com.br",
  whatsappNumber: "5592984607721",
  address: "Amazonas, Brasil",
  facebook: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  keywords: ["internet", "wifi", "amazonas", "ipixuna", "eirunepe", "itamarati", "carauari", "provedor", "fibra óptica"],
  logoUrl: "/logo-ondeline.png",
  heroTitle: "A internet mais rápida do Vale do Juruá.",
  heroSubtitle: "Fibra óptica 100% dedicada, Wi-Fi 6 incluso e suporte local que fala sua língua. Conectamos mais de 1.000 famílias em Ipixuna, Eirunepé e Itamarati — e vamos mais longe.",
  heroBadge: "Planos Giga disponíveis em Eirunepé",
  promoBannerText: "Instalação grátis nos planos selecionados",
  // SEO
  googleAnalyticsId: "",
  googleTagManagerId: "",
  facebookPixelId: "",
  metaRobots: "index, follow",
  canonicalUrl: "",
  ogImage: "",
}

export async function getSiteConfig(): Promise<SiteConfigData> {
  try {
    const result = await query('SELECT * FROM site_config')
    const config = result.rows as any[]
    
    const configObj: any = {}
    config.forEach(item => {
      configObj[item.key] = item.key === 'keywords' ? JSON.parse(item.value) : item.value
    })

    return {
      ...defaultConfig,
      ...configObj,
    }
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return defaultConfig
  }
}
