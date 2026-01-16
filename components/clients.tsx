"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Clients() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const clients = [
    { 
      name: "Bradesco", 
      logo: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/412265266_744572124373375_4671948206819075660_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=F6tNzh_K9twQ7kNvwGPJzRT&_nc_oc=Adk4SH-mG7wwdTAAvZOb_Xv9DOHC-xa-hpYPU5jlvHIqh2qwqJx2bLvzr5-JfqPk3vg&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=63w5xFAPmuLfb6Wmj84BvA&oh=00_Afp_AVicUuH6_aPk4qEy8ihXOdZ0N7ipdtp01Kx4FxFcKQ&oe=69704723",
      bgColor: "bg-white"
    },
    { 
      name: "Correios", 
      logo: "https://static.ndmais.com.br/2014/05/06-05-2014-21-21-40-nova-marca.jpg",
      bgColor: "bg-white"
    },
    { 
      name: "CETAM", 
      logo: "https://www.cetam.am.gov.br/wp-content/uploads/2023/03/Logo-CETAM.png",
      bgColor: "bg-white"
    },
    { 
      name: "Prefeitura de Ipixuna", 
      logo: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/472245549_1026396992867064_8301775409847835316_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=K1SxIXuAcYYQ7kNvwFB7xgg&_nc_oc=AdkpPKszVi8UCFo9eC37aucUeBpThQNwNw_F0HXrnWI2tolZyH7HCpVuiCKeIxvEsFA&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=nrkEz9s4TDgnYnuSPqIw8A&oh=00_AfokYRLkUk7y8QSBS0OjYzIznyJwDwuXL-V2pzn-NetJAw&oe=697066DF",
      bgColor: "bg-white"
    },
    { 
      name: "Prefeitura de Eirunepé", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Bandeira_de_Eirunep%C3%A9.png/120px-Bandeira_de_Eirunep%C3%A9.png",
      bgColor: "bg-white"
    },
    { 
      name: "Caixa Econômica", 
      logo: "hhttps://images.seeklogo.com/logo-png/2/1/caixa-economica-federal-logo-png_seeklogo-24768.png",
      bgColor: "bg-white"
    },
  ]

  return (
    <section className="py-20 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Confiado por Grandes Empresas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 20 empresas e instituições importantes já confiam na Ondeline
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
                    className={`flex-shrink-0 w-48 h-32 rounded-lg ${client.bgColor} border border-border flex items-center justify-center hover:border-primary/50 transition group cursor-pointer p-4`}
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
                ))}
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
