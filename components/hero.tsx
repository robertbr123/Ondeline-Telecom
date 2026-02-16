"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Wifi, Award } from "lucide-react"
import { ScrollAnimation } from "./scroll-animation"

export function Hero() {
  return (
    <section id="inicio" className="pt-40 pb-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-secondary font-semibold text-sm flex items-center gap-2">
              <Wifi size={16} /> Conectando o Amazonas em Alta Velocidade
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight">
            Internet Rápida
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              e Confiável
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Ondeline leva internet de alta velocidade para Ipixuna e Eirunepe. Em breve: Itamarati e Carauari. Suporte
            mais rápido da região!
          </p>
        </div>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 h-14 px-10 text-lg flex items-center gap-2 w-full sm:w-auto justify-center font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <a href="#planos">
                Contratar Agora <ArrowRight size={20} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 px-10 text-lg w-full sm:w-auto border-primary/50 hover:bg-primary/5 bg-transparent transition-all hover:scale-105 active:scale-95"
            >
              <a href="#suporte">
                Saiba Mais
              </a>
            </Button>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition hover:scale-105">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary">+700</div>
              <div className="text-sm text-muted-foreground mt-2">Clientes Satisfeitos</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border hover:border-secondary/50 transition hover:scale-105">
              <Wifi className="w-8 h-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground mt-2">Suporte Ativo</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border hover:border-accent/50 transition hover:scale-105">
              <Award className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent">99.5%</div>
              <div className="text-sm text-muted-foreground mt-2">Disponibilidade</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition hover:scale-105">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary">4 anos</div>
              <div className="text-sm text-muted-foreground mt-2">De Experiência</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}