"use client"

import React, { useState, useEffect } from "react"
import { MapPin, CheckCircle2, Clock, Wifi } from "lucide-react"

interface CoverageArea {
  id: number
  city: string
  state: string
  status: string
  latitude: number
  longitude: number
  description: string
}

function coordToPercent(lat: number, lon: number) {
  const minLat = -3.5
  const maxLat = -8.5
  const minLon = -73.5
  const maxLon = -65.5

  const top = ((lat - minLat) / (maxLat - minLat)) * 100
  const left = ((lon - minLon) / (maxLon - minLon)) * 100

  return {
    top: Math.max(5, Math.min(95, top)),
    left: Math.max(5, Math.min(95, left)),
  }
}

export function CoverageMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [areas, setAreas] = useState<CoverageArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/coverage")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const activeAreas = areas.filter((a) => a.status === "active")
  const comingSoonAreas = areas.filter((a) => a.status === "coming_soon")

  const mapUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=-73.5%2C-8.5%2C-65.5%2C-3.5&layer=mapnik"

  return (
    <section className="w-full py-24 px-4 bg-slate-950 relative overflow-hidden">
      {/* Radar background effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          <div className="radar-ring" style={{ animationDelay: "0s" }} />
          <div className="radar-ring" style={{ animationDelay: "1s" }} />
          <div className="radar-ring" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Nossa Cobertura na Amazônia
          </h2>
          <p className="text-lg text-slate-400">
            Estamos em crescimento constante para melhor atender você
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full rounded-2xl overflow-hidden glass-card glow-pulse">
          <div className="relative w-full h-[450px] md:h-[550px]">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0 pointer-events-none"
              style={{
                filter: "hue-rotate(180deg) invert(92%) contrast(1.1) saturate(0.8)",
              }}
              title="Mapa de Cobertura Ondeline"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

            {/* City markers */}
            <div className="absolute inset-0">
              {loading ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card px-4 py-3 rounded-lg z-50">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                    <span className="text-slate-300">Carregando cidades...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Connection lines between active cities */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    {activeAreas.map((area, i) => {
                      if (i === 0) return null
                      const prev = activeAreas[i - 1]
                      const from = coordToPercent(prev.latitude, prev.longitude)
                      const to = coordToPercent(area.latitude, area.longitude)
                      return (
                        <line
                          key={`line-${area.id}`}
                          x1={`${from.left}%`}
                          y1={`${from.top}%`}
                          x2={`${to.left}%`}
                          y2={`${to.top}%`}
                          stroke="rgba(6, 182, 212, 0.3)"
                          strokeWidth="2"
                          className="fiber-line"
                        />
                      )
                    })}
                  </svg>

                  {/* Active city markers */}
                  {activeAreas.map((area) => {
                    const pos = coordToPercent(area.latitude, area.longitude)
                    return (
                      <div
                        key={area.id}
                        className="absolute pointer-events-auto cursor-pointer group z-30"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        onClick={() =>
                          setSelectedCity(selectedCity === area.city ? null : area.city)
                        }
                      >
                        <div className="relative flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                          <div className="absolute w-8 h-8 bg-emerald-500 rounded-full animate-ping opacity-30" />
                          <div className="w-7 h-7 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center marker-glow-green">
                            <Wifi size={12} className="text-white" />
                          </div>
                          <div className="mt-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                            {area.city}
                          </div>
                          {selectedCity === area.city && (
                            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 glass-card border-emerald-500/30 rounded-xl p-4 min-w-[220px] z-50 shadow-xl">
                              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                                <CheckCircle2 size={16} />
                                Cobertura Ativa
                              </div>
                              <p className="text-slate-300 text-sm">
                                {area.description || "Internet de alta qualidade"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {/* Coming soon markers */}
                  {comingSoonAreas.map((area) => {
                    const pos = coordToPercent(area.latitude, area.longitude)
                    return (
                      <div
                        key={area.id}
                        className="absolute pointer-events-auto cursor-pointer group z-30"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        onClick={() =>
                          setSelectedCity(selectedCity === area.city ? null : area.city)
                        }
                      >
                        <div className="relative flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                          <div className="absolute w-8 h-8 bg-amber-500 rounded-full animate-pulse opacity-30" />
                          <div className="w-7 h-7 bg-amber-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center marker-glow-amber">
                            <Clock size={12} className="text-white" />
                          </div>
                          <div className="mt-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                            {area.city}
                          </div>
                          {selectedCity === area.city && (
                            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 glass-card border-amber-500/30 rounded-xl p-4 min-w-[220px] z-50 shadow-xl">
                              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                                <Clock size={16} />
                                Em Breve
                              </div>
                              <p className="text-slate-300 text-sm">
                                {area.description || "Previsão 2026 • Faça seu pré-cadastro"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-card rounded-xl p-4 shadow-xl">
              <h4 className="text-white font-bold text-sm mb-3">Legenda</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full marker-glow-green" />
                  <span className="text-slate-300 text-sm">
                    Cobertura Ativa ({activeAreas.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full marker-glow-amber" />
                  <span className="text-slate-300 text-sm">
                    Em Breve ({comingSoonAreas.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Region badge */}
            <div className="absolute top-4 right-4 glass-card rounded-xl px-4 py-2 shadow-xl">
              <div className="flex items-center gap-2">
                <MapPin className="text-cyan-400" size={18} />
                <span className="text-white font-medium">Amazonas, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* City cards */}
        {!loading && areas.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {areas.map((area) => (
              <div
                key={area.id}
                className={`glass-card p-5 rounded-xl text-center transition-all duration-300 cursor-pointer hover:scale-105 ${
                  area.status === "active"
                    ? "hover:border-emerald-500/40"
                    : "hover:border-amber-500/40"
                }`}
                onClick={() =>
                  setSelectedCity(selectedCity === area.city ? null : area.city)
                }
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    area.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {area.status === "active" ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{area.city}</h3>
                <p
                  className={`text-xs font-medium ${
                    area.status === "active" ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {area.status === "active" ? "Cobertura Ativa" : "Em Breve"}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && areas.length === 0 && (
          <div className="mt-8 p-6 rounded-xl glass-card text-center">
            <p className="text-slate-400">
              Nenhuma cidade cadastrada ainda. Adicione cidades no painel administrativo.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 glass-card rounded-xl p-6 hover:border-cyan-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Não encontrou sua cidade?
              </h3>
              <p className="text-slate-400">
                Estamos expandindo constantemente nossa cobertura pela região amazônica.
                Deixe seu interesse registrado e entraremos em contato assim que chegarmos
                em sua região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
