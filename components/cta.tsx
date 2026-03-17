"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { useSiteConfig } from "@/lib/site-config-context"

export function CTA() {
  const { config } = useSiteConfig()
  const whatsappNumber = config.whatsappNumber || "5592984607721"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá%20Ondeline,%20gostaria%20de%20contratar%20um%20plano%20de%20internet`

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-90" />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* Subtle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(255, 255, 255, 0.2)",
              animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-reveal">
          Pronto para a Melhor Internet do Amazonas?
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Junte-se a centenas de clientes satisfeitos que já aproveitam a conexão
          rápida e confiável da Ondeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            asChild
            className="ripple-effect bg-white hover:bg-white/90 text-slate-900 h-14 px-8 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center shadow-xl shadow-black/20 transition-all hover:scale-105 active:scale-95 border-0"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Contratar Agora <MessageCircle size={20} />
            </a>
          </Button>
          <Button
            size="lg"
            asChild
            variant="outline"
            className="ripple-effect h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 w-full sm:w-auto bg-transparent transition-all hover:scale-105 active:scale-95"
          >
            <a href="#suporte">
              Fale com a Gente <ArrowRight size={20} className="ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
