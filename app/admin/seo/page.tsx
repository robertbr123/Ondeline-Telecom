"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, FileSearch, Globe2, Lightbulb, MapPin, Search, TriangleAlert } from "lucide-react"

const pages = [
  {
    path: "/",
    title: "Home",
    keyword: "internet fibra Amazonas",
    score: 92,
    status: "Forte",
    note: "Boa página comercial. Continuar alimentando prova social e planos.",
  },
  {
    path: "/coverage",
    title: "Cobertura",
    keyword: "cobertura internet fibra Amazonas",
    score: 94,
    status: "Forte",
    note: "Agora tem metadata, schema e consulta por cidade/bairro.",
  },
  {
    path: "/teste-velocidade",
    title: "Teste de Velocidade",
    keyword: "teste de velocidade internet",
    score: 90,
    status: "Forte",
    note: "Ferramenta útil com intenção de suporte e aquisição.",
  },
  {
    path: "/ipixuna",
    title: "Ipixuna",
    keyword: "internet em Ipixuna",
    score: 86,
    status: "Bom",
    note: "Pode ganhar lista de bairros atendidos e depoimentos locais.",
  },
  {
    path: "/eirunepe",
    title: "Eirunepé",
    keyword: "internet em Eirunepé",
    score: 86,
    status: "Bom",
    note: "Adicionar conteúdo local e perguntas frequentes por cidade.",
  },
  {
    path: "/itamarati",
    title: "Itamarati",
    keyword: "internet em Itamarati",
    score: 82,
    status: "Bom",
    note: "Reforçar cobertura por bairros e plano mais buscado.",
  },
  {
    path: "/carauari",
    title: "Carauari",
    keyword: "internet em Carauari",
    score: 78,
    status: "Atenção",
    note: "Página de pré-cadastro deve capturar demanda e previsão.",
  },
]

const contentIdeas = [
  "Internet fibra em Eirunepé: bairros atendidos e como contratar",
  "Qual plano de internet escolher para uma casa com 4 pessoas?",
  "Ping alto em jogos: causas e como melhorar no Wi-Fi",
  "Internet para empresas no interior do Amazonas: o que avaliar",
  "Como testar sua velocidade de internet corretamente",
  "Wi-Fi 6 vale a pena para casas no Vale do Juruá?",
]

const localKeywords = [
  "internet em Eirunepé",
  "internet fibra Ipixuna",
  "provedor de internet Itamarati AM",
  "internet Carauari pré-cadastro",
  "internet empresarial Eirunepé",
  "teste de velocidade Ondeline",
]

export default function AdminSEOPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim()
    if (!needle) return pages
    return pages.filter((page) => `${page.path} ${page.title} ${page.keyword}`.toLowerCase().includes(needle))
  }, [query])

  const average = Math.round(pages.reduce((sum, page) => sum + page.score, 0) / pages.length)
  const attention = pages.filter((page) => page.score < 80).length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">SEO & Conteúdo Local</h1>
              <p className="text-sm text-muted-foreground">Painel para priorizar páginas, keywords e conteúdo orgânico.</p>
            </div>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold">
              <Globe2 size={16} /> Ver sitemap
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <p className="text-sm text-muted-foreground">Saúde SEO média</p>
            <div className="mt-2 text-3xl font-bold text-emerald-600">{average}%</div>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <p className="text-sm text-muted-foreground">Páginas mapeadas</p>
            <div className="mt-2 text-3xl font-bold">{pages.length}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-5">
            <p className="text-sm text-muted-foreground">Precisam atenção</p>
            <div className="mt-2 text-3xl font-bold text-amber-600">{attention}</div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-white p-5">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <FileSearch size={18} className="text-primary" />
              <h2 className="font-semibold">Checklist por página</h2>
            </div>
            <label className="flex min-h-10 items-center gap-2 rounded-lg border border-border px-3">
              <Search size={16} className="text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar página ou keyword"
                className="bg-transparent text-sm outline-none"
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 pr-4">Página</th>
                  <th className="py-3 pr-4">Keyword principal</th>
                  <th className="py-3 pr-4">Score</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Próxima melhoria</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((page) => (
                  <tr key={page.path} className="border-b border-border/70">
                    <td className="py-4 pr-4">
                      <a href={page.path} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">{page.title}</a>
                      <div className="text-xs text-muted-foreground">{page.path}</div>
                    </td>
                    <td className="py-4 pr-4">{page.keyword}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full bg-muted px-3 py-1 font-semibold">{page.score}%</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${page.score >= 85 ? "bg-emerald-50 text-emerald-700" : page.score >= 80 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                        {page.score >= 80 ? <CheckCircle2 size={13} /> : <TriangleAlert size={13} />}
                        {page.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{page.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <h2 className="font-semibold">Keywords locais prioritárias</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {localKeywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-border bg-muted/40 px-3 py-2 text-sm">{keyword}</span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              <h2 className="font-semibold">Ideias de conteúdo para ranquear</h2>
            </div>
            <div className="space-y-2">
              {contentIdeas.map((idea) => (
                <div key={idea} className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm">{idea}</div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
