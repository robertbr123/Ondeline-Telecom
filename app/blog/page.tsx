"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LogoImg } from "@/components/on2/LogoImg"
import { Icon } from "@/components/on2/Icon"

const WA = "5592984607721"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  cover_image: string
  published: boolean
  views: number
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("Todos")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => { if (d.success) setArticles((d.data || []).filter((a: Article) => a.published)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ["Todos", ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))]
  const filtered = articles.filter((a) => {
    const okCat = category === "Todos" || a.category === category
    const okSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return okCat && okSearch
  })

  return (
    <div className="on2">
      {/* Nav */}
      <nav className="on2-nav" style={{ position: "relative" }}>
        <div className="on2-shell on2-nav-inner">
          <Link href="/" className="on2-nav-logo">
            <LogoImg height={36} />
          </Link>
          <div className="on2-nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/#planos" className="on2-nav-link">Planos</Link>
            <Link href={`https://wa.me/${WA}`} className="on2-nav-cta">Assine agora</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0fb8b3 0%, #0a8a86 100%)", padding: "64px 0 48px" }}>
        <div className="on2-shell" style={{ textAlign: "center" }}>
          <span className="on2-sec-lbl" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)" }}>Conteúdo</span>
          <h1 style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 800, color: "#fff", marginTop: 14, marginBottom: 14 }}>Blog Ondeline</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto" }}>
            Dicas, notícias e informações sobre internet de qualidade na Amazônia.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="on2-sec">
        <div className="on2-shell">

          {/* Busca */}
          <div style={{ position: "relative", maxWidth: 520, margin: "0 auto 28px" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1.5px solid #e5e9ef", borderRadius: 12, fontSize: "0.95rem", fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box" }}
            />
          </div>

          {/* Categorias */}
          {categories.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: "7px 18px", borderRadius: 99, border: "1.5px solid",
                    borderColor: category === cat ? "#0fb8b3" : "#e5e9ef",
                    background: category === cat ? "#0fb8b3" : "#fff",
                    color: category === cat ? "#fff" : "#4b5563",
                    fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div style={{ width: 36, height: 36, border: "3px solid #0fb8b3", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" }} />
              <p style={{ marginTop: 16, color: "#6b7280" }}>Carregando artigos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>📰</div>
              <p style={{ color: "#6b7280", fontSize: "1.05rem", marginBottom: 8 }}>Nenhum artigo encontrado.</p>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Volte em breve para novidades!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
              {filtered.map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
                  <div className="on2-why-card" style={{ padding: 0, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column", transition: "box-shadow .2s, transform .2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(15,184,179,0.12)" }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "" }}
                  >
                    {a.cover_image ? (
                      <img src={a.cover_image} alt={a.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg, #e6fafa, #b2f0ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>📰</div>
                    )}
                    <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      {a.category && (
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0a8a86", textTransform: "uppercase", letterSpacing: "0.06em" }}>{a.category}</span>
                      )}
                      <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "1rem", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</h3>
                      <p style={{ fontSize: "0.875rem", color: "#4b5563", margin: 0, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.excerpt}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#9ca3af", marginTop: 4 }}>
                        <span>👤 {a.author}</span>
                        <span>👁 {a.views}</span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>🗓 {formatDate(a.created_at)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="on2-footer">
        <div className="on2-shell on2-footer-inner">
          <div className="on2-footer-logo">
            <LogoImg height={32} filterInvert />
          </div>
          <div className="on2-footer-copy">© 2023–2026 Ondeline Telecom · Vale do Juruá / AM</div>
        </div>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
