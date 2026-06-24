# Detector Ondeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma página oculta `/detector`, estilo Downdetector com a marca Ondeline, que verifica em tempo real (HTTP) o status dos principais serviços (Instagram, Netflix, Vivo, Nubank…), mostra logo + status + uptime% + mini-gráfico, e gera um PNG brandado pra postar.

**Architecture:** Next.js App Router. Uma API server-side (`/api/detector`) faz `fetch` em paralelo nos domínios públicos dos serviços, persiste cada checagem em Postgres (`external_status_checks`, auto-criada) e devolve status + histórico agregado. A página client consome essa API, agrupa por categoria e renderiza cards com logos via Clearbit. Um botão exporta um cartão brandado em PNG com `html-to-image`.

**Tech Stack:** Next.js 15 (App Router), React, Tailwind + shadcn, Postgres (`pg` via `lib/db`), lucide-react, html-to-image, Clearbit Logo API.

## Global Constraints

- Linguagem da UI: **português do Brasil**.
- Página **oculta**: `robots: noindex`, fora do menu e do `sitemap.ts`.
- **Não** quebrar `/status` nem a tabela `uptime_checks` existentes — usar tabela própria `external_status_checks`.
- Reaproveitar padrões existentes: `query()` e `pool` de `lib/db.ts`, `Header`/`Footer`, classes de status verde/amarelo/vermelho como em `app/status/page.tsx`.
- `next.config.mjs` já permite imagens remotas de qualquer host (`remotePatterns: '**'`, `unoptimized: true`) — Clearbit funciona sem mudança.
- Sem framework de testes no projeto → verificação por `npm run lint`, `npm run build` e checagem manual em runtime (porta 5008).
- Dev/start usam porta **5008**.
- Commits frequentes, mensagens em pt-BR, terminando com a linha `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

## File Structure

- `lib/detector-services.ts` — **Create.** Lista tipada de serviços + categorias (single source of truth).
- `app/api/detector/route.ts` — **Create.** Checagem HTTP + persistência + agregação (uptime/histórico) + cache 60s.
- `components/detector/status-sparkline.tsx` — **Create.** Mini-gráfico de barras a partir do histórico.
- `components/detector/service-card.tsx` — **Create.** Card de um serviço (logo Clearbit + status + uptime% + sparkline).
- `components/detector/export-card.tsx` — **Create.** Cartão brandado (off-screen) usado pra gerar o PNG.
- `app/detector/layout.tsx` — **Create.** Metadata `noindex`.
- `app/detector/page.tsx` — **Create.** Orquestra fetch, agrupa por categoria, render + botão "Gerar imagem".
- `package.json` — **Modify.** Adiciona dependência `html-to-image`.

---

### Task 1: Configuração dos serviços (`lib/detector-services.ts`)

**Files:**
- Create: `lib/detector-services.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `type DetectorCategory = 'Redes Sociais' | 'Streaming' | 'Bancos' | 'Operadoras' | 'Infraestrutura'`
  - `interface DetectorService { name: string; domain: string; category: DetectorCategory; checkUrl: string }`
  - `const DETECTOR_CATEGORIES: DetectorCategory[]` (ordem de exibição)
  - `const DETECTOR_SERVICES: DetectorService[]`
  - `function clearbitLogo(domain: string): string`

- [ ] **Step 1: Criar o arquivo com a lista de serviços**

