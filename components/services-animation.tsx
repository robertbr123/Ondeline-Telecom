"use client"

import React, { useEffect, useState } from "react"
import { Cloud, Database, Building2, Users } from "lucide-react"

export function ServicesAnimation() {
  const [activeService, setActiveService] = useState(0)
  const services = [
    {
      name: "SaaS",
      description: "Soluções em nuvem para sua empresa com alta disponibilidade e segurança",
      icon: Cloud,
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      name: "Hospedagem",
      description: "Hospedagem confiável e segura com servidores de última geração",
      icon: Database,
      gradient: "from-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      name: "Datacenter",
      description: "Infraestrutura de dados robusta com redundância total",
      icon: Building2,
      gradient: "from-purple-500 to-violet-600",
      glowColor: "rgba(139, 92, 246, 0.4)",
    },
    {
      name: "Soluções para Governo",
      description: "Sistemas especializados para órgãos públicos com conformidade total",
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-24 px-4 dark:bg-slate-950 bg-gray-50 dot-grid relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4 text-balance">
            Nossos Outros Serviços
          </h2>
          <p className="text-lg dark:text-slate-400 text-slate-600">Soluções completas para sua empresa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            const isActive = activeService === idx
            return (
              <div
                key={idx}
                className="tilt-card cursor-pointer group"
                onClick={() => setActiveService(idx)}
              >
                <div
                  className={`relative p-8 rounded-2xl transition-all duration-500 h-full ${
                    isActive
                      ? "glass-card border-cyan-500/40 scale-105"
                      : "glass-card hover:border-slate-600"
                  }`}
                  style={
                    isActive
                      ? { boxShadow: `0 0 30px ${service.glowColor}, 0 0 60px ${service.glowColor}` }
                      : undefined
                  }
                >
                  {/* Icon with pulse */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-br ${service.gradient} icon-pulse`
                        : "dark:bg-slate-800 bg-slate-200 dark:group-hover:bg-slate-700 group-hover:bg-slate-300"
                    }`}
                  >
                    <Icon
                      size={28}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-400"
                      }`}
                    />
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                        isActive ? "dark:text-white text-slate-900" : "dark:text-slate-300 text-slate-700"
                      }`}
                    >
                      {service.name}
                    </div>
                    <div
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? "dark:text-slate-300 text-slate-600" : "dark:text-slate-500 text-slate-500"
                      }`}
                    >
                      {service.description}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
