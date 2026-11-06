export const dynamic = "force-dynamic"

import { getSiteConfig } from "@/lib/site-config"
import { getActivePlans } from "@/lib/plans"
import { Nav } from "@/components/o30/Nav"
import { Hero } from "@/components/o30/Hero"
import { Plans } from "@/components/o30/Plans"
import { Why } from "@/components/o30/Why"
import { Coverage } from "@/components/o30/Coverage"
import { Contact } from "@/components/o30/Contact"
import { Footer } from "@/components/o30/Footer"
import { SmartFloatCTA } from "@/components/on2/SmartFloatCTA"
import { AnalyticsScripts, GTMNoScript } from "@/components/analytics-scripts"
import "@/styles/ondeline2030.css"

export default async function Home() {
  const [config, plans] = await Promise.all([getSiteConfig(), getActivePlans()])
  const wa = config.whatsappNumber || "5592984607721"
  const phone = config.contactPhone || "(92) 98460-7721"
  const logo = config.logoUrl || "/logo-ondeline.png"
  const featured = plans.find((p) => p.highlighted) || plans[plans.length - 1]

  return (
    <div className="o30">
      <AnalyticsScripts />
      <GTMNoScript />
      <Nav logo={logo} />
      <main>
        <Hero plan={featured} whatsapp={wa} />
        <Plans plans={plans} whatsapp={wa} />
        <Why />
        <Coverage />
        <Contact whatsapp={wa} phone={phone} planNames={plans.map((p) => `${p.name} · ${p.speed}`)} />
      </main>
      <Footer logo={logo} whatsapp={wa} phone={phone} instagram={config.instagram} facebook={config.facebook} />
      {/* botão flutuante continua com o estilo on2 */}
      <div className="on2">
        <SmartFloatCTA whatsapp={wa} phone={phone} />
      </div>
    </div>
  )
}
