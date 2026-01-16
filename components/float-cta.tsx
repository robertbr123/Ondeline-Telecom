"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { useSiteConfig } from "@/lib/site-config-context"

export function FloatCTA() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <>
      {isVisible && (
        <button
          onClick={handleWhatsApp}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-bounce"
        >
          <MessageCircle className="w-5 h-5" />
          Contratar Agora
        </button>
      )}
    </>
  )
}
