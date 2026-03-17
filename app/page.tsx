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

function WaveDivider({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className={`wave-separator ${flip ? "rotate-180" : ""}`} style={{ background: to }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,0 L0,0 Z"
          fill={from}
        />
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <main className="w-full bg-slate-950">
      <AnalyticsScripts />
      <GTMNoScript />
      <Header />
      <Hero />
      <LeadCaptureModal />
      <WaveDivider from="#020617" to="#0f172a" />
      <ServicesAnimation />
      <WaveDivider from="#020617" to="#0f172a" />
      <Features />
      <WaveDivider from="#0f172a" to="#020617" />
      <Plans />
      <WaveDivider from="#020617" to="#0f172a" />
      <Support />
      <WaveDivider from="#0f172a" to="#020617" />
      <Clients />
      <WaveDivider from="#020617" to="#020617" />
      <CoverageMap />
      <WaveDivider from="#020617" to="#0f172a" />
      <FAQ />
      <CTA />
      <FloatCTA />
      <Footer />
    </main>
  )
}
