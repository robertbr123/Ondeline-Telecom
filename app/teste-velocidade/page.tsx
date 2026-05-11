import type { Metadata } from "next"
import { getSiteConfig } from "@/lib/site-config"
import { Topbar } from "@/components/on2/Topbar"
import { Nav } from "@/components/on2/Nav"
import { Footer } from "@/components/on2/Footer"
import { SmartFloatCTA } from "@/components/on2/SmartFloatCTA"
import { SpeedTestExperience } from "@/components/on2/SpeedTestExperience"

export const metadata: Metadata = {
  title: "Teste de Velocidade Ondeline | Download, Upload e Ping",
  description: "Teste sua internet com a ferramenta da Ondeline Telecom. Meça download, upload, ping e envie o resultado ao suporte pelo WhatsApp.",
  alternates: { canonical: "/teste-velocidade" },
  openGraph: {
    title: "Teste de Velocidade Ondeline",
    description: "Meça sua conexão e fale com o suporte local da Ondeline.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
}

export default async function SpeedTestPage() {
  const config = await getSiteConfig()
  const wa = config.whatsappNumber || "5592984607721"
  const phone = config.contactPhone || "(92) 98460-7721"
  const logo = config.logoUrl || "/logo-ondeline.png"

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Teste de Velocidade Ondeline",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    provider: {
      "@type": "InternetServiceProvider",
      name: "Ondeline Telecom",
      telephone: phone,
    },
  }

  return (
    <div className="on2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Topbar phone={phone} />
      <Nav whatsapp={wa} logo={logo} />
      <SpeedTestExperience whatsapp={wa} />
      <Footer whatsapp={wa} phone={phone} logo={logo} />
      <SmartFloatCTA whatsapp={wa} phone={phone} />
    </div>
  )
}
