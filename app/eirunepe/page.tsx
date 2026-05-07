export const dynamic = "force-dynamic"

import { getSiteConfig } from "@/lib/site-config"
import { CityPage, type CityData } from "@/components/on2/CityPage"

export const metadata = {
  title: "Internet em Eirunepé — Fibra Óptica Ondeline",
  description: "Ondeline em Eirunepé: hub regional de fibra óptica, Wi-Fi 6 incluso, suporte local 24h. Planos a partir de R$ 99,90/mês.",
}

const CITY: CityData = {
  slug: "eirunepe",
  name: "Eirunepé",
  state: "Amazonas",
  status: "active",
  intro: "Eirunepé é o hub regional da Ondeline no Vale do Juruá. Com infraestrutura de backbone dedicado, é daqui que toda a rede da região é gerenciada e expandida.",
  highlights: ["Hub regional da rede", "Planos Giga disponíveis", "Atendimento na loja física", "Técnicos 24h na cidade"],
  stats: [
    { v: "+450", k: "Famílias conectadas" },
    { v: "12", k: "Bairros atendidos" },
    { v: "99,98%", k: "Uptime da rede" },
    { v: "Hub", k: "Regional AM" },
  ],
  bairros: [
    { name: "Centro" },
    { name: "São Sebastião" },
    { name: "Santo Antônio" },
    { name: "Boa Esperança" },
    { name: "São Francisco" },
    { name: "Santa Luzia" },
    { name: "Canarinho" },
    { name: "Novo Eirunepé" },
    { name: "Liberdade" },
    { name: "Jardim América" },
    { name: "Vila Rica" },
    { name: "São Raimundo" },
    { name: "Zona Rural Norte", soon: true },
    { name: "Ramal do Jutaí", soon: true },
  ],
  photo: "/eirunepe.jpg",
  loja: {
    desc: "Nossa sede fica em Eirunepé. A equipe completa de suporte, instalação e atendimento está aqui, todos os dias úteis e plantão no fim de semana.",
    items: [
      { icon: "pin", k: "Endereço", v: "Av. Ajuricaba, 512 · Centro · Eirunepé" },
      { icon: "clock", k: "Horário", v: "Seg a Sex 8h–18h · Sáb 8h–14h" },
      { icon: "phone", k: "Contato", v: "(92) 98460-7721" },
    ],
  },
}

export default async function EirunepePage() {
  const config = await getSiteConfig()
  return <CityPage city={CITY} whatsapp={config.whatsappNumber} phone={config.contactPhone} logo={config.logoUrl} />
}
