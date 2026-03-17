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

  const renderSkeleton = () => (
    <section className="w-full py-24 px-4 dark:bg-slate-900 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4 text-balance">
            Por que Escolher a Ondeline?
          </h2>
          <p className="text-lg dark:text-slate-400 text-slate-600">
            Somos o provedor de internet mais confiável da Amazônia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    </section>
  )

  if (loading) return renderSkeleton()
  if (!features || features.length === 0) return null

  return (
    <section className="w-full py-24 px-4 dark:bg-slate-900 bg-white relative overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4 text-balance">
            Por que Escolher a Ondeline?
          </h2>
          <p className="text-lg dark:text-slate-400 text-slate-600">
            Somos o provedor de internet mais confiável da Amazônia
          </p>
        </div>

        {/* Neural network SVG connections */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            {features.length >= 2 && (
              <>
                <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="rgba(6,182,212,0.1)" strokeWidth="1" className="fiber-line" />
                <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="rgba(59,130,246,0.1)" strokeWidth="1" className="fiber-line" />
                <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="rgba(16,185,129,0.08)" strokeWidth="1" className="fiber-line" />
                <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="rgba(139,92,246,0.08)" strokeWidth="1" className="fiber-line" />
              </>
            )}
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {features.map((feature: Feature, idx: number) => {
              const IconComponent = (Icons as any)[feature.icon] || Icons.Star
              return (
                <div
                  key={feature.id}
                  className="group glass-card rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Icon with glow */}
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
                    />
                    <div
                      className={`relative rounded-xl bg-gradient-to-br ${feature.color} p-3.5 w-fit`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
