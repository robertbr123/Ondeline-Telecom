import { Metadata } from "next"
import { Header } from "@/components/header"
import { Plans } from "@/components/plans"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { FloatCTA } from "@/components/float-cta"
import { Footer } from "@/components/footer"
import { MapPin, Wifi, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Internet em Carauari - Ondeline Telecom",
  description: "Internet de alta velocidade em Carauari, Amazonas. Planos a partir de R$ 100 com suporte 24/7 e instalação rápida.",
  keywords: ["internet carauari", "provedor carauari", "wifi carauari", "fibra óptica carauari", "ondeline"],
}

export default function CarauariPage() {
  return (
    <main className="w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Carauari, Amazonas</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
            Internet de Alta Velocidade em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Carauari
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto text-balance">
            Conectando Carauari com internet rápida e confiável. 
            Planos a partir de R$ 100/mês com instalação grátis.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#planos"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition shadow-lg shadow-primary/20"
            >
              Ver Planos
            </a>
            <a
              href={`https://wa.me/5592984607721?text=Olá! Gostaria de contratar internet em Carauari`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <Wifi className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">Até 80 MB</h3>
            <p className="text-slate-400">De velocidade</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <Users className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
            <p className="text-slate-400">Suporte técnico</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <Zap className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">3 dias</h3>
            <p className="text-slate-400">Prazo de instalação</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Por que escolher a Ondeline em Carauari?
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Cobertura em toda Carauari</h3>
              <p className="text-slate-400">
                Estamos expandindo nossa rede para atender toda a cidade com internet de qualidade.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Instalação Rápida e Grátis</h3>
              <p className="text-slate-400">
                Nossa equipe técnica instala em até 3 dias úteis, sem custos adicionais de instalação.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Suporte Local</h3>
              <p className="text-slate-400">
                Equipe técnica na região para atendimento rápido e personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Plans />
      <FAQ />
      <CTA />
      <FloatCTA />
      <Footer />
    </main>
  )
}
