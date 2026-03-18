"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wifi, Zap, Award, Users } from "lucide-react"
import Image from "next/image"
import { useSiteConfig } from "@/lib/site-config-context"

// ── Background city images with crossfade ──────────────────────────
const CITY_IMAGES = [
  { src: "/carauri.jpg", alt: "Carauari - Amazonas" },
  { src: "/itamarati.jpg", alt: "Itamarati - Amazonas" },
  { src: "/eirunepe.jpg", alt: "Eirunepé - Amazonas" },
  { src: "/ipixuna-2.jpg", alt: "Ipixuna - Amazonas" },
]

function CitySlideshow({ current }: { current: number }) {
  return (
    <div className="absolute inset-0">
      {CITY_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: current === idx ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Dark overlay over photos */}
      <div className="absolute inset-0 dark:bg-slate-950/75 bg-slate-900/50" />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950" />
    </div>
  )
}

// ── Animated fiber network overlay ──────────────────────────────────
const FIBER_NODES = Array.from({ length: 20 }, (_, i) => ({
  x: ((i * 37 + 13) % 100),
  y: ((i * 53 + 7) % 100),
  size: 2 + ((i * 7) % 4),
  delay: ((i * 11) % 50) / 10,
  duration: 3 + ((i * 13) % 40) / 10,
}))

const FIBER_CONNECTIONS = Array.from({ length: 15 }, (_, i) => ({
  x1: FIBER_NODES[i % 20].x,
  y1: FIBER_NODES[i % 20].y,
  x2: FIBER_NODES[(i * 3 + 7) % 20].x,
  y2: FIBER_NODES[(i * 3 + 7) % 20].y,
  delay: ((i * 7) % 30) / 10,
}))

function FiberNetwork() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fiber connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {FIBER_CONNECTIONS.map((c, i) => (
          <line
            key={i}
            x1={`${c.x1}%`}
            y1={`${c.y1}%`}
            x2={`${c.x2}%`}
            y2={`${c.y2}%`}
            stroke={i % 3 === 0 ? "rgba(6, 182, 212, 0.2)" : i % 3 === 1 ? "rgba(59, 130, 246, 0.15)" : "rgba(16, 185, 129, 0.12)"}
            strokeWidth="1"
            className="fiber-line"
            style={{ animationDelay: `${c.delay}s` }}
          />
        ))}
      </svg>

      {/* Glowing nodes */}
      {FIBER_NODES.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${node.size}px`,
            height: `${node.size}px`,
            left: `${node.x}%`,
            top: `${node.y}%`,
            background: i % 3 === 0
              ? "rgba(6, 182, 212, 0.8)"
              : i % 3 === 1
              ? "rgba(59, 130, 246, 0.7)"
              : "rgba(16, 185, 129, 0.7)",
            boxShadow: i % 3 === 0
              ? "0 0 8px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.2)"
              : i % 3 === 1
              ? "0 0 8px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.15)"
              : "0 0 8px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.15)",
            animation: `float ${node.duration}s ease-in-out ${node.delay}s infinite`,
          }}
        />
      ))}

      {/* Traveling light pulse along fibers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`pulse-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${FIBER_NODES[i * 4].x}%`,
            top: `${FIBER_NODES[i * 4].y}%`,
            background: "rgba(6, 182, 212, 1)",
            boxShadow: "0 0 12px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.4)",
            animation: `fiberPulseTravel ${4 + i}s ease-in-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Typewriter effect for rotating words ────────────────────────────
const ROTATING_WORDS = ["Conectada", "Tecnologia", "Velocidade", "Futuro", "Inovação"]

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2500)
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
        return
      }
      const timer = setTimeout(() => {
        setText(text.slice(0, -1))
      }, 40)
      return () => clearTimeout(timer)
    }

    if (text === currentWord) {
      setIsPaused(true)
      return
    }

    const timer = setTimeout(() => {
      setText(currentWord.slice(0, text.length + 1))
    }, 80)
    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, isPaused])

  return (
    <span className="text-shimmer inline-block min-w-[4ch]">
      {text}
      <span className="inline-block w-[3px] h-[0.85em] bg-cyan-400 ml-1 align-middle animate-blink" />
    </span>
  )
}

// ── Animated counter ────────────────────────────────────────────────
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
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-cyan-400 stat-glow">
      {count === 0 && !started.current ? "0" : count}
      {suffix}
    </div>
  )
}

// ── Main Hero ───────────────────────────────────────────────────────
export function Hero() {
  const { config } = useSiteConfig()
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [slideIndex, setSlideIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % CITY_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: City photos slideshow */}
      <CitySlideshow current={slideIndex} />

      {/* Layer 2: Animated fiber network */}
      <FiberNetwork />

      {/* Layer 3: Radial glow following mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(6, 182, 212, 0.08), transparent 60%)`,
        }}
      />

      {/* Layer 4: Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(2, 6, 23, 0.5) 100%)"
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8 pt-24 pb-16">
        {/* Glassmorphism Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card glow-pulse animate-float">
          <Wifi size={16} className="text-cyan-400" />
          <span className="text-cyan-300 font-medium text-sm">
            {config.heroBadge || "Fibra Óptica no Coração da Floresta"}
          </span>
        </div>

        {/* Main Heading with Typewriter */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              {config.heroTitle || "Ondeline"}
            </span>
            <br />
            <TypewriterText />
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {config.heroSubtitle || "Internet de alta velocidade por fibra óptica para Ipixuna e Eirunepé. Em breve: Itamarati e Carauari. O suporte mais rápido da região!"}
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
            className="h-14 px-10 text-lg border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
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
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t dark:from-slate-950 from-white to-transparent" />

      {/* Slide indicators */}
      <SlideIndicators current={slideIndex} />
    </section>
  )
}

// ── Slide indicators ────────────────────────────────────────────────
function SlideIndicators({ current }: { current: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {CITY_IMAGES.map((_, idx) => (
        <div
          key={idx}
          className={`h-1 rounded-full transition-all duration-500 ${
            current === idx
              ? "w-8 bg-cyan-400"
              : "w-2 bg-white/30"
          }`}
        />
      ))}
    </div>
  )
}
