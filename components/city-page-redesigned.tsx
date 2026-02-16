"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Wifi, Zap, Shield, Users, Clock, Star, MapPin } from "lucide-react"
import { PreregistrationModal } from "@/components/preregistration-modal"
import { Plans } from "@/components/plans"
import { Testimonials } from "@/components/testimonials"
import { MotionCard, SlideUp } from "@/components/motion-card"

interface CityPageProps {
  name: string
  slug: string
  population: string
  status: "coberto" | "em-breve"
  benefits: string[]
  benefitDescriptions: string[]
  features: {
    speed: string
    technology: string
    support: string
    uptime: string
  }
  stats?: {
    clients: string
    satisfaction: string
    years: string
    installationTime: string
  }
  testimonials?: Array<{
    id: string
    name: string
    location: string
    rating: number
    text: string
    avatar?: string
  }>
  backgroundImage?: string
}

export function CityPageRedesigned({ 
  name, 
  slug, 
  status, 
  benefits, 
  benefitDescriptions, 
  features,
  stats = {
    clients: "+150",
    satisfaction: "4.9",
    years: "4",
    installationTime: "24h"
  },
  testimonials = [],
  backgroundImage
}: CityPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isCovered = status === "coberto"

  const defaultTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: "1",
      name: "Maria Silva",
      location: `${name} - Centro`,
      rating: 5,
      text: "Melhor provedor da região! Internet super rápida e o suporte é excelente. Recomendo a todos!",
    },
    {
      id: "2",
      name: "João Santos",
      location: `${name} - Bairro Novo`,
      rating: 5,
      text: "Mudei para a Ondeline e não me arrependo. Instalação rápida e internet estável. Parabéns!",
    },
    {
      id: "3",
      name: "Ana Costa",
      location: `${name} - Zona Sul`,
      rating: 5,
      text: "Atendimento incrível! Técnicos muito atenciosos e internet de qualidade. Sou cliente fiel!",
    },
  ]

  return (
    <>
      <PreregistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultCity={name} />

      <main className="min-h-screen bg-background">
        {/* Hero Section Aprimorada */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {/* Background Image or Gradient */}
          {backgroundImage ? (
            <>
              <div 
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
              {/* Dark overlay for better readability */}
              <div className="absolute inset-0 -z-10 bg-slate-900/60" />
            </>
          ) : (
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {/* Background Effects */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            </div>
          )}

          <div className="max-w-6xl mx-auto text-center">
            {/* Status Badge */}
            <SlideUp delay={0.1}>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                isCovered
                  ? "bg-green-500/20 border border-green-500/40"
                  : "bg-yellow-500/20 border border-yellow-500/40"
              }`}>
                <CheckCircle className={`w-4 h-4 ${isCovered ? "text-green-500" : "text-yellow-500"}`} />
                <span className={`font-semibold text-sm ${isCovered ? "text-green-500" : "text-yellow-500"}`}>
                  {isCovered ? "Cobertura Ativa" : "Em Breve"}
                </span>
              </div>
            </SlideUp>

            {/* Main Heading */}
            <SlideUp delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6 text-white">
                Internet Rápida em{" "}
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                  {name}/AM
                </span>
              </h1>
            </SlideUp>

            {/* Subtitle */}
            <SlideUp delay={0.3}>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Conectando {name} com internet de alta velocidade, fibra óptica e suporte 24/7. 
                {isCovered && " Instalação grátis em até 24 horas!"}
              </p>
            </SlideUp>

            {/* CTAs */}
            <SlideUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 h-14 px-10 text-lg flex items-center gap-2 w-full sm:w-auto justify-center font-semibold shadow-lg shadow-primary/25"
                >
                  {isCovered ? "Contratar Agora" : "Fazer Pré-cadastro"} <ArrowRight size={20} />
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-10 text-lg w-full sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold"
                  onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Planos
                </Button>
              </div>
            </SlideUp>

            {/* Trust Indicators */}
            <SlideUp delay={0.5}>
              <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{stats.satisfaction}/5 de satisfação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{stats.clients} clientes em {name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Instalação em {stats.installationTime}</span>
                </div>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Stats Section - Social Proof */}
        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MotionCard className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center" delay={0.1}>
                <Wifi className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{features.speed}</div>
                <div className="text-sm text-slate-400">Velocidade Máxima</div>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center" delay={0.2}>
                <Users className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.clients}</div>
                <div className="text-sm text-slate-400">Clientes em {name}</div>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center" delay={0.3}>
                <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{features.uptime}</div>
                <div className="text-sm text-slate-400">Disponibilidade</div>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-center" delay={0.4}>
                <Clock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stats.installationTime}</div>
                <div className="text-sm text-slate-400">Instalação</div>
              </MotionCard>
            </div>
          </div>
        </section>

        {/* Features Grid - Why Choose Us */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Por que Escolher a Ondeline em {name}?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Somos o provedor mais confiável da região
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.1}>
                <div className="inline-flex p-3 rounded-lg bg-primary/20 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Internet Ultra Rápida</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Velocidade de fibra óptica para downloads e uploads instantâneos. Jogue, assista e trabalhe sem travamentos.
                </p>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.2}>
                <div className="inline-flex p-3 rounded-lg bg-cyan-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Wifi className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fibra Óptica Pura</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tecnologia de ponta para conexão estável e confiável. Internet de verdade para sua casa ou empresa.
                </p>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.3}>
                <div className="inline-flex p-3 rounded-lg bg-green-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">99.5% de Uptime</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Disponibilidade garantida. Você sempre conectado, quando precisar, sem surpresas desagradáveis.
                </p>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.4}>
                <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Suporte 24/7</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Equipe técnica local disponível a qualquer hora. Problemas técnicos? Resolvemos rápido!
                </p>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.5}>
                <div className="inline-flex p-3 rounded-lg bg-yellow-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instalação em 24h</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Instalação rápida e gratuita. Nossa equipe técnica própria garante qualidade no serviço em até 24 horas.
                </p>
              </MotionCard>

              <MotionCard className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all group" delay={0.6}>
                <div className="inline-flex p-3 rounded-lg bg-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cobertura Total</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Atendemos toda {name} com qualidade. Confira seu endereço e contrate já!
                </p>
              </MotionCard>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-balance">
              Benefícios Exclusivos para {name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <MotionCard
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                  delay={idx * 0.1}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefitDescriptions[idx]}
                    </p>
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials testimonials={defaultTestimonials} />

        {/* Plans */}
        <Plans />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Pronto para Ter Internet Rápida em {name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contrate agora e tenha internet instalada em até 24 horas. 
              {isCovered && " Instalação totalmente gratuita!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 h-14 px-12 text-lg font-semibold shadow-lg shadow-primary/25"
              >
                Solicitar Instalação <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="h-14 px-12 text-lg border-primary/50 hover:bg-primary/5"
                asChild
              >
                <a
                  href={`https://wa.me/5592984607721?text=Olá! Gostaria de contratar internet em ${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}