"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"
import { PreregistrationModal } from "./preregistration-modal"
import { usePlans } from "@/hooks/useAPI"
import { LoadingCard } from "./loading"

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

export function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: plans, loading } = usePlans()

  const activePlans = (plans || []).filter((p: Plan) => p.active)

  return (
    <>
      <PreregistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section id="planos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Planos que se Encaixam no seu Orçamento</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano perfeito para suas necessidades
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : activePlans.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-muted-foreground">Nenhum plano disponível</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activePlans.map((plan: Plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl border transition-all duration-300 p-6 ${
                    plan.highlighted
                      ? "border-primary bg-gradient-to-br from-primary/15 to-secondary/10 ring-2 ring-primary lg:scale-105"
                      : "border-border bg-card/50 hover:border-primary/50 hover:bg-card/80"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="mb-4 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      Mais Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="text-sm text-secondary font-semibold mt-2 flex items-center gap-1">
                      <Zap size={16} /> {plan.speed}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    }`}
                  >
                    Contratar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
