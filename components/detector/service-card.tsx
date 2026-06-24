// components/detector/service-card.tsx
"use client"

import { useState } from "react"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { clearbitLogo } from "@/lib/detector-services"
import { StatusSparkline } from "./status-sparkline"

export interface DetectorServiceView {
  name: string
  domain: string
  category: string
  status: "operational" | "degraded" | "down"
  responseTime: number | null
  uptime: number
  history: { status: "operational" | "degraded" | "down"; responseTime: number | null }[]
  lastCheck: string
}

const statusMeta = {
  operational: { label: "Operacional", color: "text-green-500", Icon: CheckCircle },
  degraded: { label: "Instável", color: "text-yellow-500", Icon: Clock },
  down: { label: "Fora do ar", color: "text-red-500", Icon: XCircle },
} as const

export function ServiceCard({ service }: { service: DetectorServiceView }) {
  const [logoError, setLogoError] = useState(false)
  const meta = statusMeta[service.status]
  const { Icon } = meta

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
          {logoError ? (
            <span className="text-lg font-bold text-gray-700">{service.name.charAt(0)}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={clearbitLogo(service.domain)}
              alt={service.name}
              width={44}
              height={44}
              className="object-contain w-10 h-10"
              onError={() => setLogoError(true)}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground truncate">{service.name}</h3>
          <div className={`flex items-center gap-1 text-sm ${meta.color}`}>
            <Icon className="w-4 h-4" />
            <span>{meta.label}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-foreground">{service.uptime}%</p>
          <p className="text-[11px] text-muted-foreground">uptime 24h</p>
        </div>
      </div>

      <div className="mt-4">
        <StatusSparkline history={service.history} />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{service.domain}</span>
        {service.responseTime !== null && <span>{service.responseTime}ms</span>}
      </div>
    </div>
  )
}
