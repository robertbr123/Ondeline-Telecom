"use client"

import { Zap, Shield, Rocket, Award } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Suporte 24/7",
      description: "Atendimento rápido e eficiente para resolver seus problemas em tempo real",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Internet Estável",
      description: "Conexão confiável que você pode depender para seu negócio todos os dias",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Rocket,
      title: "Conexão Rápida",
      description: "Velocidade de fibra óptica para downloads e uploads instantâneos",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Award,
      title: "Melhor Custo",
      description: "Melhor custo-benefício da região com planos flexíveis",
      color: "from-emerald-500 to-emerald-600",
    },
  ]

  return (
    <section className="w-full py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Por que Escolher a Ondeline?</h2>
          <p className="text-lg text-slate-400">Somos o provedor de internet mais confiável da Amazônia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className={`inline-p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
