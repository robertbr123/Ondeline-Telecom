"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Icon } from "@/components/on2/Icon"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="on2" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f4f6f8" }}>
      <nav className="on2-nav" style={{ position: "relative", boxShadow: "0 1px 0 #e5e9ef" }}>
        <div className="on2-shell on2-nav-inner">
          <Link href="/" className="on2-nav-logo" style={{ textDecoration: "none" }}>
            <img src="/logo-ondeline.png" alt="Ondeline" style={{ height: 36, width: "auto" }} />
          </Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 24px" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(80px,18vw,140px)", fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, #0fb8b3, #0a8a86)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>
            404
          </div>

          <h1 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 700, color: "#111827", marginBottom: 12 }}>
            Página não encontrada
          </h1>
          <p style={{ color: "#4b5563", fontSize: "1.05rem", marginBottom: 40, lineHeight: 1.6 }}>
            O endereço que você acessou não existe ou foi movido. Tente voltar ao início ou veja nossas cidades atendidas.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 24 }}>
            <Link href="/" className="on2-btn on2-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Ir para o início <Icon name="arrow" size={16} />
            </Link>
            <Link href="/#cobertura" className="on2-btn on2-btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Ver cobertura <Icon name="arrow" size={16} />
            </Link>
          </div>

          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", color: "#0fb8b3", fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
          >
            ← Voltar à página anterior
          </button>
        </div>
      </div>
    </div>
  )
}