```typescript
// lib/detector-services.ts
export type DetectorCategory =
  | 'Redes Sociais'
  | 'Streaming'
  | 'Bancos'
  | 'Operadoras'
  | 'Infraestrutura'

export interface DetectorService {
  name: string
  /** Domínio usado para o logo (Clearbit) e identificação. */
  domain: string
  category: DetectorCategory
  /** URL alvo da checagem HTTP. */
  checkUrl: string
}

/** Ordem em que as categorias aparecem na página. */
export const DETECTOR_CATEGORIES: DetectorCategory[] = [
  'Redes Sociais',
  'Streaming',
  'Bancos',
  'Operadoras',
  'Infraestrutura',
]

export const DETECTOR_SERVICES: DetectorService[] = [
  // Redes Sociais
  { name: 'Instagram', domain: 'instagram.com', category: 'Redes Sociais', checkUrl: 'https://www.instagram.com' },
  { name: 'Facebook', domain: 'facebook.com', category: 'Redes Sociais', checkUrl: 'https://www.facebook.com' },
  { name: 'WhatsApp', domain: 'whatsapp.com', category: 'Redes Sociais', checkUrl: 'https://www.whatsapp.com' },
  { name: 'YouTube', domain: 'youtube.com', category: 'Redes Sociais', checkUrl: 'https://www.youtube.com' },
  { name: 'X (Twitter)', domain: 'x.com', category: 'Redes Sociais', checkUrl: 'https://x.com' },
  { name: 'TikTok', domain: 'tiktok.com', category: 'Redes Sociais', checkUrl: 'https://www.tiktok.com' },

  // Streaming
  { name: 'Netflix', domain: 'netflix.com', category: 'Streaming', checkUrl: 'https://www.netflix.com' },
  { name: 'Disney+', domain: 'disneyplus.com', category: 'Streaming', checkUrl: 'https://www.disneyplus.com' },
  { name: 'Prime Video', domain: 'primevideo.com', category: 'Streaming', checkUrl: 'https://www.primevideo.com' },

  // Bancos
  { name: 'Nubank', domain: 'nubank.com.br', category: 'Bancos', checkUrl: 'https://nubank.com.br' },
  { name: 'Bradesco', domain: 'bradesco.com.br', category: 'Bancos', checkUrl: 'https://banco.bradesco' },
  { name: 'Itaú', domain: 'itau.com.br', category: 'Bancos', checkUrl: 'https://www.itau.com.br' },
  { name: 'Caixa', domain: 'caixa.gov.br', category: 'Bancos', checkUrl: 'https://www.caixa.gov.br' },

  // Operadoras
  { name: 'Vivo', domain: 'vivo.com.br', category: 'Operadoras', checkUrl: 'https://www.vivo.com.br' },
  { name: 'Claro', domain: 'claro.com.br', category: 'Operadoras', checkUrl: 'https://www.claro.com.br' },
  { name: 'TIM', domain: 'tim.com.br', category: 'Operadoras', checkUrl: 'https://www.tim.com.br' },

  // Infraestrutura
  { name: 'Cloudflare', domain: 'cloudflare.com', category: 'Infraestrutura', checkUrl: 'https://www.cloudflare.com' },
  { name: 'Google', domain: 'google.com', category: 'Infraestrutura', checkUrl: 'https://www.google.com' },
  { name: 'AWS', domain: 'aws.amazon.com', category: 'Infraestrutura', checkUrl: 'https://aws.amazon.com' },
]

/** URL do logo colorido via Clearbit, dimensionado. */
export function clearbitLogo(domain: string): string {
  return `https://logo.clearbit.com/${domain}?size=128`
}
```

- [ ] **Step 2: Validar lint/tipos**

Run: `npm run lint`
Expected: sem erros novos referentes a `lib/detector-services.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/detector-services.ts
git commit -m "feat(detector): lista de serviços e categorias do Detector Ondeline

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: API de checagem (`app/api/detector/route.ts`)

**Files:**
- Create: `app/api/detector/route.ts`

**Interfaces:**
- Consumes: `DETECTOR_SERVICES`, `DetectorService` de `lib/detector-services`; `query`, `pool` (default) de `lib/db`.
- Produces: endpoint `GET /api/detector` retornando:
  ```ts
  {
    success: boolean
    data: {
      overall: 'operational' | 'degraded' | 'down'
      lastUpdated: string // ISO
      services: Array<{
        name: string
        domain: string
        category: string
        status: 'operational' | 'degraded' | 'down'
        responseTime: number | null
        uptime: number            // % 0..100
        history: Array<{ status: 'operational' | 'degraded' | 'down'; responseTime: number | null }>
        lastCheck: string         // ISO
      }>
    }
  }
  ```

- [ ] **Step 1: Criar a rota com bootstrap de tabela, checagem, persistência e agregação**

