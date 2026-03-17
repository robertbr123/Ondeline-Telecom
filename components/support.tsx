"use client"

import { Headphones, AlertCircle, Zap } from "lucide-react"

export function Support() {
  const features = [
    {
      icon: Headphones,
      title: "Suporte Rápido",
      description: "Resposta em menos de 2 horas. Nossa equipe está sempre pronta para resolver seus problemas.",
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.3)",
    },
    {
      icon: Zap,
      title: "Instalação Técnica",
      description: "Profissionais treinados para instalar sua internet com qualidade e eficiência.",
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: AlertCircle,
      title: "100% Confiável",
      description: "Disponibilidade de 99.5% com redundância de infraestrutura em toda região.",
      gradient: "from-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
  ]

  return (
    <section id="suporte" className="py-24 px-4 dark:bg-slate-900 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900">
            O Melhor Suporte da Região
          </h2>
          <p className="text-xl dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
            Você merece um suporte rápido, eficiente e que realmente funcione
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group glass-card rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Icon with glow behind */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                  />
                  <div
                    className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transition-all duration-300`}
                    style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="dark:text-slate-400 text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
