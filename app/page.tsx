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

function WaveDivider({ fromDark, toDark, fromLight, toLight, flip }: { fromDark: string; toDark: string; fromLight: string; toLight: string; flip?: boolean }) {
  return (
    <>
      <div className={`wave-separator hidden dark:block ${flip ? "rotate-180" : ""}`} style={{ background: toDark }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,0 L0,0 Z" fill={fromDark} />
        </svg>
      </div>
      <div className={`wave-separator dark:hidden ${flip ? "rotate-180" : ""}`} style={{ background: toLight }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C240,60 480,60 720,30 C960,0 1200,0 1440,30 L1440,0 L0,0 Z" fill={fromLight} />
        </svg>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <main className="w-full dark:bg-slate-950 bg-white">
      <AnalyticsScripts />
      <GTMNoScript />
      <Header />
      <Hero />
      <LeadCaptureModal />
      <WaveDivider fromDark="#020617" toDark="#0f172a" fromLight="#f9fafb" toLight="#ffffff" />
      <ServicesAnimation />
      <WaveDivider fromDark="#020617" toDark="#0f172a" fromLight="#f9fafb" toLight="#ffffff" />
      <Features />
      <WaveDivider fromDark="#0f172a" toDark="#020617" fromLight="#ffffff" toLight="#f9fafb" />
      <Plans />
      <WaveDivider fromDark="#020617" toDark="#0f172a" fromLight="#f9fafb" toLight="#ffffff" />
      <Support />
      <WaveDivider fromDark="#0f172a" toDark="#020617" fromLight="#ffffff" toLight="#f9fafb" />
      <Clients />
      <WaveDivider fromDark="#020617" toDark="#020617" fromLight="#f9fafb" toLight="#f9fafb" />
      <CoverageMap />
      <WaveDivider fromDark="#020617" toDark="#0f172a" fromLight="#f9fafb" toLight="#ffffff" />
      <FAQ />
      <CTA />
      <FloatCTA />
      <Footer />
    </main>
  )
}
