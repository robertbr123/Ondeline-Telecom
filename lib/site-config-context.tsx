"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface SiteConfig {
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
  // SEO
  googleAnalyticsId: string
  googleTagManagerId: string
  facebookPixelId: string
  metaRobots: string
  canonicalUrl: string
  ogImage: string
}

const defaultConfig: SiteConfig = {
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
  // SEO
  googleAnalyticsId: "",
  googleTagManagerId: "",
  facebookPixelId: "",
  metaRobots: "index, follow",
  canonicalUrl: "",
  ogImage: "",
}

interface SiteConfigContextType {
  config: SiteConfig
  loading: boolean
  refreshConfig: () => Promise<void>
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined)

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [loading, setLoading] = useState(true)

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/site/config')
      const data = await res.json()
      if (data.success && data.data) {
        setConfig({
          ...defaultConfig,
          ...data.data,
          keywords: data.data.keywords || defaultConfig.keywords,
          logoUrl: data.data.logoUrl || defaultConfig.logoUrl,
        })
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const refreshConfig = async () => {
    await fetchConfig()
  }

  return (
    <SiteConfigContext.Provider value={{ config, loading, refreshConfig }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext)
  if (!context) {
    throw new Error("useSiteConfig deve ser usado dentro de SiteConfigProvider")
  }
  return context
}
