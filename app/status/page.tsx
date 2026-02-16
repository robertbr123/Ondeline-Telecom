"use client"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, XCircle, Clock, Activity } from "lucide-react"

interface StatusItem {
  service: string
  status: "operational" | "degraded" | "down"
  uptime: number
  lastCheck: string
}

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  
  const services: StatusItem[] = [
    {
      service: "Internet - Ipixuna",
      status: "operational",
      uptime: 99.5,
      lastCheck: "2 min atrás"
    },
    {
      service: "Internet - Eirunepe",
      status: "operational",
      uptime: 99.2,
      lastCheck: "1 min atrás"
    },
    {
      service: "Servidor Principal",
      status: "operational",
      uptime: 99.9,
      lastCheck: "30 seg atrás"
    },
    {
      service: "Sistema de Cobrança",
      status: "operational",
      uptime: 99.8,
      lastCheck: "5 min atrás"
    },
    {
      service: "Suporte Técnico",
      status: "operational",
      uptime: 98.5,
      lastCheck: "1 min atrás"
    }
  ]

  const overallStatus = "operational" as const
  const overallUptime = 99.4

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  const getStatusIcon = (status: StatusItem["status"]) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "degraded":
        return <Clock className="w-6 h-6 text-yellow-500" />
      case "down":
        return <XCircle className="w-6 h-6 text-red-500" />
    }
  }

  const getStatusText = (status: StatusItem["status"]) => {
    switch (status) {
      case "operational":
        return "Operacional"
      case "degraded":
        return "Degradado"
      case "down":
        return "Indisponível"
    }
  }

  const getStatusColor = (status: StatusItem["status"]) => {
    switch (status) {
      case "operational":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "down":
        return "text-red-500"
    }
  }

  return (
    <main className="w-full min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Status dos Serviços</h1>
            <p className="text-lg text-muted-foreground">
              Monitoramento em tempo real dos serviços da Ondeline
            </p>
          </div>

          {/* Status Geral */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {getStatusIcon(overallStatus)}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {overallStatus === "operational" ? "Todos os Sistemas Operacionais" : "Problemas Detectados"}
                  </h2>
                  <p className="text-muted-foreground">
                    Uptime geral nos últimos 90 dias: <span className="font-semibold text-foreground">{overallUptime}%</span>
                  </p>
                </div>
              </div>
              <Activity className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>

          {/* Lista de Serviços */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{service.service}</h3>
                      <p className={`text-sm ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{service.uptime}%</p>
                    <p className="text-sm text-muted-foreground">Uptime 90 dias</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Última verificação: {service.lastCheck}</span>
                    <span>Resposta: <span className="text-green-500">~15ms</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Informações Adicionais */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Tempo de Resposta</h3>
              <p className="text-muted-foreground">
                Nossa equipe técnica monitora todos os sistemas 24 horas por dia. 
                Em caso de problemas, respondemos em até 15 minutos.
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Compromisso de Qualidade</h3>
              <p className="text-muted-foreground">
                Garantimos 99% de uptime para todos os nossos serviços. 
                Caso não atinja esse índice, oferecemos crédito no próximo boleto.
              </p>
            </div>
          </div>

          {/* Última Atualização */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}</p>
            <p className="mt-2">Os dados são atualizados automaticamente a cada 30 segundos</p>
          </div>

          {/* Botão de Contato */}
          <div className="mt-8 text-center">
            <a
              href="/#suporte"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition"
            >
              Precisa de Ajuda? Entre em Contato
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}