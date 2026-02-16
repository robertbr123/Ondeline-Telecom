"use client"

import React, { useEffect, useState } from "react"
import { Cloud, Database, Building2, Users } from "lucide-react"

export function ServicesAnimation() {
  const [activeService, setActiveService] = useState(0)
  const services = [
    {
      name: "SaaS",
      description: "Soluções em nuvem para sua empresa",
      icon: Cloud,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Hospedagem",
      description: "Hospedagem confiável e segura",
      icon: Database,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Datacenter",
      description: "Infraestrutura de dados robusta",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Soluções para Governo",
      description: "Sistemas especializados para órgãos públicos",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nossos Outros Serviços</h2>
          <p className="text-lg text-muted-foreground">Soluções completas para sua empresa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className={`relative p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                  activeService === idx
                    ? `bg-gradient-to-br ${service.color} shadow-2xl scale-105`
                    : "bg-card border border-border scale-100 hover:border-primary/50"
                }`}
                onClick={() => setActiveService(idx)}
              >
                <div className={`text-center ${activeService === idx ? "text-white" : "text-foreground"}`}>
                  <Icon size={32} className={`mx-auto mb-3 ${activeService === idx ? "text-white" : "text-primary"}`} />
                  <div className="text-xl font-bold mb-2">{service.name}</div>
                  <div className="text-sm">{service.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
