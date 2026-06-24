// components/detector/export-card.tsx
"use client"

import { forwardRef } from "react"
import { clearbitLogo } from "@/lib/detector-services"

export interface DetectorExportService {
  name: string
  domain: string
  status: "operational" | "degraded" | "down"
}

export interface DetectorExportData {
  lastUpdated: string
  services: DetectorExportService[]
}

const dot: Record<DetectorExportService["status"], string> = {
  operational: "#22c55e",
  degraded: "#eab308",
  down: "#ef4444",
}
const label: Record<DetectorExportService["status"], string> = {
  operational: "Operacional",
  degraded: "Instável",
  down: "Fora do ar",
}

export const ExportCard = forwardRef<HTMLDivElement, { data: DetectorExportData }>(
  function ExportCard({ data }, ref) {
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: -99999,
          top: 0,
          width: 1080,
          height: 1350,
          background: "linear-gradient(160deg, #0b1220 0%, #111c33 100%)",
          color: "#fff",
          padding: 56,
          fontFamily: "Inter, system-ui, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-ondeline.png" alt="Ondeline" width={64} height={64} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: 40, fontWeight: 800, color: "#38bdf8" }}>Detector Ondeline</span>
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 800, margin: "8px 0 4px" }}>Status dos Serviços</h1>
        <p style={{ fontSize: 24, color: "#94a3b8", marginBottom: 32 }}>
          Atualizado em {new Date(data.lastUpdated).toLocaleString("pt-BR")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {data.services.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={clearbitLogo(s.domain)} alt={s.name} width={40} height={40} style={{ objectFit: "contain" }} />
              </div>
              <span style={{ fontSize: 26, fontWeight: 700, flex: 1 }}>{s.name}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 20, color: "#cbd5e1" }}>
                <span style={{ width: 14, height: 14, borderRadius: 999, background: dot[s.status] }} />
                {label[s.status]}
              </span>
            </div>
          ))}
        </div>

        <p style={{ position: "absolute", bottom: 40, left: 56, fontSize: 22, color: "#64748b" }}>
          Ondeline Telecom · Internet de alta velocidade
        </p>
      </div>
    )
  }
)
