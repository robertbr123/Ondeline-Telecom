"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, User, Eye } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  content: string
  cover_image: string
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success) {
        // Filtrar apenas publicados
        const published = (data.data || []).filter((a: Article) => a.published)
        setArticles(published)
      }
    } catch (error) {
      console.error('Erro ao buscar artigos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const categories = ["Todos", ...new Set(articles.map((a) => a.category).filter(Boolean))]

  const filteredArticles =
    selectedCategory === "Todos" ? articles : articles.filter((a) => a.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-muted-foreground">Carregando artigos...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {selectedArticle ? (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition"
              >
                <ArrowLeft size={20} />
                Voltar ao Blog
              </button>

              <article>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-4">{selectedArticle.title}</h1>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {formatDate(selectedArticle.created_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {selectedArticle.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      {selectedArticle.views} visualizações
                    </div>
                    {selectedArticle.category && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {selectedArticle.category}
                      </span>
                    )}
                  </div>
                </div>

                {selectedArticle.cover_image && (
                  <img
                    src={selectedArticle.cover_image}
                    alt={selectedArticle.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                  />
                )}

                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="text-foreground text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {articles.filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category).length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Artigos Relacionados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {articles
                        .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                        .slice(0, 3)
                        .map((article) => (
                          <button
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            className="text-left hover:opacity-80 transition"
                          >
                            {article.cover_image && (
                              <img
                                src={article.cover_image}
                                alt={article.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                            )}
                            <h4 className="font-semibold text-foreground hover:text-primary transition">
                              {article.title}
                            </h4>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">Blog Ondeline</h1>
                <p className="text-muted-foreground text-lg">
                  Dicas, notícias e informações sobre internet de qualidade na Amazônia
                </p>
              </div>

              {categories.length > 1 && (
                <div className="mb-8 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">Nenhum artigo publicado ainda.</p>
                  <p className="text-sm text-muted-foreground">Volte em breve para novidades!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group text-left h-full hover:opacity-80 transition"
                    >
                      <div className="bg-secondary rounded-lg overflow-hidden h-full flex flex-col">
                        {article.cover_image ? (
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                            <span className="text-4xl">📰</span>
                          </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                          {article.category && (
                            <span className="text-xs text-primary font-semibold mb-2">{article.category}</span>
                          )}
                          <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{article.author}</span>
                            <span>{formatDate(article.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
