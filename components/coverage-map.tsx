"use client"

import { useState } from "react"

export function CoverageMap() {
  const [selectedCity, setSelectedCity] = useState(null)

  const cities = [
    {
      name: "Ipixuna",
      status: "active",
      desc: "Cobertura Ativa",
      x: 45,
      y: 55,
      info: "20MB a 80MB • Suporte 24/7 • 150+ Clientes",
    },
    {
      name: "Eirunepe",
      status: "active",
      desc: "Cobertura Ativa",
      x: 15,
      y: 75,
      info: "20MB a 80MB • Internet Estável • Confiável",
    },
    {
      name: "Itamarati",
      status: "coming",
      desc: "Em Breve",
      x: 70,
      y: 40,
      info: "Disponível em Breve • Reserve Já",
    },
    {
      name: "Carauari",
      status: "coming",
      desc: "Em Breve",
      x: 25,
      y: 50,
      info: "Disponível em Breve • Fique Ligado",
    },
  ]

  return (
    <section className="w-full py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Nossa Cobertura na Amazônia</h2>
          <p className="text-lg text-slate-400">Estamos em crescimento constante para melhor atender você</p>
        </div>

        {/* Mapa Interativo */}
        <div className="relative w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/20 p-8 mb-12 overflow-hidden">
          {/* Fundo do mapa estilizado */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          {/* SVG com rios, delimitações e linhas conectoras */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            <rect
              x="5%"
              y="20%"
              width="90%"
              height="70%"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              opacity="0.3"
              rx="20"
            />

            {/* Rio Solimões (principal) - da esquerda para direita */}
            <path
              d="M 10% 60% Q 30% 55%, 50% 58%, 80% 50%"
              stroke="url(#riverGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Rio Juruá - conectando Eirunepe */}
            <path
              d="M 15% 75% Q 25% 65%, 35% 58%"
              stroke="url(#riverGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Rio Jutaí - conectando Carauari */}
            <path
              d="M 25% 50% Q 35% 52%, 45% 55%"
              stroke="url(#riverGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Rio para Itamarati - curso nordeste */}
            <path
              d="M 50% 58% Q 60% 50%, 70% 40%"
              stroke="url(#riverGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            <line x1="45%" y1="55%" x2="15%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" />
            <line x1="45%" y1="55%" x2="70%" y2="40%" stroke="url(#lineGradient)" strokeWidth="2" />
            <line x1="45%" y1="55%" x2="25%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" />
          </svg>

          {/* Container relativo para os pontos */}
          <div className="relative w-full h-96">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className="absolute transition-all duration-300 cursor-pointer"
                style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
                onClick={() => setSelectedCity(selectedCity === idx ? null : idx)}
              >
                {/* Ponto do mapa */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    city.status === "active"
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 hover:scale-110 border-4 border-emerald-300"
                      : "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/50 hover:scale-110 border-4 border-orange-300"
                  } ${selectedCity === idx ? "scale-125 shadow-2xl" : ""}`}
                >
                  {city.status === "active" ? "✓" : "🔜"}
                </div>

                {/* Label da cidade */}
                <div className="text-center mt-3">
                  <p className="font-bold text-white text-lg">{city.name}</p>
                  <p
                    className={`text-xs font-semibold ${city.status === "active" ? "text-emerald-300" : "text-orange-300"}`}
                  >
                    {city.desc}
                  </p>
                </div>

                {/* Card de informações ao clicar */}
                {selectedCity === idx && (
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-48 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 rounded-xl p-4 shadow-2xl z-10 animate-in fade-in">
                    <p className="text-white font-semibold text-center mb-2">{city.name}</p>
                    <p className="text-cyan-300 text-xs text-center">{city.info}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-8 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-emerald-300"></div>
              <span className="text-white text-sm font-medium">Cobertura Ativa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-orange-300"></div>
              <span className="text-white text-sm font-medium">Em Breve</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded"></div>
              <span className="text-white text-sm font-medium">Rios Principais</span>
            </div>
          </div>
        </div>

        {/* Cards abaixo do mapa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((city, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                city.status === "active"
                  ? "bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-600 shadow-lg shadow-emerald-500/20"
                  : "bg-gradient-to-br from-orange-900 to-orange-800 border border-orange-600 shadow-lg shadow-orange-500/20"
              }`}
              onClick={() => setSelectedCity(selectedCity === idx ? null : idx)}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
              <p
                className={`text-sm font-semibold ${city.status === "active" ? "text-emerald-300" : "text-orange-300"}`}
              >
                {city.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
