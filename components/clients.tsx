"use client"

import { useState, useEffect } from "react"

export function Clients() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const clients = [
    { name: "Bradesco", color: "from-red-600 to-red-700" },
    { name: "Correios", color: "from-yellow-600 to-yellow-700" },
    { name: "CETAM", color: "from-blue-600 to-blue-700" },
    { name: "Tech Solutions", color: "from-purple-600 to-purple-700" },
  ]

  return (
    <section className="py-20 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Confiado por Grandes Empresas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 20 empresas importantes já confiam na Ondeline
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

          {isClient && (
            <div className="flex">
              <div className="carousel-container flex gap-8">
                {[...clients, ...clients].map((client, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-48 h-32 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/50 transition group cursor-pointer"
                  >
                    <div className="text-center">
                      <div
                        className={`h-12 w-12 rounded-lg bg-gradient-to-br ${client.color} mx-auto mb-3 group-hover:scale-110 transition`}
                      ></div>
                      <div className="font-bold text-foreground text-sm">{client.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">E muitas outras empresas da região</p>
        </div>
      </div>
    </section>
  )
}
