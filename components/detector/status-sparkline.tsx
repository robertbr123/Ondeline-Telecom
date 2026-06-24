// components/detector/status-sparkline.tsx
"use client"

interface Point {
  status: "operational" | "degraded" | "down"
  responseTime: number | null
}

const barColor: Record<Point["status"], string> = {
  operational: "bg-green-500",
  degraded: "bg-yellow-500",
  down: "bg-red-500",
}

export function StatusSparkline({ history }: { history: Point[] }) {
  if (!history || history.length === 0) {
    return <div className="h-10 flex items-center text-xs text-muted-foreground">Sem histórico</div>
  }

  const times = history.map((p) => p.responseTime ?? 0)
  const max = Math.max(...times, 1)

  return (
    <div className="h-10 flex items-end gap-[2px]" aria-hidden>
      {history.map((p, i) => {
        // down = barra cheia vermelha; senão proporcional ao tempo de resposta
        const ratio = p.status === "down" ? 1 : Math.max(0.15, (p.responseTime ?? 0) / max)
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm ${barColor[p.status]}`}
            style={{ height: `${Math.round(ratio * 100)}%` }}
          />
        )
      })}
    </div>
  )
}
