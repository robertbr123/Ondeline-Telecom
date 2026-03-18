"use client"

import React, { useState, useCallback, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Download, Upload, Activity, Gauge, Play, RotateCcw, Wifi } from "lucide-react"

type TestPhase = "idle" | "download" | "upload" | "ping" | "complete"

interface SpeedResult {
  download: number // Mbps
  upload: number // Mbps
  ping: number // ms
  jitter: number // ms
}

function formatSpeed(mbps: number): string {
  if (mbps >= 1000) return `${(mbps / 1000).toFixed(1)} Gbps`
  if (mbps >= 100) return mbps.toFixed(0)
  if (mbps >= 10) return mbps.toFixed(1)
  return mbps.toFixed(2)
}

function SpeedGauge({ value, max, label, icon: Icon, color }: {
  value: number
  max: number
  label: string
  icon: React.ElementType
  color: string
}) {
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 160 160">
          {/* Background arc */}
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="currentColor"
            className="text-gray-700/30 dark:text-gray-700/30"
            strokeWidth="8"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke={`url(#gradient-${label})`}
            strokeWidth="8"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color === "cyan" ? "#06b6d4" : color === "emerald" ? "#10b981" : "#8b5cf6"} />
              <stop offset="100%" stopColor={color === "cyan" ? "#0ea5e9" : color === "emerald" ? "#34d399" : "#a78bfa"} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-5 h-5 mb-1 ${color === "cyan" ? "text-cyan-400" : color === "emerald" ? "text-emerald-400" : "text-violet-400"}`} />
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatSpeed(value)}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Mbps</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  )
}

export default function SpeedTestPage() {
  const [phase, setPhase] = useState<TestPhase>("idle")
  const [result, setResult] = useState<SpeedResult>({ download: 0, upload: 0, ping: 0, jitter: 0 })
  const [progress, setProgress] = useState(0)
  const [liveSpeed, setLiveSpeed] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const measurePing = useCallback(async (signal: AbortSignal): Promise<{ ping: number; jitter: number }> => {
    const pings: number[] = []
    for (let i = 0; i < 10; i++) {
      if (signal.aborted) break
      const start = performance.now()
      await fetch(`/api/speedtest?size=1&t=${Date.now()}`, { signal, cache: "no-store" })
      const end = performance.now()
      pings.push(end - start)
      setProgress((i + 1) * 10)
    }
    const avg = pings.reduce((a, b) => a + b, 0) / pings.length
    const jitter = pings.length > 1
      ? pings.reduce((sum, p) => sum + Math.abs(p - avg), 0) / pings.length
      : 0
    return { ping: Math.round(avg), jitter: Math.round(jitter * 10) / 10 }
  }, [])

  const measureDownload = useCallback(async (signal: AbortSignal): Promise<number> => {
    const sizes = [256 * 1024, 1024 * 1024, 2 * 1024 * 1024, 4 * 1024 * 1024]
    const speeds: number[] = []

    for (let i = 0; i < sizes.length; i++) {
      if (signal.aborted) break
      const size = sizes[i]
      const start = performance.now()
      const res = await fetch(`/api/speedtest?size=${size}&t=${Date.now()}`, { signal, cache: "no-store" })
      await res.arrayBuffer()
      const end = performance.now()

      const durationSec = (end - start) / 1000
      const mbps = (size * 8) / (durationSec * 1000000)
      speeds.push(mbps)
      setLiveSpeed(mbps)
      setProgress(((i + 1) / sizes.length) * 100)
    }

    // Use the average of the last 2 measurements (most accurate after warmup)
    const relevantSpeeds = speeds.slice(-2)
    return relevantSpeeds.reduce((a, b) => a + b, 0) / relevantSpeeds.length
  }, [])

  const measureUpload = useCallback(async (signal: AbortSignal): Promise<number> => {
    const sizes = [256 * 1024, 512 * 1024, 1024 * 1024, 2 * 1024 * 1024]
    const speeds: number[] = []

    for (let i = 0; i < sizes.length; i++) {
      if (signal.aborted) break
      const size = sizes[i]
      const data = new Uint8Array(size)

      const start = performance.now()
      await fetch("/api/speedtest", {
        method: "POST",
        body: data,
        signal,
        headers: { "Content-Type": "application/octet-stream" },
      })
      const end = performance.now()

      const durationSec = (end - start) / 1000
      const mbps = (size * 8) / (durationSec * 1000000)
      speeds.push(mbps)
      setLiveSpeed(mbps)
      setProgress(((i + 1) / sizes.length) * 100)
    }

    const relevantSpeeds = speeds.slice(-2)
    return relevantSpeeds.reduce((a, b) => a + b, 0) / relevantSpeeds.length
  }, [])

  const runTest = useCallback(async () => {
    const controller = new AbortController()
    abortRef.current = controller
    const signal = controller.signal

    setResult({ download: 0, upload: 0, ping: 0, jitter: 0 })

    try {
      // Phase 1: Ping
      setPhase("ping")
      setProgress(0)
      const { ping, jitter } = await measurePing(signal)
      setResult(prev => ({ ...prev, ping, jitter }))

      // Phase 2: Download
      setPhase("download")
      setProgress(0)
      setLiveSpeed(0)
      const download = await measureDownload(signal)
      setResult(prev => ({ ...prev, download }))

      // Phase 3: Upload
      setPhase("upload")
      setProgress(0)
      setLiveSpeed(0)
      const upload = await measureUpload(signal)
      setResult(prev => ({ ...prev, upload }))

      setPhase("complete")
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Speed test error:", err)
      }
      setPhase("idle")
    }
  }, [measurePing, measureDownload, measureUpload])

  const reset = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
    setPhase("idle")
    setResult({ download: 0, upload: 0, ping: 0, jitter: 0 })
    setProgress(0)
    setLiveSpeed(0)
  }, [])

  const isRunning = phase !== "idle" && phase !== "complete"

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Teste de Velocidade</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Teste sua conexão
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Verifique a velocidade real da sua internet com nosso teste integrado.
              Medimos download, upload e latência.
            </p>
          </div>

          {/* Main Card */}
          <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden">
            {/* Animated top border */}
            {isRunning && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="p-8 sm:p-12">
              {/* Phase indicator */}
              {isRunning && (
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Activity className="w-4 h-4 animate-pulse text-cyan-500" />
                    <span>
                      {phase === "ping" && "Medindo latência..."}
                      {phase === "download" && "Testando download..."}
                      {phase === "upload" && "Testando upload..."}
                    </span>
                  </div>
                  {(phase === "download" || phase === "upload") && liveSpeed > 0 && (
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {formatSpeed(liveSpeed)} <span className="text-lg text-gray-500 dark:text-gray-400">Mbps</span>
                    </div>
                  )}
                </div>
              )}

              {/* Gauges */}
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8">
                <SpeedGauge
                  value={result.download}
                  max={200}
                  label="Download"
                  icon={Download}
                  color="cyan"
                />
                <SpeedGauge
                  value={result.upload}
                  max={100}
                  label="Upload"
                  icon={Upload}
                  color="emerald"
                />
              </div>

              {/* Ping & Jitter */}
              <div className="flex justify-center gap-8 sm:gap-16 mb-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.ping}<span className="text-sm text-gray-500 dark:text-gray-400 ml-1">ms</span></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ping</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.jitter}<span className="text-sm text-gray-500 dark:text-gray-400 ml-1">ms</span></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jitter</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                {phase === "idle" && (
                  <button
                    onClick={runTest}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar Teste
                  </button>
                )}
                {phase === "complete" && (
                  <button
                    onClick={reset}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Testar Novamente
                  </button>
                )}
                {isRunning && (
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5">
              <Download className="w-5 h-5 text-cyan-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Download</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Velocidade de recebimento de dados. Importante para streaming, downloads e navegação.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5">
              <Upload className="w-5 h-5 text-emerald-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Upload</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Velocidade de envio de dados. Essencial para videochamadas, envio de arquivos e lives.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5">
              <Wifi className="w-5 h-5 text-violet-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Ping / Latência</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tempo de resposta da conexão. Quanto menor, melhor para jogos online e chamadas.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
