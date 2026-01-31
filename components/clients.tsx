"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useClients } from "@/hooks/useAPI"
import { Skeleton } from "@/components/ui/skeleton"

interface Client {
  id: string
  name: string
  logo: string
  bg_color?: string
  bgColor?: string
  order: number
  active: boolean
}

export function Clients() {
  const [isClient, setIsClient] = useState(false)
  const { data: clients, loading, error } = useClients()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 border-y border-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="flex gap-8 justify-center">
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} className="w-48 h-32" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || !clients || clients.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Confiado por Grandes Empresas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de {clients.length} empresas e instituições importantes já confiam na Ondeline
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

          {isClient && (
            <div className="flex">
              <div className="carousel-container flex gap-8">
                {[...clients, ...clients].map((client: Client, idx) => {
                  const bgColor = client.bg_color || client.bgColor || 'bg-white'
                  return (
                    <div
                      key={idx}
                      className={`flex-shrink-0 w-48 h-32 rounded-lg ${bgColor} border border-border flex items-center justify-center hover:border-primary/50 transition group cursor-pointer p-4`}
                    >
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <div className="relative w-full h-16 mb-2 flex items-center justify-center">
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={120}
                            height={60}
                            className="object-contain max-h-14 group-hover:scale-105 transition"
                            unoptimized
                          />
                        </div>
                        <div className="font-medium text-gray-700 text-xs">{client.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">E muitas outras empresas e instituições da região</p>
        </div>
      </div>
    </section>
  )
}
