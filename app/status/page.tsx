"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, XCircle, Clock, Activity, RefreshCw } from "lucide-react"

interface ServiceData {
  service: string
  status: "operational" | "degraded" | "down"
  responseTime: number | null
  lastCheck: string
}

interface StatusData {
  overall: "operational" | "degraded" | "down"
  services: ServiceData[]
  uptime: Record<string, number>
  lastUpdated: string
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStatus = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch("/api/status", { cache: "no-store" })
      const json = await res.json()
      if (json.success) setData(json.data)
    } catch (error) {
      console.error("Failed to fetch status:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(() => fetchStatus(), 60000) // refresh every 60s
    return () => clearInterval(interval)
  }, [fetchStatus])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "degraded":
        return <Clock className="w-6 h-6 text-yellow-500" />
      case "down":
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <Activity className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational": return "Operacional"
      case "degraded": return "Degradado"
      case "down": return "Indisponível"
      default: return "Desconhecido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-500"
      case "degraded": return "text-yellow-500"
      case "down": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getOverallBanner = (status: string) => {
    switch (status) {
      case "operational":
        return { bg: "bg-green-500/10 border-green-500/20", text: "Todos os Sistemas Operacionais" }
      case "degraded":
        return { bg: "bg-yellow-500/10 border-yellow-500/20", text: "Desempenho Degradado Detectado" }
      case "down":
        return { bg: "bg-red-500/10 border-red-500/20", text: "Interrupção Detectada" }
      default:
        return { bg: "bg-gray-500/10 border-gray-500/20", text: "Verificando..." }
    }
  }

  if (loading) {
    return (
      <main className="w-full min-h-screen">
        <Header />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Activity className="w-8 h-8 text-cyan-500 animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando status dos serviços...</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const banner = getOverallBanner(data?.overall || "operational")

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

          {/* Overall Status Banner */}
          <div className={`rounded-2xl border p-8 mb-8 ${banner.bg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(data?.overall || "operational")}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{banner.text}</h2>
                  {data && (
                    <p className="text-muted-foreground text-sm mt-1">
                      Última verificação: {new Date(data.lastUpdated).toLocaleTimeString("pt-BR")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => fetchStatus(true)}
                disabled={refreshing}
                className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                title="Atualizar"
              >
                <RefreshCw className={`w-5 h-5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {data?.services.map((service, index) => (
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
                    {data.uptime[service.service] !== undefined && (
                      <>
                        <p className="text-2xl font-bold text-foreground">{data.uptime[service.service]}%</p>
                        <p className="text-sm text-muted-foreground">Uptime 24h</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Última verificação: {new Date(service.lastCheck).toLocaleTimeString("pt-BR")}</span>
                    {service.responseTime !== null && (
                      <span>
                        Resposta:{" "}
                        <span className={service.responseTime < 500 ? "text-green-500" : service.responseTime < 2000 ? "text-yellow-500" : "text-red-500"}>
                          {service.responseTime}ms
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Cards */}
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

          {/* Auto-refresh notice */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Os dados são atualizados automaticamente a cada 60 segundos</p>
          </div>

          {/* Contact Button */}
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
