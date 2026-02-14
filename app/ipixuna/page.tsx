"use client"

import { CityPage } from "@/components/city-page"

export default function IpixunaPage() {
  return (
    <CityPage
      name="Ipixuna"
      slug="ipixuna"
      population="30.000"
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
    />
  )
}
