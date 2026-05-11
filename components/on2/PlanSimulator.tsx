"use client"

import { useMemo, useState } from "react"
import { Icon } from "./Icon"

const recommendations = [
  {
    maxPeople: 2,
    name: "ESSENCIAL",
    speed: "300 MEGA",
    price: "99,90",
    copy: "Ideal para redes sociais, aulas, filmes e até duas TVs conectadas.",
  },
  {
    maxPeople: 5,
    name: "FLUXO",
    speed: "600 MEGA",
    price: "139,90",
    copy: "O melhor equilíbrio para família, streaming em 4K, chamadas e jogos.",
  },
  {
    maxPeople: 99,
    name: "CORRENTEZA",
    speed: "1000 MEGA",
    price: "199,90",
    copy: "Para casa cheia, trabalho remoto, gamers e muitos aparelhos ao mesmo tempo.",
  },
]

export function PlanSimulator({ whatsapp }: { whatsapp?: string }) {
  const [people, setPeople] = useState(3)
  const [usage, setUsage] = useState("streaming")
  const wa = whatsapp || "5592984607721"

  const recommendation = useMemo(() => {
    const base = recommendations.find((plan) => people <= plan.maxPeople) || recommendations[2]
    if (usage === "gamer" || usage === "trabalho") {
      return people <= 2 ? recommendations[1] : recommendations[2]
    }
    return base
  }, [people, usage])

  const message = `Olá! Usei o simulador do site e ele recomendou o plano ${recommendation.name} (${recommendation.speed}) para ${people} pessoa${people > 1 ? "s" : ""}. Quero confirmar disponibilidade no meu endereço.`

  return (
    <section className="on2-simulator" id="simulador">
      <div className="on2-shell on2-simulator-inner">
        <div>
          <span className="on2-sec-lbl">Simulador de plano</span>
          <h2>Quantas pessoas usam internet na sua casa?</h2>
          <p>
            Ajuste o perfil de uso e receba uma recomendação rápida antes de chamar no WhatsApp.
          </p>
        </div>

        <div className="on2-sim-panel">
          <div className="on2-sim-control">
            <div className="on2-sim-row">
              <label>Pessoas conectadas</label>
              <strong>{people}</strong>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={people}
              onChange={(event) => setPeople(Number(event.target.value))}
              aria-label="Quantidade de pessoas conectadas"
            />
          </div>

          <div className="on2-sim-usage" aria-label="Perfil de uso">
            {[
              ["basico", "Básico"],
              ["streaming", "Streaming"],
              ["gamer", "Gamer"],
              ["trabalho", "Trabalho"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={usage === value ? "active" : ""}
                onClick={() => setUsage(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="on2-sim-result">
            <div>
              <span>Plano recomendado</span>
              <h3>{recommendation.name}</h3>
              <p>{recommendation.copy}</p>
            </div>
            <div className="on2-sim-price">
              <strong>{recommendation.speed}</strong>
              <span>R$ {recommendation.price}/mês</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="on2-btn on2-btn-primary on2-sim-cta"
          >
            Confirmar disponibilidade <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
