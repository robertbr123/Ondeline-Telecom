"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  order: number
  active: boolean
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/faq')
      const data = await res.json()
      if (data.success) {
        setFaqs(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Perguntas Frequentes</h2>
          <p className="text-lg text-slate-400">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Carregando perguntas...</div>
          </div>
        ) : faqs.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Nenhuma pergunta disponível</div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-500 transition-transform duration-300 flex-shrink-0 ${
                      openIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIdx === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-700 text-slate-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
