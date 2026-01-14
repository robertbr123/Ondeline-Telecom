"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wifi, Zap, Shield, CheckCircle } from "lucide-react"
import { PreregistrationModal } from "@/components/preregistration-modal"
import { Plans } from "@/components/plans"

const cityData = {
  name: "Ipixuna",
  state: "Amazonas",
  population: "30.000",
  status: "coberto",
  benefits: [
    "Internet estável e rápida",
    "Suporte técnico local",
    "Instalação em até 3 dias",
    "Roteador Wi-Fi grátis"
  ],
  features: {
    speed: "Até 80 MB",
    technology: "Fibra Óptica",
    support: "24/7",
    uptime: "99.5%"
  }
}

export default function IpixunaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <PreregistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-semibold text-sm">Cobertura Ativa</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6">
              Internet Rápida em{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Ipixuna/AM
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Conectando a cidade de Ipixuna com internet de alta velocidade, fibra óptica e suporte 24/7
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 h-14 px-10 text-lg flex items-center gap-2 w-full sm:w-auto justify-center font-semibold"
              >
                Contratar Agora <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                className="h-14 px-10 text-lg w-full sm:w-auto border-primary/50 hover:bg-primary/5"
                onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Planos
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white text-balance">
              Por que Escolher a Ondeline em {cityData.name}?
            </h2>
            <p className="text-lg text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              Somos o provedor mais confiável da região
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/20 mb-4">
                  <Zap className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cityData.features.speed}</h3>
                <p className="text-slate-400">Velocidade de fibra óptica para downloads e uploads instantâneos</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <div className="inline-flex p-3 rounded-lg bg-primary/20 mb-4">
                  <Wifi className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cityData.features.technology}</h3>
                <p className="text-slate-400">Tecnologia de ponta para conexão estável e confiável</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <div className="inline-flex p-3 rounded-lg bg-green-500/20 mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cityData.features.uptime}</h3>
                <p className="text-slate-400">99.5% de disponibilidade garantida</p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-4">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cityData.features.support}</h3>
                <p className="text-slate-400">Suporte técnico local disponível a qualquer hora</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-balance">
              Benefícios Exclusivos para {cityData.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
                    <p className="text-muted-foreground text-sm">
                      {idx === 0 && "Conexão estável sem interrupções"}
                      {idx === 1 && "Técnicos locais conhecem a região"}
                      {idx === 2 && "Equipe própria de instalação rápida"}
                      {idx === 3 && "Equipamento moderno e de alta qualidade"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <Plans />

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-balance">
              Pronto para Ter Internet Rápida em {cityData.name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contrate agora e tenha internet instalada em até 3 dias úteis
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 h-14 px-12 text-lg font-semibold"
            >
              Solicitar Instalação <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
