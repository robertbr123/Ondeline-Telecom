"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = "/admin"
      } else {
        setError(data.error || "Erro ao fazer login")
      }
    } catch {
      setError("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6f8", padding: 24, fontFamily: "var(--font-manrope, Manrope, sans-serif)" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Image src="/logo-ondeline.png" alt="Ondeline" width={160} height={42} style={{ height: 42, width: "auto", margin: "0 auto" }} />
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: 10, fontWeight: 500 }}>Painel de Administração</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e9ef", padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.3rem", color: "#111827", marginBottom: 24 }}>Entrar</h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelSt}>Usuário</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={inputSt}
              />
            </div>

            <div>
              <label style={labelSt}>Senha</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={inputSt}
              />
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: 4, padding: "12px", borderRadius: 12, background: loading ? "#9ca3af" : "#0fb8b3", color: "#fff", fontWeight: 700, fontSize: "1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background .15s" }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#9ca3af", marginTop: 20 }}>
          Acesse com suas credenciais de administrador
        </p>
      </div>
    </div>
  )
}

const labelSt: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }
const inputSt: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1.5px solid #e5e9ef", borderRadius: 10, fontSize: "0.95rem", fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box" }
