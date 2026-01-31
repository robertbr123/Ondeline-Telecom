"use client"

import { useState } from "react"
import { Check, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlans } from "@/hooks/useAPI"
import { LoadingSpinner } from "./loading"
import { PreregistrationModal } from "./preregistration-modal"

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

export function PlansComparator() {
  const { data: plans, loading } = usePlans()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const activePlans = (plans || []).filter((p: Plan) => p.active)

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Carregando comparação..." />
      </div>
    )
  }

  if (!activePlans || activePlans.length === 0) {
    return null
  }

  // Extrair todas as features únicas
  const allFeatures = Array.from(
    new Set(activePlans.flatMap((plan: Plan) => plan.features))
  )

  return (
    <>
      <PreregistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Compare Nossos Planos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja lado a lado as diferenças e escolha o melhor para você
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left font-semibold border-r border-border">
                    Recursos
                  </th>
                  {activePlans.map((plan: Plan) => (
                    <th
                      key={plan.id}
                      className={`p-4 text-center border-r border-border last:border-r-0 ${
                        plan.highlighted ? "bg-primary/10" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        {plan.highlighted && (
                          <div className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                            Popular
                          </div>
                        )}
                        <div className="font-bold text-lg">{plan.name}</div>
                        <div className="flex items-center justify-center gap-1 text-sm text-secondary">
                          <Zap size={14} />
                          {plan.speed}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {plan.price}
                          <span className="text-sm text-muted-foreground">/mês</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/30 transition"
                  >
                    <td className="p-4 font-medium border-r border-border">
                      {feature}
                    </td>
                    {activePlans.map((plan: Plan) => (
                      <td
                        key={plan.id}
                        className={`p-4 text-center border-r border-border last:border-r-0 ${
                          plan.highlighted ? "bg-primary/5" : ""
                        }`}
                      >
                        {plan.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 border-border">
                  <td className="p-4 font-semibold border-r border-border"></td>
                  {activePlans.map((plan: Plan) => (
                    <td
                      key={plan.id}
                      className={`p-4 text-center border-r border-border last:border-r-0 ${
                        plan.highlighted ? "bg-primary/5" : ""
                      }`}
                    >
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        className={`w-full ${
                          plan.highlighted
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/90"
                        }`}
                      >
                        Contratar
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
