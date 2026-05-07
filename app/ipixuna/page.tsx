import { getSiteConfig } from "@/lib/site-config"
import { CityPage, type CityData } from "@/components/on2/CityPage"

export const metadata = {
  title: "Internet em Ipixuna — Fibra Óptica Ondeline",
  description: "Ondeline em Ipixuna: fibra óptica dedicada, Wi-Fi 6 incluso, suporte local 24h. Planos a partir de R$ 99,90/mês.",
}

const CITY: CityData = {
  slug: "ipixuna",
  name: "Ipixuna",
  state: "Amazonas",
  status: "active",
  intro: "Ipixuna foi uma das primeiras cidades a receber a rede Ondeline. Hoje, centenas de famílias, escolas e comércios do município já operam em fibra óptica dedicada.",
  highlights: ["Rede ativa desde 2023", "Cobertura em 8 bairros", "Suporte local presencial", "Instalação em 48h"],
  stats: [
    { v: "+320", k: "Famílias conectadas" },
    { v: "8", k: "Bairros atendidos" },
    { v: "99,9%", k: "Uptime 12 meses" },
    { v: "24h", k: "Suporte local" },
  ],
  bairros: [
    { name: "Centro" },
    { name: "São Francisco" },
    { name: "Boa Esperança" },
    { name: "Nossa Senhora de Fátima" },
    { name: "São José" },
    { name: "Santa Luzia" },
    { name: "Redenção" },
    { name: "Vila Nova" },
    { name: "Triângulo", soon: true },
    { name: "Novo Horizonte", soon: true },
  ],
  photo: "/ipixuna-2.jpg",
  loja: {
    desc: "Nossa equipe em Ipixuna atende de portas abertas de segunda a sábado. Quem atende são vizinhos seus, que conhecem cada rua e cada bairro.",
    items: [
      { icon: "pin", k: "Endereço", v: "R. Marechal Deodoro, 234 · Centro" },
      { icon: "clock", k: "Horário", v: "Seg a Sex 8h–18h · Sáb 8h–12h" },
      { icon: "phone", k: "Contato local", v: "(92) 98460-7721" },
    ],
  },
}

export default async function IpixunaPage() {
  const config = await getSiteConfig()
  return <CityPage city={CITY} whatsapp={config.whatsappNumber} phone={config.contactPhone} logo={config.logoUrl} />
}
