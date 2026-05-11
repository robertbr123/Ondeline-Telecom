"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import { Activity, Download, Gauge, Play, RotateCcw, Send, Upload, Wifi } from "lucide-react"

type TestPhase = "idle" | "download" | "upload" | "ping" | "complete"

interface SpeedResult {
  download: number
  upload: number
  ping: number
  jitter: number
}

function formatSpeed(mbps: number) {
  if (!Number.isFinite(mbps) || mbps <= 0) return "0"
  if (mbps >= 1000) return `${(mbps / 1000).toFixed(1)} Gbps`
  if (mbps >= 100) return mbps.toFixed(0)
  if (mbps >= 10) return mbps.toFixed(1)
  return mbps.toFixed(2)
}

function phaseLabel(phase: TestPhase) {
  if (phase === "ping") return "Medindo latência"
  if (phase === "download") return "Testando download"
  if (phase === "upload") return "Testando upload"
  if (phase === "complete") return "Resultado final"
  return "Pronto para começar"
}

function SpeedDial({ value, label, icon: Icon, tone }: { value: number; label: string; icon: React.ElementType; tone: string }) {
  const percentage = Math.min((value / 1000) * 100, 100)
  return (
    <div className="on2-speed-dial">
      <div className="ring" style={{ "--p": `${percentage}%`, "--tone": tone } as React.CSSProperties}>
        <Icon size={22} />
        <strong>{formatSpeed(value)}</strong>
        <span>Mbps</span>
      </div>
      <p>{label}</p>
    </div>
  )
}

