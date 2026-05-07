"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Icon } from "@/components/on2/Icon"

const WA = "5592984607721"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  video_url: string
  author: string
  category: string
  tags: string[]
  published: boolean
  views: number
  created_at: string
}

interface Comment {
  id: string
  post_id: string
  author_name: string
  content: string
  created_at: string
}

interface TOCItem { id: string; text: string; level: number }

function extractTOC(html: string): TOCItem[] {
  const re = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi
  const items: TOCItem[] = []
  let m
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").trim()
    const id = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
    items.push({ id, text, level: parseInt(m[1]) })
  }
  return items
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, text) => {
    const plain = text.replace(/<[^>]+>/g, "").trim()
    const id = plain.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`
  })
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [form, setForm] = useState({ name: "", email: "", content: "" })
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setPost(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))

    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setRelated((d.data || []).filter((p: BlogPost) => p.published && p.slug !== slug).slice(0, 3))
      })
      .catch(() => {})
  }, [slug])

  useEffect(() => {
    if (post?.id) {
      fetch(`/api/blog/comments?postId=${post.id}`)
        .then((r) => r.json())
        .then((d) => { if (d.success) setComments(d.data || []) })
        .catch(() => {})
    }
  }, [post?.id])

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!post || !form.name || !form.content) return
    setSubmitting(true)
    setMsg("")
    try {
      const r = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, authorName: form.name, authorEmail: form.email, content: form.content }),
      })
      const d = await r.json()
      setMsg(d.success ? "Comentário enviado! Será publicado após aprovação." : (d.error || "Erro ao enviar."))
      if (d.success) setForm({ name: "", email: "", content: "" })
    } catch {
      setMsg("Erro ao enviar comentário.")
    } finally {
      setSubmitting(false)
    }
  }

  function shareWA() {
    const text = post ? `Confira: *${post.title}*\n${window.location.href}` : window.location.href
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  const toc = useMemo(() => post ? extractTOC(post.content) : [], [post?.content])
  const processedContent = useMemo(() => post ? addIdsToHeadings(post.content) : "", [post?.content])

  const navBar = (
    <nav className="on2-nav" style={{ position: "relative" }}>
      <div className="on2-shell on2-nav-inner">
        <Link href="/" className="on2-nav-logo">
          <Image src="/logo-ondeline.png" alt="Ondeline" width={140} height={36} style={{ height: 36, width: "auto" }} />
        </Link>
        <div className="on2-nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/blog" className="on2-nav-link">← Blog</Link>
          <Link href={`https://wa.me/${WA}`} className="on2-nav-cta">Assine agora</Link>
        </div>
      </div>
    </nav>
  )

  const footerBar = (
    <footer className="on2-footer">
      <div className="on2-shell on2-footer-inner">
        <div className="on2-footer-logo">
          <Image src="/logo-ondeline.png" alt="Ondeline" width={120} height={32} style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)" }} />
        </div>
        <div className="on2-footer-copy">© 2023–2026 Ondeline Telecom · Vale do Juruá / AM</div>
      </div>
    </footer>
  )

  if (loading) {
    return (
      <div className="on2">
        {navBar}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #0fb8b3", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
        {footerBar}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="on2">
        {navBar}
        <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>😕</div>
          <h1 style={{ fontWeight: 800, color: "#111827", marginBottom: 12 }}>Post não encontrado</h1>
          <p style={{ color: "#4b5563", marginBottom: 24 }}>O post que você está procurando não existe ou foi removido.</p>
          <Link href="/blog" className="on2-btn on2-btn-primary">Ver todos os posts <Icon name="arrow" size={16} /></Link>
        </div>
        {footerBar}
      </div>
    )
  }

  return (
    <div className="on2">
      {navBar}

      {/* Cover */}
      {(post.video_url || post.cover_image) && (
        <div style={{ width: "100%", maxHeight: 420, overflow: "hidden" }}>
          {post.video_url
            ? <video src={post.video_url} controls style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />
            : <img src={post.cover_image} alt={post.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />
          }
        </div>
      )}

      <section style={{ background: "#f4f6f8", padding: "48px 0 0" }}>
        <div className="on2-shell" style={{ maxWidth: 760 }}>

          {/* Volta + categoria + compartilhar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <Link href="/blog" style={{ color: "#0fb8b3", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              ← Voltar ao Blog
            </Link>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {post.category && (
                <span style={{ background: "#e6fafa", color: "#0a8a86", fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{post.category}</span>
              )}
              <button onClick={shareWA} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "#22c55e", color: "#fff", border: "none", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Compartilhar
              </button>
            </div>
          </div>

          {/* Título */}
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, color: "#111827", lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h1>

          {/* Meta */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: "0.85rem", color: "#6b7280", marginBottom: 32, paddingBottom: 24, borderBottom: "1.5px solid #e5e9ef" }}>
            <span>🗓 {formatDate(post.created_at)}</span>
            <span>👁 {post.views} visualizações</span>
            <span>✍️ <strong style={{ color: "#374151" }}>{post.author}</strong></span>
          </div>

          {/* TOC */}
          {toc.length >= 3 && (
            <nav style={{ background: "#fff", border: "1.5px solid #e5e9ef", borderRadius: 14, padding: "20px 24px", marginBottom: 32 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Índice</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {toc.map((item) => (
                  <li key={item.id} style={{ paddingLeft: item.level === 3 ? 16 : 0 }}>
                    <a href={`#${item.id}`} style={{ color: "#0fb8b3", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p style={{ fontSize: "1.1rem", color: "#4b5563", fontStyle: "italic", borderLeft: "4px solid #0fb8b3", paddingLeft: 20, marginBottom: 32 }}>{post.excerpt}</p>
          )}

          {/* Conteúdo */}
          <div
            className="on2-blog-content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
            style={{ color: "#374151", lineHeight: 1.8, fontSize: "1rem" }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32, paddingTop: 24, borderTop: "1.5px solid #e5e9ef" }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{ background: "#f4f6f8", color: "#4b5563", fontSize: "0.82rem", padding: "4px 12px", borderRadius: 99 }}>#{tag}</span>
              ))}
            </div>
          )}

          {/* Comentários */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1.5px solid #e5e9ef" }}>
            <h3 style={{ fontWeight: 800, color: "#111827", fontSize: "1.2rem", marginBottom: 24 }}>💬 Comentários ({comments.length})</h3>

            <div style={{ background: "#fff", border: "1.5px solid #e5e9ef", borderRadius: 14, padding: 24, marginBottom: 28 }}>
              <form onSubmit={submitComment} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input required placeholder="Seu nome *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputSt} />
                  <input type="email" placeholder="Seu e-mail (opcional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputSt} />
                </div>
                <textarea required rows={3} maxLength={2000} placeholder="Escreva seu comentário... *" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ ...inputSt, resize: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{form.content.length}/2000</span>
                  <button type="submit" disabled={submitting || !form.name || !form.content} className="on2-btn on2-btn-primary" style={{ padding: "8px 20px" }}>
                    {submitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
                {msg && <p style={{ fontSize: "0.875rem", color: "#0a8a86" }}>{msg}</p>}
              </form>
            </div>

            {comments.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {comments.map((c) => (
                  <div key={c.id} style={{ background: "#fff", border: "1.5px solid #e5e9ef", borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem" }}>{c.author_name}</span>
                      <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{formatDate(c.created_at)}</span>
                    </div>
                    <p style={{ color: "#374151", fontSize: "0.9rem", margin: 0, whiteSpace: "pre-wrap" }}>{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>

          {/* Posts relacionados */}
          {related.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1.5px solid #e5e9ef", paddingBottom: 48 }}>
              <h3 style={{ fontWeight: 800, color: "#111827", fontSize: "1.2rem", marginBottom: 24 }}>Posts Relacionados</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ borderRadius: 12, overflow: "hidden", border: "1.5px solid #e5e9ef", background: "#fff", transition: "box-shadow .2s" }}>
                      {r.cover_image && <img src={r.cover_image} alt={r.title} style={{ width: "100%", height: 120, objectFit: "cover" }} />}
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: "0.875rem", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.title}</div>
                        <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: 6 }}>{formatDate(r.created_at)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {footerBar}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .on2-blog-content h2 { font-size: 1.5rem; font-weight: 800; color: #111827; margin: 32px 0 14px; }
        .on2-blog-content h3 { font-size: 1.2rem; font-weight: 700; color: #111827; margin: 24px 0 10px; }
        .on2-blog-content p { margin: 0 0 16px; }
        .on2-blog-content ul, .on2-blog-content ol { padding-left: 24px; margin: 0 0 16px; }
        .on2-blog-content li { margin-bottom: 6px; }
        .on2-blog-content a { color: #0fb8b3; }
        .on2-blog-content blockquote { border-left: 4px solid #0fb8b3; padding-left: 16px; color: #4b5563; font-style: italic; margin: 24px 0; }
        .on2-blog-content img { max-width: 100%; border-radius: 12px; margin: 16px 0; }
        .on2-blog-content pre { background: #1e2936; color: #e2e8f0; padding: 20px; border-radius: 12px; overflow-x: auto; margin: 24px 0; font-size: 0.875rem; }
        .on2-blog-content code { background: #f4f6f8; padding: 2px 6px; border-radius: 4px; font-size: 0.875em; }
        .on2-blog-content pre code { background: none; padding: 0; }
        @media (max-width: 600px) {
          .on2-blog-content h2 { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  )
}

const inputSt: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1.5px solid #e5e9ef", borderRadius: 10, fontSize: "0.9rem", fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box" }
