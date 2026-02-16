"use client"

import React, { useEffect, useState } from "react"

export function SpeedAnimation() {
  const [activeSpeed, setActiveSpeed] = useState(0)
  const speeds = [
    { speed: "20MB", price: "R$ 100", color: "from-blue-500 to-blue-600" },
    { speed: "50MB", price: "R$ 130", color: "from-cyan-500 to-cyan-600" },
    { speed: "80MB", price: "R$ 150", color: "from-emerald-500 to-emerald-600" },
    { speed: "Custom", price: "Consultar", color: "from-purple-500 to-purple-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeed((prev) => (prev + 1) % speeds.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Velocidades que se Adaptam ao Seu Negócio
          </h2>
          <p className="text-lg text-slate-400">Escolha a velocidade perfeita para suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {speeds.map((item, idx) => (
            <div
              key={idx}
              className={`relative p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                activeSpeed === idx ? `bg-gradient-to-br ${item.color} shadow-2xl scale-105` : "bg-slate-800 scale-100"
              }`}
              onClick={() => setActiveSpeed(idx)}
            >
              <div className={`text-center ${activeSpeed === idx ? "text-white" : "text-slate-300"}`}>
                <div className="text-4xl font-bold mb-2">{item.speed}</div>
                <div className="text-2xl font-semibold">{item.price}</div>
                {activeSpeed === idx && <div className="mt-4 text-sm font-semibold animate-pulse">⚡ Selecionado</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
