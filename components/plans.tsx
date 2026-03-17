"use client"

import React, { useState } from "react"
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

      <section id="planos" className="py-24 px-4 dark:bg-slate-950 bg-gray-50 relative overflow-hidden wave-pattern">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 text-balance">
              Planos que se Encaixam no seu Orçamento
            </h2>
            <p className="text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
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
              <div className="dark:text-slate-500 text-slate-400">Nenhum plano disponível</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activePlans.map((plan: Plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl transition-all duration-500 group ${
                    plan.highlighted
                      ? "orbital-border lg:scale-105 z-10"
                      : "glass-card hover:border-cyan-500/30 hover:scale-[1.02]"
                  }`}
                >
                  {/* Inner content */}
                  <div
                    className={`relative rounded-2xl p-7 h-full ${
                      plan.highlighted
                        ? "dark:bg-slate-950/95 bg-white"
                        : ""
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.highlighted && (
                      <div className="mb-5 inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full badge-pulse">
                        <Zap size={12} />
                        Mais Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">{plan.name}</h3>
                      <p className="dark:text-slate-400 text-slate-600 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-4xl font-bold ${
                            plan.highlighted ? "text-cyan-400 stat-glow" : "text-cyan-400"
                          }`}
                        >
                          {plan.price}
                        </span>
                        <span className="dark:text-slate-500 text-slate-400">/mês</span>
                      </div>
                      <p className="text-sm text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                        <Zap size={16} /> {plan.speed}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-emerald-400" />
                          </div>
                          <span className="text-sm dark:text-slate-300 text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className={`w-full ripple-effect transition-all duration-300 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border-0"
                          : "dark:bg-slate-800 dark:hover:bg-slate-700 bg-slate-100 hover:bg-slate-200 text-white dark:border-slate-700 border-slate-300 hover:border-cyan-500/50 border"
                      }`}
                    >
                      Contratar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
