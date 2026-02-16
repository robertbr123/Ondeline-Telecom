"use client"

import React, { useState, useEffect } from "react"
import { MapPin, CheckCircle2, Clock, Wifi } from "lucide-react"

interface CoverageArea {
  id: number;
  city: string;
  state: string;
  status: string;
  latitude: number;
  longitude: number;
  description: string;
}

// Converter coordenadas reais para posição percentual no mapa
// O mapa mostra região do Amazonas:
// Latitude: -3.5 a -8.5 (Norte para Sul)
// Longitude: -73.5 a -65.5 (Oeste para Leste)
function coordToPercent(lat: number, lon: number) {
  const minLat = -3.5;
  const maxLat = -8.5;
  const minLon = -73.5;
  const maxLon = -65.5;

  const top = ((lat - minLat) / (maxLat - minLat)) * 100;
  const left = ((lon - minLon) / (maxLon - minLon)) * 100;

  return { 
    top: Math.max(5, Math.min(95, top)), 
    left: Math.max(5, Math.min(95, left)) 
  };
}

export function CoverageMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [areas, setAreas] = useState<CoverageArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/coverage")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeAreas = areas.filter((a) => a.status === "active");
  const comingSoonAreas = areas.filter((a) => a.status === "coming_soon");

  // URL do OpenStreetMap mostrando a região do Amazonas - TRAVADO nessa área
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=-73.5%2C-8.5%2C-65.5%2C-3.5&layer=mapnik"

  return (
    <section className="w-full py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Nossa Cobertura na Amazônia</h2>
          <p className="text-lg text-slate-400">Estamos em crescimento constante para melhor atender você</p>
        </div>

        {/* Container do Mapa */}
        <div className="relative w-full rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/10">
          {/* Mapa OpenStreetMap - TRAVADO (pointer-events: none impede interação) */}
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
            
            {/* Overlay para melhor contraste */}
            <div className="absolute inset-0 bg-slate-900/30 pointer-events-none" />
            
            {/* Marcadores dinâmicos sobre o mapa */}
            <div className="absolute inset-0">
              {loading ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800/90 px-4 py-3 rounded-lg border border-slate-700 z-50">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                    <span className="text-slate-300">Carregando cidades...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Marcadores das cidades ATIVAS */}
                  {activeAreas.map((area) => {
                    const pos = coordToPercent(area.latitude, area.longitude);
                    return (
                      <div 
                        key={area.id}
                        className="absolute pointer-events-auto cursor-pointer group z-30"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        onClick={() => setSelectedCity(selectedCity === area.city ? null : area.city)}
                      >
                        <div className="relative flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                          <div className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75" />
                          <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                            <Wifi size={12} className="text-white" />
                          </div>
                          <div className="mt-1 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                            {area.city}
                          </div>
                          {selectedCity === area.city && (
                            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-emerald-500/50 rounded-lg p-3 min-w-[200px] z-50 shadow-xl">
                              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                                <CheckCircle2 size={16} />
                                Cobertura Ativa
                              </div>
                              <p className="text-slate-300 text-sm">{area.description || "Internet de alta qualidade"}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Marcadores das cidades EM BREVE */}
                  {comingSoonAreas.map((area) => {
                    const pos = coordToPercent(area.latitude, area.longitude);
                    return (
                      <div 
                        key={area.id}
                        className="absolute pointer-events-auto cursor-pointer group z-30"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        onClick={() => setSelectedCity(selectedCity === area.city ? null : area.city)}
                      >
                        <div className="relative flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                          <div className="absolute w-6 h-6 bg-amber-500 rounded-full animate-pulse opacity-75" />
                          <div className="w-6 h-6 bg-amber-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                            <Clock size={12} className="text-white" />
                          </div>
                          <div className="mt-1 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                            {area.city}
                          </div>
                          {selectedCity === area.city && (
                            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-amber-500/50 rounded-lg p-3 min-w-[200px] z-50 shadow-xl">
                              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                                <Clock size={16} />
                                Em Breve
                              </div>
                              <p className="text-slate-300 text-sm">{area.description || "Previsão 2026 • Faça seu pré-cadastro"}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Legenda no canto */}
            <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-sm rounded-lg p-4 border border-slate-700 shadow-xl">
              <h4 className="text-white font-bold text-sm mb-3">Legenda</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-slate-300 text-sm">Cobertura Ativa ({activeAreas.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-slate-300 text-sm">Em Breve ({comingSoonAreas.length})</span>
                </div>
              </div>
            </div>

            {/* Badge de região */}
            <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 shadow-xl">
              <div className="flex items-center gap-2">
                <MapPin className="text-cyan-400" size={18} />
                <span className="text-white font-medium">Amazonas, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards das cidades abaixo do mapa */}
        {!loading && areas.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {areas.map((area) => (
              <div
                key={area.id}
                className={`p-5 rounded-xl text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  area.status === "active"
                    ? "bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 border border-emerald-600/50 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                    : "bg-gradient-to-br from-amber-900/80 to-amber-800/80 border border-amber-600/50 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                }`}
                onClick={() => setSelectedCity(selectedCity === area.city ? null : area.city)}
              >
                <div className="text-2xl mb-2">
                  {area.status === "active" ? "✓" : "🔜"}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{area.city}</h3>
                <p
                  className={`text-xs font-medium ${area.status === "active" ? "text-emerald-300" : "text-amber-300"}`}
                >
                  {area.status === "active" ? "Cobertura Ativa" : "Em Breve"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem se não houver cidades cadastradas */}
        {!loading && areas.length === 0 && (
          <div className="mt-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
            <p className="text-slate-400">Nenhuma cidade cadastrada ainda. Adicione cidades no painel administrativo.</p>
          </div>
        )}

        {/* Informação adicional */}
        <div className="mt-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-start gap-4">
            <MapPin className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Não encontrou sua cidade?</h3>
              <p className="text-slate-400">
                Estamos expandindo constantemente nossa cobertura pela região amazônica. 
                Deixe seu interesse registrado e entraremos em contato assim que chegarmos em sua região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
