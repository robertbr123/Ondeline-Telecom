"use client"

import { useState } from "react"
import { MapPin, CheckCircle2, Clock, Wifi } from "lucide-react"

export function CoverageMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const cities = [
    {
      name: "Ipixuna",
      status: "active",
      desc: "Cobertura Ativa",
      info: "20MB a 80MB • Suporte 24/7 • 150+ Clientes",
    },
    {
      name: "Eirunepé",
      status: "active",
      desc: "Cobertura Ativa",
      info: "20MB a 80MB • Internet Estável • Confiável",
    },
    {
      name: "Itamarati",
      status: "coming",
      desc: "Em Breve",
      info: "Previsão 2026 • Faça seu pré-cadastro",
    },
    {
      name: "Carauari",
      status: "coming",
      desc: "Em Breve",
      info: "Previsão 2026 • Faça seu pré-cadastro",
    },
  ]

  // URL do OpenStreetMap mostrando a região do Amazonas com as 4 cidades
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
          {/* Mapa OpenStreetMap */}
          <div className="relative w-full h-[450px] md:h-[550px]">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0"
              style={{ 
                filter: "hue-rotate(180deg) invert(92%) contrast(1.1) saturate(0.8)",
              }}
              title="Mapa de Cobertura Ondeline"
              loading="lazy"
            />
            
            {/* Overlay para melhor contraste */}
            <div className="absolute inset-0 bg-slate-900/30 pointer-events-none" />
            
            {/* Marcadores customizados sobre o mapa */}
            <div className="absolute inset-0">
              {/* Ipixuna - coordenadas: -7.05, -71.69 (sudoeste do mapa) */}
              <div 
                className="absolute pointer-events-auto cursor-pointer group"
                style={{ left: "22%", top: "72%" }}
                onClick={() => setSelectedCity(selectedCity === "Ipixuna" ? null : "Ipixuna")}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                    <Wifi size={12} className="text-white" />
                  </div>
                  <div className="mt-1 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Ipixuna
                  </div>
                  {selectedCity === "Ipixuna" && (
                    <div className="absolute top-14 bg-slate-800 border border-emerald-500/50 rounded-lg p-3 min-w-[200px] z-20 shadow-xl">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                        <CheckCircle2 size={16} />
                        Cobertura Ativa
                      </div>
                      <p className="text-slate-300 text-sm">20MB a 80MB • Suporte 24/7</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Eirunepé - coordenadas: -6.66, -69.87 (centro-oeste) */}
              <div 
                className="absolute pointer-events-auto cursor-pointer group"
                style={{ left: "45%", top: "60%" }}
                onClick={() => setSelectedCity(selectedCity === "Eirunepé" ? null : "Eirunepé")}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                    <Wifi size={12} className="text-white" />
                  </div>
                  <div className="mt-1 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Eirunepé
                  </div>
                  {selectedCity === "Eirunepé" && (
                    <div className="absolute top-14 bg-slate-800 border border-emerald-500/50 rounded-lg p-3 min-w-[200px] z-20 shadow-xl">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                        <CheckCircle2 size={16} />
                        Cobertura Ativa
                      </div>
                      <p className="text-slate-300 text-sm">20MB a 80MB • Internet Estável</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Itamarati - coordenadas: -6.44, -68.25 (centro-leste) */}
              <div 
                className="absolute pointer-events-auto cursor-pointer group"
                style={{ left: "65%", top: "55%" }}
                onClick={() => setSelectedCity(selectedCity === "Itamarati" ? null : "Itamarati")}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute w-6 h-6 bg-amber-500 rounded-full animate-pulse opacity-75" />
                  <div className="w-6 h-6 bg-amber-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                    <Clock size={12} className="text-white" />
                  </div>
                  <div className="mt-1 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Itamarati
                  </div>
                  {selectedCity === "Itamarati" && (
                    <div className="absolute top-14 bg-slate-800 border border-amber-500/50 rounded-lg p-3 min-w-[200px] z-20 shadow-xl">
                      <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                        <Clock size={16} />
                        Em Breve
                      </div>
                      <p className="text-slate-300 text-sm">Previsão 2026 • Pré-cadastro aberto</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Carauari - coordenadas: -4.88, -66.90 (nordeste) */}
              <div 
                className="absolute pointer-events-auto cursor-pointer group"
                style={{ left: "82%", top: "28%" }}
                onClick={() => setSelectedCity(selectedCity === "Carauari" ? null : "Carauari")}
              >
                <div className="relative flex flex-col items-center">
                  <div className="absolute w-6 h-6 bg-amber-500 rounded-full animate-pulse opacity-75" />
                  <div className="w-6 h-6 bg-amber-500 rounded-full relative z-10 border-2 border-white shadow-lg flex items-center justify-center">
                    <Clock size={12} className="text-white" />
                  </div>
                  <div className="mt-1 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    Carauari
                  </div>
                  {selectedCity === "Carauari" && (
                    <div className="absolute top-14 bg-slate-800 border border-amber-500/50 rounded-lg p-3 min-w-[200px] z-20 shadow-xl">
                      <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                        <Clock size={16} />
                        Em Breve
                      </div>
                      <p className="text-slate-300 text-sm">Previsão 2026 • Pré-cadastro aberto</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Legenda no canto */}
            <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-sm rounded-lg p-4 border border-slate-700 shadow-xl">
              <h4 className="text-white font-bold text-sm mb-3">Legenda</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-slate-300 text-sm">Cobertura Ativa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-slate-300 text-sm">Em Breve</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {cities.map((city, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                city.status === "active"
                  ? "bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 border border-emerald-600/50 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                  : "bg-gradient-to-br from-amber-900/80 to-amber-800/80 border border-amber-600/50 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
              }`}
              onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
            >
              <div className="text-2xl mb-2">
                {city.status === "active" ? "✓" : "🔜"}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{city.name}</h3>
              <p
                className={`text-xs font-medium ${city.status === "active" ? "text-emerald-300" : "text-amber-300"}`}
              >
                {city.desc}
              </p>
            </div>
          ))}
        </div>

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
