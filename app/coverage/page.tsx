import type { Metadata } from "next"
import { getSiteConfig } from "@/lib/site-config"
import { Topbar } from "@/components/on2/Topbar"
import { Nav } from "@/components/on2/Nav"
import { Footer } from "@/components/on2/Footer"
import { SmartFloatCTA } from "@/components/on2/SmartFloatCTA"
import { CoverageExperience } from "@/components/on2/CoverageExperience"

export const metadata: Metadata = {
  title: "Cobertura Ondeline | Internet Fibra no Vale do Juruá",
  description: "Confira a cobertura da Ondeline Telecom em Ipixuna, Eirunepé, Itamarati, Carauari e região. Consulte disponibilidade por cidade, bairro ou rua.",
  alternates: { canonical: "/coverage" },
  openGraph: {
    title: "Cobertura Ondeline no Amazonas",
    description: "Veja onde a fibra Ondeline está ativa e confirme disponibilidade pelo WhatsApp.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
}

export default async function CoveragePage() {
  const config = await getSiteConfig()
  const wa = config.whatsappNumber || "5592984607721"
  const phone = config.contactPhone || "(92) 98460-7721"
  const logo = config.logoUrl || "/logo-ondeline.png"

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cobertura de internet fibra Ondeline",
    provider: {
      "@type": "InternetServiceProvider",
      name: "Ondeline Telecom",
      telephone: phone,
      areaServed: ["Ipixuna", "Eirunepé", "Itamarati", "Carauari"],
    },
    serviceType: "Internet por fibra óptica",
    areaServed: [
      { "@type": "City", name: "Ipixuna", addressRegion: "AM" },
      { "@type": "City", name: "Eirunepé", addressRegion: "AM" },
      { "@type": "City", name: "Itamarati", addressRegion: "AM" },
      { "@type": "City", name: "Carauari", addressRegion: "AM" },
    ],
  }

  return (
    <div className="on2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Topbar phone={phone} />
      <Nav whatsapp={wa} logo={logo} />
      <CoverageExperience whatsapp={wa} />
      <Footer whatsapp={wa} phone={phone} logo={logo} instagram={config.instagram} facebook={config.facebook} />
      <SmartFloatCTA whatsapp={wa} phone={phone} />
    </div>
  )
}