export function SpeedTestExperience({ whatsapp }: { whatsapp?: string }) {
  const [phase, setPhase] = useState<TestPhase>("idle")
  const [result, setResult] = useState<SpeedResult>({ download: 0, upload: 0, ping: 0, jitter: 0 })
  const [progress, setProgress] = useState(0)
  const [liveSpeed, setLiveSpeed] = useState(0)
  const abortRef = useRef<AbortController | null>(null)
  const wa = whatsapp || "5592984607721"
  const isRunning = phase !== "idle" && phase !== "complete"

  const measurePing = useCallback(async (signal: AbortSignal) => {
    const pings: number[] = []
    for (let i = 0; i < 8; i++) {
      if (signal.aborted) break
      const start = performance.now()
      await fetch(`/api/speedtest?size=1&t=${Date.now()}`, { signal, cache: "no-store" })
      pings.push(performance.now() - start)
      setProgress((i + 1) * 12.5)
    }
    const avg = pings.reduce((sum, ping) => sum + ping, 0) / Math.max(pings.length, 1)
    const jitter = pings.reduce((sum, ping) => sum + Math.abs(ping - avg), 0) / Math.max(pings.length, 1)
    return { ping: Math.round(avg), jitter: Math.round(jitter * 10) / 10 }
  }, [])

  const measureDownload = useCallback(async (signal: AbortSignal) => {
    const sizes = [256 * 1024, 1024 * 1024, 2 * 1024 * 1024, 4 * 1024 * 1024]
    const speeds: number[] = []
    for (let i = 0; i < sizes.length; i++) {
      if (signal.aborted) break
      const size = sizes[i]
      const start = performance.now()
      const response = await fetch(`/api/speedtest?size=${size}&t=${Date.now()}`, { signal, cache: "no-store" })
      await response.arrayBuffer()
      const mbps = (size * 8) / (((performance.now() - start) / 1000) * 1000000)
      speeds.push(mbps)
      setLiveSpeed(mbps)
      setProgress(((i + 1) / sizes.length) * 100)
    }
    const relevant = speeds.slice(-2)
    return relevant.reduce((sum, speed) => sum + speed, 0) / Math.max(relevant.length, 1)
  }, [])

  const measureUpload = useCallback(async (signal: AbortSignal) => {
    const sizes = [256 * 1024, 512 * 1024, 1024 * 1024, 2 * 1024 * 1024]
    const speeds: number[] = []
    for (let i = 0; i < sizes.length; i++) {
      if (signal.aborted) break
      const size = sizes[i]
      const start = performance.now()
      await fetch("/api/speedtest", {
        method: "POST",
        body: new Uint8Array(size),
        signal,
        headers: { "Content-Type": "application/octet-stream" },
      })
      const mbps = (size * 8) / (((performance.now() - start) / 1000) * 1000000)
      speeds.push(mbps)
      setLiveSpeed(mbps)
      setProgress(((i + 1) / sizes.length) * 100)
    }
    const relevant = speeds.slice(-2)
    return relevant.reduce((sum, speed) => sum + speed, 0) / Math.max(relevant.length, 1)
  }, [])

  const runTest = useCallback(async () => {
    const controller = new AbortController()
    abortRef.current = controller
    setResult({ download: 0, upload: 0, ping: 0, jitter: 0 })
    try {
      setPhase("ping")
      setProgress(0)
      const ping = await measurePing(controller.signal)
      setResult((prev) => ({ ...prev, ...ping }))

      setPhase("download")
      setProgress(0)
      setLiveSpeed(0)
      const download = await measureDownload(controller.signal)
      setResult((prev) => ({ ...prev, download }))

      setPhase("upload")
      setProgress(0)
      setLiveSpeed(0)
      const upload = await measureUpload(controller.signal)
      setResult((prev) => ({ ...prev, upload }))
      setPhase("complete")
    } catch (error) {
      if ((error as Error).name !== "AbortError") console.error("Speed test error:", error)
      setPhase("idle")
    }
  }, [measureDownload, measurePing, measureUpload])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setPhase("idle")
    setResult({ download: 0, upload: 0, ping: 0, jitter: 0 })
    setProgress(0)
    setLiveSpeed(0)
  }, [])

  const recommendation = useMemo(() => {
    if (result.download >= 700) return "Sua conexão está pronta para casa cheia, jogos, streaming 4K e trabalho pesado."
    if (result.download >= 300) return "Bom resultado para streaming, estudo, chamadas e vários aparelhos conectados."
    if (result.download > 0) return "Se esse resultado está abaixo do contratado, teste perto do roteador ou fale com o suporte."
    return "Rode o teste conectado ao Wi-Fi principal ou via cabo para comparar com seu plano."
  }, [result.download])

  const supportMessage = `Olá! Fiz o teste de velocidade no site da Ondeline. Resultado: download ${formatSpeed(result.download)} Mbps, upload ${formatSpeed(result.upload)} Mbps, ping ${result.ping} ms.`

  return (
    <>
      <section className="on2-page-hero on2-speed-hero">
        <div className="on2-shell on2-page-hero-grid">
          <div>
            <span className="on2-sec-lbl">Teste de velocidade</span>
            <h1>Meça sua conexão com uma ferramenta da própria Ondeline.</h1>
            <p>
              Confira download, upload, ping e jitter. Depois compare com seu plano ou envie o resultado direto para o suporte.
            </p>
            <div className="on2-page-actions">
              <button className="on2-btn on2-btn-primary" onClick={runTest} disabled={isRunning}>
                <Play size={18} /> Iniciar teste
              </button>
              <a className="on2-btn on2-btn-ghost" href={`https://wa.me/${wa}?text=${encodeURIComponent(supportMessage)}`} target="_blank" rel="noopener noreferrer">
                Enviar ao suporte
              </a>
            </div>
          </div>
          <div className="on2-speed-live">
            <span>{phaseLabel(phase)}</span>
            <strong>{isRunning ? formatSpeed(liveSpeed) : formatSpeed(result.download)}</strong>
            <p>{isRunning ? "Mbps em tempo real" : "Mbps download"}</p>
            <div className="bar"><i style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      </section>

      <section className="on2-speed-console">
        <div className="on2-shell">
          <div className="on2-speed-card">
            <div className="on2-speed-status">
              <Activity size={18} />
              <span>{phaseLabel(phase)}</span>
              {isRunning && <strong>{Math.round(progress)}%</strong>}
            </div>

            <div className="on2-speed-dials">
              <SpeedDial value={result.download} label="Download" icon={Download} tone="#0fb8b3" />
              <SpeedDial value={result.upload} label="Upload" icon={Upload} tone="#ff6b4a" />
            </div>

            <div className="on2-speed-minis">
              <div><strong>{result.ping}</strong><span>ms ping</span></div>
              <div><strong>{result.jitter}</strong><span>ms jitter</span></div>
              <div><strong>{result.download ? "OK" : "--"}</strong><span>diagnóstico</span></div>
            </div>

            <p className="on2-speed-advice">{recommendation}</p>

            <div className="on2-speed-actions">
              {(phase === "idle" || phase === "complete") ? (
                <button className="on2-btn on2-btn-primary" onClick={phase === "complete" ? reset : runTest}>
                  {phase === "complete" ? <RotateCcw size={18} /> : <Gauge size={18} />}
                  {phase === "complete" ? "Testar novamente" : "Começar agora"}
                </button>
              ) : (
                <button className="on2-btn on2-btn-ghost" onClick={reset}>Cancelar teste</button>
              )}
              <a className="on2-btn on2-btn-ghost" href={`https://wa.me/${wa}?text=${encodeURIComponent(supportMessage)}`} target="_blank" rel="noopener noreferrer">
                <Send size={18} /> Mandar resultado
              </a>
            </div>
          </div>

          <div className="on2-speed-info">
            <article><Download size={20} /><h3>Download</h3><p>Importante para assistir, baixar arquivos, navegar e usar redes sociais.</p></article>
            <article><Upload size={20} /><h3>Upload</h3><p>Essencial para videochamadas, enviar arquivos, lives e trabalho remoto.</p></article>
            <article><Wifi size={20} /><h3>Ping</h3><p>Quanto menor, melhor para jogos online, chamadas e respostas rápidas.</p></article>
          </div>
        </div>
      </section>
    </>
  )
}
