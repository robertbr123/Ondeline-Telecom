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
