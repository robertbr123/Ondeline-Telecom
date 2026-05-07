"use client"

import { useEffect, useState } from "react"
import { Icon } from "./Icon"

interface Plan {
  id: string
  name: string
  speed: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
  active: boolean
}

function parseCents(price: string): { reais: string; centavos: string } {
  const [r, c] = price.replace("R$", "").trim().split(",")
  return { reais: r?.trim() || price, centavos: c || "90" }
}

export function Planos({ whatsapp }: { whatsapp?: string }) {
  const [plans, setPlans] = useState<Plan[]>([])
  const wa = whatsapp || "5592984607721"

  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then((d) => { if (d.success) setPlans(d.data) })
      .catch(() => {})
  }, [])

  const fallback: Plan[] = [
    { id: "1", name: "ESSENCIAL", speed: "300", price: "99,90", description: "Para navegar, assistir e estudar", features: ["Fibra óptica dedicada", "Wi-Fi 5 incluso", "Upload de 150 Mbps", "Suporte 7 dias/semana"], highlighted: false, active: true },
    { id: "2", name: "FLUXO", speed: "600", price: "139,90", description: "O plano mais escolhido", features: ["Fibra óptica dedicada", "Roteador Wi-Fi 6 incluso", "Upload simétrico 600 Mbps", "Suporte 24h local", "Instalação grátis"], highlighted: true, active: true },
    { id: "3", name: "CORRENTEZA", speed: "1000", price: "199,90", description: "Para quem não abre mão de nada", features: ["Fibra óptica dedicada", "Roteador Wi-Fi 6 Mesh", "Upload simétrico 1 Gbps", "Suporte prioritário 24h", "IP fixo opcional"], highlighted: false, active: true },
  ]

  const raw = plans.length > 0 ? plans : fallback

  // Sempre coloca o plano destacado no centro (posição 1)
  const display = (() => {
    const highlighted = raw.find((p) => p.highlighted)
    const others = raw.filter((p) => !p.highlighted)
    if (!highlighted || raw.length !== 3) return raw
    return [others[0], highlighted, others[1]]
  })()

  return (
    <section className="on2-sec" id="planos">
      <div className="on2-shell">
        <div className="on2-sec-head center">
          <span className="on2-sec-lbl">Planos residenciais</span>
          <h2>Escolha a velocidade <span>certa pra você</span>.</h2>
          <p>Sem letras miúdas, sem taxa escondida, sem fidelidade abusiva. Instalação grátis e Wi-Fi incluso nos planos Fluxo e Correnteza.</p>
        </div>

        <div className="on2-plans-grid">
          {display.map((p) => {
            const { reais, centavos } = parseCents(p.price)
            return (
              <div className={"on2-plan " + (p.highlighted ? "featured" : "")} key={p.id}>
                {p.highlighted && <div className="on2-plan-badge">Mais escolhido</div>}
                <div className="on2-plan-name">{p.name}</div>
                <div className="on2-plan-speed">
                  <span className="n">{p.speed}</span>
                  <span className="u">MEGA</span>
                </div>
                <div className="on2-plan-note">{p.description}</div>
                <div className="on2-plan-price">R$ {reais}<small>,{centavos}/mês</small></div>
                <div className="on2-plan-price-alt">ou R$ {(parseFloat(reais.replace(",", ".")) / 30).toFixed(2).replace(".", ",")}/dia</div>
                <ul>
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <a
                  href={`https://wa.me/${wa}?text=Olá! Gostaria de assinar o Plano ${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={"on2-btn " + (p.highlighted ? "on2-btn-primary" : "on2-btn-ghost")}
                >
                  Quero este plano <Icon name="arrow" size={18} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
