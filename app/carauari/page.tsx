import { getSiteConfig } from "@/lib/site-config"
import { CityPage, type CityData } from "@/components/on2/CityPage"

export const metadata = {
  title: "Internet em Carauari — Em Breve Ondeline",
  description: "A Ondeline está chegando em Carauari! Entre na lista de espera e seja um dos primeiros assinantes de fibra óptica na sua cidade.",
}

const CITY: CityData = {
  slug: "carauari",
  name: "Carauari",
  state: "Amazonas",
  status: "soon",
  intro: "Carauari é a próxima cidade da expansão Ondeline. A infraestrutura está sendo implantada e em breve você terá acesso a fibra óptica de alta velocidade na sua casa.",
  highlights: ["Lançamento previsto Q3 2026", "Pré-cadastro aberto", "Fibra óptica dedicada", "Wi-Fi 6 incluso"],
  stats: [
    { v: "Q3 2026", k: "Previsão de lançamento" },
    { v: "+200", k: "Pré-cadastros realizados" },
    { v: "25k", k: "Habitantes" },
    { v: "Em obras", k: "Infraestrutura" },
  ],
  photo: "/carauri.jpg",
  loja: {
    desc: "Nossa equipe já está mapeando Carauari para garantir que a expansão cubra os principais bairros desde o primeiro dia de operação.",
    items: [
      { icon: "wa", k: "Pré-cadastro via WhatsApp", v: "(92) 98460-7721" },
      { icon: "clock", k: "Previsão de operação", v: "3º trimestre de 2026" },
      { icon: "globe", k: "Cobertura estimada", v: "Centro e principais bairros" },
    ],
  },
}

export default async function CarauariPage() {
  const config = await getSiteConfig()
  return <CityPage city={CITY} whatsapp={config.whatsappNumber} phone={config.contactPhone} />
}
