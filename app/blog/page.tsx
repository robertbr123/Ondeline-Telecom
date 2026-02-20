"use client"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, Eye } from "lucide-react"
import Link from "next/link"

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

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success) {
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
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
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
                        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                          {article.category}
                        </span>
                      )}
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {article.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar size={12} />
                        {formatDate(article.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
