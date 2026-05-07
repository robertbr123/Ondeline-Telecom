"use client"

import { useState, useEffect, useRef } from "react"

export function SpeedBanner() {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)
  const target = 987

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const dur = 2200
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const filled = Math.round(value / 1000 * 20)

  return (
    <section className="on2-sec" ref={ref}>
      <div className="on2-shell">
        <div className="on2-speed-banner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="on2-sec-lbl" style={{ background: "rgba(20,212,207,0.15)", color: "#14d4cf" }}>Performance ao vivo</span>
            <h2 style={{ marginTop: 16 }}>Quase <span>1 Gbps</span> no meio<br />da floresta.</h2>
            <p>Medição real da nossa estação em Eirunepé, testada contra CDN internacional. Fibra sem compressão, sem tráfego priorizado.</p>
            <div className="on2-speed-meta">
              <div className="cell"><div className="v">14ms</div><div className="k">Latência</div></div>
              <div className="cell"><div className="v">&lt; 2ms</div><div className="k">Jitter</div></div>
              <div className="cell"><div className="v">0,01%</div><div className="k">Perda</div></div>
            </div>
          </div>
          <div className="on2-speed-gauge">
            <div className="on2-speed-num">{value}</div>
            <div className="on2-speed-sub">MBPS · DOWNLOAD</div>
            <div className="on2-speed-dots">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className={"dot " + (i < filled ? "on" : "")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
