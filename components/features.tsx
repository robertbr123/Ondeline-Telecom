"use client"

import * as Icons from "lucide-react"
import { useFeatures } from "@/hooks/useAPI"
import { LoadingCard } from "./loading"

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  order: number
  active: boolean
}

export function Features() {
  const { data: features, loading } = useFeatures()

  if (loading) {
    return (
      <section className="w-full py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Por que Escolher a Ondeline?</h2>
            <p className="text-lg text-slate-400">Somos o provedor de internet mais confiável da Amazônia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!features || features.length === 0) {
    return null
  }

  return (
    <section className="w-full py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Por que Escolher a Ondeline?</h2>
          <p className="text-lg text-slate-400">Somos o provedor de internet mais confiável da Amazônia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature: Feature) => {
            const IconComponent = (Icons as any)[feature.icon] || Icons.Star
            return (
              <div
                key={feature.id}
                className="group relative p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className={`inline-p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 p-3`}>
                  <IconComponent className="w-6 h-6 text-white" />
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
