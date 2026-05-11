export const dynamic = "force-dynamic"

import { getSiteConfig } from "@/lib/site-config"
import { Topbar } from "@/components/on2/Topbar"
import { Nav } from "@/components/on2/Nav"
import { Hero } from "@/components/on2/Hero"
import { Planos } from "@/components/on2/Planos"
import { PlanSimulator } from "@/components/on2/PlanSimulator"
import { Cobertura } from "@/components/on2/Cobertura"
import { Porque } from "@/components/on2/Porque"
import { SpeedBanner } from "@/components/on2/SpeedBanner"
import { Depoimentos } from "@/components/on2/Depoimentos"
import { CTASection } from "@/components/on2/CTASection"
import { Footer } from "@/components/on2/Footer"
import { SmartFloatCTA } from "@/components/on2/SmartFloatCTA"
import { AnalyticsScripts, GTMNoScript } from "@/components/analytics-scripts"

export default async function Home() {
  const config = await getSiteConfig()
  const wa = config.whatsappNumber || "5592984607721"
  const phone = config.contactPhone || "(92) 98460-7721"
  const logo = config.logoUrl || "/logo-ondeline.png"

  return (
    <div className="on2">
      <AnalyticsScripts />
      <GTMNoScript />
      <Topbar phone={phone} />
      <Nav whatsapp={wa} logo={logo} />
      <Hero
        whatsapp={wa}
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        badge={config.heroBadge}
      />
      <PlanSimulator whatsapp={wa} />
      <Planos whatsapp={wa} />
      <Cobertura />
      <Porque />
      <SpeedBanner />
      <Depoimentos />
      <CTASection whatsapp={wa} phone={phone} />
      <Footer whatsapp={wa} phone={phone} logo={logo} />
      <SmartFloatCTA whatsapp={wa} phone={phone} />
    </div>
  )
}
