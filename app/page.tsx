import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LeadCaptureModal } from "@/components/lead-capture-modal"
import { ServicesAnimation } from "@/components/services-animation"
import { Features } from "@/components/features"
import { Plans } from "@/components/plans"
import { Support } from "@/components/support"
import { Clients } from "@/components/clients"
import { CoverageMap } from "@/components/coverage-map"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { FloatCTA } from "@/components/float-cta"
import { Footer } from "@/components/footer"
import { AnalyticsScripts, GTMNoScript } from "@/components/analytics-scripts"

export default function Home() {
  return (
    <main className="w-full">
      <AnalyticsScripts />
      <GTMNoScript />
      <Header />
      <Hero />
      <LeadCaptureModal />
      <ServicesAnimation />
      <Features />
      <Plans />
      <Support />
      <Clients />
      <CoverageMap />
      <FAQ />
      <CTA />
      <FloatCTA />
      <Footer />
    </main>
  )
}