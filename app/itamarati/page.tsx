"use client"

import { CityPageRedesigned } from "@/components/city-page-redesigned"

export default function ItamaratiPage() {
  return (
    <CityPageRedesigned
      name="Itamarati"
      slug="itamarati"
      population="15.000"
      status="coberto"
      benefits={[
        "Internet estável e rápida",
        "Suporte técnico local",
        "Instalação em até 3 dias",
        "Roteador Wi-Fi grátis",
      ]}
      benefitDescriptions={[
        "Conexão estável sem interrupções",
        "Técnicos locais conhecem a região",
        "Equipe própria de instalação rápida",
        "Equipamento moderno e de alta qualidade",
      ]}
      features={{
        speed: "Até 80 MB",
        technology: "Fibra Óptica",
        support: "24/7",
        uptime: "99.5%",
      }}
      stats={{
        clients: "+80",
        satisfaction: "4.9",
        years: "4",
        installationTime: "3 dias"
      }}
    />
  )
}
