"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wifi, Zap, Award, Users } from "lucide-react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold stat-glow dark:text-cyan-400 text-cyan-600">
      {count === 0 && !started.current ? "0" : count}
      {suffix}
    </div>
  )
}

// Pre-computed deterministic values to avoid hydration mismatch
const PARTICLE_DATA = Array.from({ length: 30 }, (_, i) => ({
  width: ((i * 7 + 3) % 30) / 10 + 1,
  height: ((i * 11 + 5) % 30) / 10 + 1,
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 3 + ((i * 17) % 40) / 10,
  delay: ((i * 23) % 30) / 10,
  opacity: 0.4 + ((i * 19) % 40) / 100,
}))

const LINE_DATA = Array.from({ length: 12 }, (_, i) => ({
  x1: 10 + ((i * 31 + 17) % 80),
  y1: 10 + ((i * 47 + 23) % 80),
  x2: 10 + ((i * 59 + 11) % 80),
  y2: 10 + ((i * 41 + 29) % 80),
}))

function FiberParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: i % 3 === 0
              ? "rgba(6, 182, 212, 0.6)"
              : i % 3 === 1
              ? "rgba(59, 130, 246, 0.5)"
              : "rgba(16, 185, 129, 0.5)",
            boxShadow: i % 3 === 0
              ? "0 0 6px rgba(6, 182, 212, 0.4)"
              : i % 3 === 1
              ? "0 0 6px rgba(59, 130, 246, 0.3)"
              : "0 0 6px rgba(16, 185, 129, 0.3)",
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: p.opacity,
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {LINE_DATA.map((l, i) => (
          <line
            key={i}
            x1={`${l.x1}%`}
            y1={`${l.y1}%`}
            x2={`${l.x2}%`}
            y2={`${l.y2}%`}
            stroke={i % 2 === 0 ? "rgba(6, 182, 212, 0.12)" : "rgba(16, 185, 129, 0.1)"}
            strokeWidth="1"
            className="fiber-line"
          />
        ))}
      </svg>
    </div>
  )
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-slate-950 bg-gradient-to-br from-cyan-50 to-blue-100"
    >
      {/* Aurora Boreal Background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Radial glow following mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(6, 182, 212, 0.06), transparent 60%)`,
        }}
      />

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-slate-950/50 dark:via-transparent dark:to-slate-950 bg-gradient-to-b from-white/30 via-transparent to-white/50" />

      {/* Fiber Particles */}
      <FiberParticles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8 pt-24 pb-16">
        {/* Glassmorphism Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card glow-pulse animate-float">
          <Wifi size={16} className="text-cyan-400" />
          <span className="dark:text-cyan-300 text-cyan-600 font-medium text-sm">
            Fibra Optica no Coração da Floresta
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="dark:text-white text-slate-900">A Amazônia</span>
            <br />
            <span className="text-shimmer">Conectada</span>
          </h1>

          <p className="text-lg md:text-xl dark:text-slate-400 text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A Ondeline leva internet de alta velocidade por fibra optica para
            Ipixuna e Eirunepe. Em breve: Itamarati e Carauari.
            O suporte mais rápido da região!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            asChild
            className="ripple-effect bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 h-14 px-10 text-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25 border-0 text-white"
          >
            <a href="#planos">
              Contratar Agora <ArrowRight size={20} className="ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 px-10 text-lg dark:border-cyan-500/30 border-cyan-500/50 dark:text-cyan-300 text-cyan-600 dark:hover:bg-cyan-500/10 hover:bg-cyan-500/10 bg-transparent transition-all hover:scale-105 active:scale-95"
          >
            <a href="#suporte">Saiba Mais</a>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { icon: Users, value: 700, suffix: "+", label: "Clientes Satisfeitos", color: "cyan" },
            { icon: Wifi, value: 24, suffix: "/7", label: "Suporte Ativo", color: "blue" },
            { icon: Award, value: 99, suffix: ".5%", label: "Disponibilidade", color: "emerald" },
            { icon: Zap, value: 4, suffix: " anos", label: "De Experiência", color: "purple" },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="group glass-card rounded-xl p-5 md:p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon
                  className={`w-7 h-7 mx-auto mb-3 ${
                    stat.color === "cyan"
                      ? "text-cyan-400"
                      : stat.color === "blue"
                      ? "text-blue-400"
                      : stat.color === "emerald"
                      ? "text-emerald-400"
                      : "text-purple-400"
                  }`}
                />
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
                <div className="text-sm dark:text-slate-400 text-slate-600 mt-2">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 dark:bg-gradient-to-t dark:from-slate-950 dark:to-transparent bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
