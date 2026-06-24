// app/detector/page.tsx
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LogoOndeline } from "@/components/logo-ondeline"
import { Activity, RefreshCw, CheckCircle, AlertTriangle, Download } from "lucide-react"
import { toPng } from "html-to-image"
import { ExportCard } from "@/components/detector/export-card"
import { DETECTOR_CATEGORIES } from "@/lib/detector-services"
import { ServiceCard, type DetectorServiceView } from "@/components/detector/service-card"

interface DetectorData {
  overall: "operational" | "degraded" | "down"
  lastUpdated: string
  services: DetectorServiceView[]
}

export default function DetectorPage() {
  const [data, setData] = useState<DetectorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(false)

  const exportRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = useCallback(async () => {
    if (!exportRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement("a")
      link.download = `detector-ondeline-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error("Falha ao gerar imagem:", e)
    } finally {
      setExporting(false)
    }
  }, [])

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch("/api/detector", { cache: "no-store" })
      const json = await res.json()
      if (json.success) {
        setData(json.data)
        setError(false)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => fetchData(), 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const problems = data?.services.filter((s) => s.status !== "operational").length ?? 0

  return (
    <main className="w-full min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho com marca */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <LogoOndeline size={48} />
              <span className="text-2xl font-bold text-primary">Detector Ondeline</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Está fora do ar? Status dos Serviços
            </h1>
            <p className="text-muted-foreground">
              Monitoramento em tempo real dos principais serviços
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <Activity className="w-8 h-8 text-primary animate-pulse mx-auto mb-4" />
              <p className="text-muted-foreground">Verificando serviços...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Não foi possível carregar o status agora.</p>
              <button
                onClick={() => fetchData(true)}
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              {/* Banner geral */}
              <div
                className={`rounded-2xl border p-6 mb-8 flex items-center justify-between ${
                  problems === 0
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {problems === 0 ? (
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-yellow-500" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {problems === 0
                        ? "Todos os serviços normais"
                        : `${problems} ${problems === 1 ? "serviço" : "serviços"} com instabilidade`}
                    </h2>
                    {data && (
                      <p className="text-sm text-muted-foreground">
                        Última verificação: {new Date(data.lastUpdated).toLocaleTimeString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                  className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                  title="Atualizar"
                >
                  <RefreshCw className={`w-5 h-5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="flex justify-end mb-6">
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  {exporting ? "Gerando..." : "Gerar imagem"}
                </button>
              </div>

              {/* Seções por categoria */}
              {DETECTOR_CATEGORIES.map((cat) => {
                const items = data?.services.filter((s) => s.category === cat) ?? []
                if (items.length === 0) return null
                return (
                  <div key={cat} className="mb-10">
                    <h2 className="text-lg font-bold text-foreground mb-4">{cat}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((s) => (
                        <ServiceCard key={s.name} service={s} />
                      ))}
                    </div>
                  </div>
                )
              })}

              <p className="text-center text-sm text-muted-foreground mt-8">
                Atualiza automaticamente a cada 60 segundos · por Ondeline Telecom
              </p>

              {data && (
                <ExportCard
                  ref={exportRef}
                  data={{
                    lastUpdated: data.lastUpdated,
                    services: data.services.map((s) => ({
                      name: s.name,
                      domain: s.domain,
                      status: s.status,
                    })),
                  }}
                />
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
