export const dynamic = "force-dynamic"

import { getSiteConfig } from "@/lib/site-config"
import { CityPage, type CityData } from "@/components/on2/CityPage"

export const metadata = {
  title: "Internet em Itamarati — Fibra Óptica Ondeline",
  description: "Ondeline em Itamarati: fibra óptica dedicada, suporte local e planos a partir de R$ 99,90/mês.",
}

const CITY: CityData = {
  slug: "itamarati",
  name: "Itamarati",
  state: "Amazonas",
  status: "active",
  intro: "Itamarati é a terceira cidade da rede Ondeline. Com uma equipe local dedicada, levamos fibra óptica de qualidade para famílias e comércios do município.",
  highlights: ["Rede ativa e expandindo", "Suporte local presencial", "Instalação em 48h", "Fibra dedicada"],
  stats: [
    { v: "+180", k: "Famílias conectadas" },
    { v: "6", k: "Bairros atendidos" },
    { v: "99,7%", k: "Uptime 12 meses" },
    { v: "48h", k: "Prazo de instalação" },
  ],
  bairros: [
    { name: "Centro" },
    { name: "São Pedro" },
    { name: "Nossa Senhora Aparecida" },
    { name: "Boa Vista" },
    { name: "São João" },
    { name: "Vila Nova" },
    { name: "Lago Grande", soon: true },
    { name: "São Benedito", soon: true },
  ],
  photo: "/itamarati.jpg",
  loja: {
    desc: "Temos um ponto de atendimento em Itamarati com técnicos locais que conhecem cada rua do município e respondem rápido.",
    items: [
      { icon: "pin", k: "Endereço", v: "R. da Matriz, 78 · Centro · Itamarati" },
      { icon: "clock", k: "Horário", v: "Seg a Sex 8h–17h" },
      { icon: "phone", k: "Contato", v: "(92) 98460-7721" },
    ],
  },
}

export default async function ItamaratiPage() {
  const config = await getSiteConfig()
  return <CityPage city={CITY} whatsapp={config.whatsappNumber} phone={config.contactPhone} logo={config.logoUrl} />
}