```typescript
// app/api/detector/route.ts
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import pool from '@/lib/db'
import { apiLogger } from '@/lib/logger'
import { DETECTOR_SERVICES, type DetectorService } from '@/lib/detector-services'

export const dynamic = 'force-dynamic'

type Status = 'operational' | 'degraded' | 'down'

interface ServiceResult {
  name: string
  domain: string
  category: string
  status: Status
  responseTime: number | null
  lastCheck: string
}

const CACHE_TTL_MS = 60_000
let cache: { at: number; payload: any } | null = null
let tableReady = false

async function ensureTable(): Promise<void> {
  if (tableReady || !pool) return
  await query(`
    CREATE TABLE IF NOT EXISTS external_status_checks (
      id SERIAL PRIMARY KEY,
      service TEXT NOT NULL,
      status TEXT NOT NULL,
      response_time INTEGER,
      checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `).catch(() => {})
  await query(
    `CREATE INDEX IF NOT EXISTS idx_external_status_service_time
     ON external_status_checks (service, checked_at DESC)`
  ).catch(() => {})
  tableReady = true
}

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function checkService(svc: DetectorService): Promise<ServiceResult> {
  const start = Date.now()
  const base = {
    name: svc.name,
    domain: svc.domain,
    category: svc.category,
    lastCheck: new Date().toISOString(),
  }
  try {
    const res = await fetch(svc.checkUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': BROWSER_UA, Accept: 'text/html,*/*' },
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    })
    const elapsed = Date.now() - start
    // Respondeu: 2xx/3xx = ok; 4xx/5xx = degradado (site no ar mas com problema/bloqueio)
    const ok = res.status < 400
    const status: Status = ok ? (elapsed > 2500 ? 'degraded' : 'operational') : 'degraded'
    return { ...base, status, responseTime: elapsed }
  } catch {
    return { ...base, status: 'down', responseTime: null }
  }
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return NextResponse.json(cache.payload)
    }

    await ensureTable()

    const settled = await Promise.allSettled(DETECTOR_SERVICES.map(checkService))
    const results: ServiceResult[] = settled.map((s, i) =>
      s.status === 'fulfilled'
        ? s.value
        : {
            name: DETECTOR_SERVICES[i].name,
            domain: DETECTOR_SERVICES[i].domain,
            category: DETECTOR_SERVICES[i].category,
            status: 'down' as Status,
            responseTime: null,
            lastCheck: new Date().toISOString(),
          }
    )

    // Persistir checagens (best-effort)
    const now = new Date().toISOString()
    for (const r of results) {
      await query(
        `INSERT INTO external_status_checks (service, status, response_time, checked_at)
         VALUES ($1, $2, $3, $4)`,
        [r.name, r.status, r.responseTime, now]
      ).catch(() => {})
    }

    // Histórico das últimas 24h (para uptime% e sparkline)
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const hist = await query(
      `SELECT service, status, response_time, checked_at
       FROM external_status_checks
       WHERE checked_at >= $1
       ORDER BY checked_at ASC`,
      [since]
    ).catch(() => ({ rows: [] as any[] }))

    const byService: Record<string, { status: Status; responseTime: number | null }[]> = {}
    for (const row of hist.rows as any[]) {
      ;(byService[row.service] ||= []).push({
        status: row.status,
        responseTime: row.response_time,
      })
    }

    const services = results.map((r) => {
      const rows = byService[r.name] || [{ status: r.status, responseTime: r.responseTime }]
      const up = rows.filter((x) => x.status === 'operational').length
      const uptime = rows.length > 0 ? Math.round((up / rows.length) * 1000) / 10 : 100
      // Sparkline: últimos 24 pontos
      const history = rows.slice(-24).map((x) => ({ status: x.status, responseTime: x.responseTime }))
      return {
        name: r.name,
        domain: r.domain,
        category: r.category,
        status: r.status,
        responseTime: r.responseTime,
        uptime,
        history,
        lastCheck: r.lastCheck,
      }
    })

    const anyDown = services.some((s) => s.status === 'down')
    const allOperational = services.every((s) => s.status === 'operational')
    const overall: Status = anyDown ? 'down' : allOperational ? 'operational' : 'degraded'

    const payload = {
      success: true,
      data: { overall, lastUpdated: now, services },
    }
    cache = { at: Date.now(), payload }
    return NextResponse.json(payload)
  } catch (error) {
    apiLogger.error({ err: error }, 'Detector check failed')
    return NextResponse.json({ success: false, error: 'Falha ao verificar serviços' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: sem erros novos referentes a `app/api/detector/route.ts`.

- [ ] **Step 3: Verificação manual em runtime**

Run (em outro terminal): `npm run dev`
Run: `curl -s http://localhost:5008/api/detector | head -c 400`
Expected: JSON com `"success":true` e um array `services` contendo `Instagram`, `Netflix`, etc., cada um com `status`, `uptime`, `history`.

- [ ] **Step 4: Commit**

```bash
git add app/api/detector/route.ts
git commit -m "feat(detector): API de checagem HTTP, persistência e uptime dos serviços

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Componente sparkline (`components/detector/status-sparkline.tsx`)

**Files:**
- Create: `components/detector/status-sparkline.tsx`

**Interfaces:**
- Consumes: nada externo.
- Produces: `export function StatusSparkline({ history }: { history: Array<{ status: 'operational' | 'degraded' | 'down'; responseTime: number | null }> })`

- [ ] **Step 1: Criar o componente de barras**

```tsx
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
git add components/detector/status-sparkline.tsx
git commit -m "feat(detector): mini-gráfico (sparkline) de status

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Card de serviço (`components/detector/service-card.tsx`)

**Files:**
- Create: `components/detector/service-card.tsx`

**Interfaces:**
- Consumes: `clearbitLogo` de `lib/detector-services`; `StatusSparkline` de `components/detector/status-sparkline`; ícones `lucide-react`.
- Produces:
  - `interface DetectorServiceView { name; domain; category; status; responseTime; uptime; history; lastCheck }`
  - `export function ServiceCard({ service }: { service: DetectorServiceView })`

- [ ] **Step 1: Criar o card com logo (fallback de inicial), status e sparkline**

```tsx
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 3: Commit**

```bash
git add components/detector/service-card.tsx
git commit -m "feat(detector): card de serviço com logo, status e sparkline

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Layout oculto + página principal (`app/detector/`)

**Files:**
- Create: `app/detector/layout.tsx`
- Create: `app/detector/page.tsx`

**Interfaces:**
- Consumes: `Header`, `Footer`; `DETECTOR_CATEGORIES` de `lib/detector-services`; `ServiceCard`, `DetectorServiceView` de `components/detector/service-card`; `LogoOndeline` de `components/logo-ondeline`.
- Produces: rota `/detector`. (O botão "Gerar imagem" é adicionado na Task 6.)

- [ ] **Step 1: Criar o layout com metadata noindex**

```tsx
// app/detector/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Detector Ondeline | Status dos Serviços",
  description: "Monitor em tempo real dos principais serviços — por Ondeline Telecom.",
  robots: { index: false, follow: false },
}

export default function DetectorLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 2: Criar a página que busca a API e agrupa por categoria**

```tsx
// app/detector/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LogoOndeline } from "@/components/logo-ondeline"
import { Activity, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react"
import { DETECTOR_CATEGORIES } from "@/lib/detector-services"
import { ServiceCard, type DetectorServiceView } from "@/components/detector/service-card"

interface DetectorData {
  overall: "operational" | "degraded" | "down"
  lastUpdated: string
  services: DetectorServiceView[]
}

export default function DetectorPage() {
  const [data, setData] = useState<DetectorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch("/api/detector", { cache: "no-store" })
      const json = await res.json()
      if (json.success) {
        setData(json.data)
        setError(false)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => fetchData(), 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const problems = data?.services.filter((s) => s.status !== "operational").length ?? 0

  return (
    <main className="w-full min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho com marca */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <LogoOndeline size={48} />
              <span className="text-2xl font-bold text-primary">Detector Ondeline</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Está fora do ar? Status dos Serviços
            </h1>
            <p className="text-muted-foreground">
              Monitoramento em tempo real dos principais serviços
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <Activity className="w-8 h-8 text-primary animate-pulse mx-auto mb-4" />
              <p className="text-muted-foreground">Verificando serviços...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Não foi possível carregar o status agora.</p>
              <button
                onClick={() => fetchData(true)}
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              {/* Banner geral */}
              <div
                className={`rounded-2xl border p-6 mb-8 flex items-center justify-between ${
                  problems === 0
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {problems === 0 ? (
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-yellow-500" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {problems === 0
                        ? "Todos os serviços normais"
                        : `${problems} ${problems === 1 ? "serviço" : "serviços"} com instabilidade`}
                    </h2>
                    {data && (
                      <p className="text-sm text-muted-foreground">
                        Última verificação: {new Date(data.lastUpdated).toLocaleTimeString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => fetchData(true)}
                  disabled={refreshing}
                  className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                  title="Atualizar"
                >
                  <RefreshCw className={`w-5 h-5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Seções por categoria */}
              {DETECTOR_CATEGORIES.map((cat) => {
                const items = data?.services.filter((s) => s.category === cat) ?? []
                if (items.length === 0) return null
                return (
                  <div key={cat} className="mb-10">
                    <h2 className="text-lg font-bold text-foreground mb-4">{cat}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((s) => (
                        <ServiceCard key={s.name} service={s} />
                      ))}
                    </div>
                  </div>
                )
              })}

              <p className="text-center text-sm text-muted-foreground mt-8">
                Atualiza automaticamente a cada 60 segundos · por Ondeline Telecom
              </p>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 4: Verificação manual em runtime**

Run (se não estiver rodando): `npm run dev`
Abrir no navegador: `http://localhost:5008/detector`
Expected: cabeçalho com logo Ondeline, banner geral, seções (Redes Sociais, Streaming, Bancos, Operadoras, Infraestrutura) com cards mostrando logos coloridos e status.

- [ ] **Step 5: Commit**

```bash
git add app/detector/layout.tsx app/detector/page.tsx
git commit -m "feat(detector): página /detector oculta, agrupada por categoria

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Cartão brandado + botão "Gerar imagem"

**Files:**
- Modify: `package.json` (adiciona `html-to-image`)
- Create: `components/detector/export-card.tsx`
- Modify: `app/detector/page.tsx` (botão + ref + handler de export)

**Interfaces:**
- Consumes: `html-to-image` (`toPng`); `DetectorData`/`DetectorServiceView`; `clearbitLogo`; `LogoOndeline`.
- Produces:
  - `export function ExportCard({ data, innerRef }: { data: DetectorExportData; innerRef: React.Ref<HTMLDivElement> })`
  - `interface DetectorExportData { overall; lastUpdated; services }`

- [ ] **Step 1: Instalar a dependência**

Run: `npm install html-to-image`
Expected: `html-to-image` adicionado em `package.json` / `package-lock.json`.

- [ ] **Step 2: Criar o cartão off-screen brandado (formato 1080x1350)**

```tsx
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
```

- [ ] **Step 3: Ligar o cartão e o botão na página**

Em `app/detector/page.tsx`, adicionar os imports (junto aos existentes):

```tsx
import { useRef } from "react"
import { toPng } from "html-to-image"
import { ExportCard } from "@/components/detector/export-card"
import { Download } from "lucide-react"
```

Logo após a linha `const [error, setError] = useState(false)`, adicionar:

```tsx
  const exportRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = useCallback(async () => {
    if (!exportRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 2 })
      const link = document.createElement("a")
      link.download = `detector-ondeline-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error("Falha ao gerar imagem:", e)
    } finally {
      setExporting(false)
    }
  }, [])
```

Dentro do bloco de sucesso (logo abaixo do banner geral, antes do `.map` de categorias), adicionar o botão:

```tsx
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  {exporting ? "Gerando..." : "Gerar imagem"}
                </button>
              </div>
```

E, ainda dentro do bloco de sucesso (depois do parágrafo final "Atualiza automaticamente..."), montar o cartão off-screen:

```tsx
              {data && (
                <ExportCard
                  ref={exportRef}
                  data={{
                    lastUpdated: data.lastUpdated,
                    services: data.services.map((s) => ({
                      name: s.name,
                      domain: s.domain,
                      status: s.status,
                    })),
                  }}
                />
              )}
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 5: Verificação manual em runtime**

Abrir `http://localhost:5008/detector`, clicar em **"Gerar imagem"**.
Expected: baixa um PNG `detector-ondeline-*.png` com logo Ondeline, cores escuras da marca, data e a grade de serviços com logos e status.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/detector/export-card.tsx app/detector/page.tsx
git commit -m "feat(detector): cartão brandado e botão Gerar imagem (PNG)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Verificação final (build)

**Files:** nenhum (validação).

- [ ] **Step 1: Build de produção**

Run: `npm run build`
Expected: build conclui sem erros; rota `/detector` e `/api/detector` aparecem na saída.

- [ ] **Step 2: Conferir que a página segue oculta**

Run: `grep -n "detector" app/sitemap.ts`
Expected: nenhuma ocorrência (não está no sitemap). Confirmar também que nenhum menu referencia `/detector`.

- [ ] **Step 3: Commit (se houver ajustes)**

```bash
git add -A
git commit -m "chore(detector): ajustes finais e verificação de build

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Verificação real HTTP → Task 2. ✓
- Card logo+status+uptime+sparkline → Tasks 3, 4. ✓
- Logos via API (Clearbit) com fallback → Task 1 (`clearbitLogo`) + Task 4 (`onError`). ✓
- Agrupamento por categoria → Task 1 + Task 5. ✓
- Botão "Gerar imagem" (PNG brandado) → Task 6. ✓
- Página oculta (noindex, fora do menu/sitemap) → Task 5 (layout noindex) + Task 7 (verificação sitemap). ✓
- Tabela própria `external_status_checks` auto-criada → Task 2. ✓
- Persistência + uptime + histórico (padrão `/api/status`) → Task 2. ✓
- Nova dependência html-to-image → Task 6. ✓

**Placeholder scan:** sem TBD/TODO; todo passo tem código ou comando concreto. ✓

**Type consistency:** `DetectorServiceView` definido na Task 4 e consumido na Task 5; `status` usa sempre `'operational' | 'degraded' | 'down'`; `history` é `{ status, responseTime }[]` em API (Task 2), sparkline (Task 3), card (Task 4); `clearbitLogo(domain)` consistente nas Tasks 1/4/6. ✓

**Nota sobre testes:** o projeto não possui runner de testes (apenas `lint`/`build`). A verificação é feita por `npm run lint`, `npm run build` e checagem manual em runtime na porta 5008 — coerente com o codebase.
