"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X, ArrowUp } from "lucide-react"
import { useSiteConfig } from "@/lib/site-config-context"

export function FloatCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { config } = useSiteConfig()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsApp = () => {
    const phone = config.whatsappNumber || "5592984607721"
    const message = "Olá! Tenho interesse nos planos de internet da Ondeline."
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
          {/* Botão voltar ao topo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

          {/* Botão WhatsApp */}
          <div className="relative">
            {!isMinimized ? (
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-bounce"
                aria-label="Falar no WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Contratar Agora</span>
              </button>
            ) : (
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-pulse"
                aria-label="Falar no WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            )}
            
            {/* Botão para minimizar/restaurar */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-background border-2 border-cyan-500 text-foreground rounded-full text-xs font-bold hover:bg-muted transition-colors"
              aria-label={isMinimized ? "Expandir" : "Minimizar"}
            >
              {isMinimized ? "+" : "−"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
