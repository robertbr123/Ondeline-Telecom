"use client"

import { Gauge, MapPin, MessageCircle, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"

export function SmartFloatCTA({ whatsapp, phone }: { whatsapp?: string; phone?: string }) {
  const [open, setOpen] = useState(true)
  const [visible, setVisible] = useState(false)
  const wa = whatsapp || "5592984607721"
  const tel = phone || "(92) 98460-7721"
  const message = "Olá! Vim pelo site da Ondeline e quero atendimento."

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  const actions = [
    {
      label: "WhatsApp",
      href: `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
      icon: MessageCircle,
      primary: true,
      external: true,
    },
    { label: "Cobertura", href: "/coverage", icon: MapPin },
    { label: "Velocidade", href: "/teste-velocidade", icon: Gauge },
    { label: "Ligar", href: `tel:${tel.replace(/\D/g, "")}`, icon: Phone },
  ]

  return (
    <div className="on2-smart-cta" data-open={open}>
      {open && (
        <div className="on2-smart-cta-panel">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={action.primary ? "primary" : ""}
              >
                <Icon size={18} />
                <span>{action.label}</span>
              </a>
            )
          })}
        </div>
      )}
      <button
        type="button"
        className="on2-smart-cta-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar atalhos" : "Abrir atalhos"}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
