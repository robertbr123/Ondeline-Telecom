"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
  Type,
  Eye,
  Edit3
} from 'lucide-react'

interface HtmlEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function HtmlEditor({ content, onChange, placeholder }: HtmlEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [htmlContent, setHtmlContent] = useState(content)

  useEffect(() => {
    setHtmlContent(content)
  }, [content])

  const insertTag = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.getElementById('html-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const textToInsert = `${before}${placeholder}${selectedText}${after}`
    
    const newValue = textarea.value.substring(0, start) + textToInsert + textarea.value.substring(end)
    setHtmlContent(newValue)
    onChange(newValue)
    
    // Manter foco e selecionar o texto inserido
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length
      textarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length)
    }, 0)
  }

  const insertHeading = (level: number) => {
    insertTag(`<h${level} class="text-3xl font-bold mb-4">`, `</h${level}>`, 'Título aqui')
  }

  const insertParagraph = () => {
    insertTag(`<p class="mb-4">`, `</p>`, 'Seu texto aqui')
  }

  const insertSection = () => {
    insertTag(`<section className="py-20">\n  <div className="max-w-7xl mx-auto px-4">\n    `, '\n  </div>\n</section>', 'Conteúdo da seção')
  }

  const insertContainer = () => {
    insertTag(`<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">\n  `, '\n</div>', 'Cards aqui')
  }

  const insertCard = () => {
    insertTag(
      `<div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">\n  <h3 class="text-2xl font-bold mb-4">`, `</h3>\n  <p class="text-muted-foreground mb-4">Conteúdo do card</p>\n  <p class="text-xl font-bold text-primary">Preço</p>\n</div>`,
      'Título do Card'
    )
  }

  const insertButton = (variant: 'primary' | 'secondary' = 'primary') => {
    const buttonClass = variant === 'primary' 
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    
    insertTag(
      `<a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium ${buttonClass} h-10 px-4 py-2">`,
      `</a>`,
      'Texto do Botão'
    )
  }

  const insertList = (ordered: boolean = false) => {
    const tag = ordered ? 'ol' : 'ul'
    const className = ordered ? 'list-decimal pl-4' : 'list-disc pl-4'
    insertTag(
      `<${tag} class="${className}">\n  <li>`, `</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</${tag}>`,
      'Item 1'
    )
  }

  return (
    <div className="space-y-4">
      {/* Toggle Preview/Edit */}
      <div className="flex gap-2 items-center">
        <Button
          variant={!showPreview ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowPreview(false)}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button
          variant={showPreview ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowPreview(true)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Pré-visualizar
        </Button>
      </div>

      {/* Editor Mode */}
      {!showPreview && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-4">
            
            {/* Text Formatting */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Texto:</div>
              <Button variant="outline" size="sm" onClick={() => insertTag('<strong>', '</strong>', 'Texto em negrito')}>
                <Bold className="w-4 h-4 mr-2" /> Negrito
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertTag('<em>', '</em>', 'Texto em itálico')}>
                <Italic className="w-4 h-4 mr-2" /> Itálico
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertTag('<u>', '</u>', 'Texto sublinhado')}>
                <Underline className="w-4 h-4 mr-2" /> Sublinhado
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertTag('<del>', '</del>', 'Texto riscado')}>
                <Strikethrough className="w-4 h-4 mr-2" /> Riscado
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertTag('<code>', '</code>', 'Código')}>
                <Code className="w-4 h-4 mr-2" /> Código
              </Button>
            </div>

            {/* Headings */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Títulos:</div>
              <Button variant="outline" size="sm" onClick={() => insertHeading(1)}>
                <Heading1 className="w-4 h-4 mr-2" /> H1
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertHeading(2)}>
                <Heading2 className="w-4 h-4 mr-2" /> H2
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertHeading(3)}>
                <Heading3 className="w-4 h-4 mr-2" /> H3
              </Button>
            </div>

            {/* Paragraphs & Sections */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Estrutura:</div>
              <Button variant="outline" size="sm" onClick={insertParagraph}>
                <Type className="w-4 h-4 mr-2" /> Parágrafo
              </Button>
              <Button variant="outline" size="sm" onClick={insertSection}>
                <Type className="w-4 h-4 mr-2" /> Seção
              </Button>
              <Button variant="outline" size="sm" onClick={insertContainer}>
                <Type className="w-4 h-4 mr-2" /> Container (Grid)
              </Button>
              <Button variant="outline" size="sm" onClick={insertCard}>
                <Type className="w-4 h-4 mr-2" /> Card
              </Button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Listas:</div>
              <Button variant="outline" size="sm" onClick={() => insertList(false)}>
                <List className="w-4 h-4 mr-2" /> Lista
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertList(true)}>
                <ListOrdered className="w-4 h-4 mr-2" /> Lista Num.
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertTag('<blockquote class="border-l-4 border-primary pl-4 italic">', '</blockquote>', 'Texto da citação')}>
                <Quote className="w-4 h-4 mr-2" /> Citação
              </Button>
            </div>

            {/* Links & Images */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Links & Imagens:</div>
              <Button variant="outline" size="sm" onClick={() => {
                const url = prompt('Digite a URL do link:')
                const text = prompt('Digite o texto do link:', 'Clique aqui')
                if (url && text) {
                  insertTag(`<a href="${url}" class="text-primary underline hover:text-primary/80">`, '</a>', text)
                }
              }}>
                <LinkIcon className="w-4 h-4 mr-2" /> Link
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                const url = prompt('Digite a URL da imagem:')
                const alt = prompt('Digite a descrição (alt):', 'Descrição da imagem')
                if (url) {
                  insertTag(`<img src="${url}" alt="${alt}" class="max-w-full h-auto rounded-lg" />`, '', '')
                }
              }}>
                <ImageIcon className="w-4 h-4 mr-2" /> Imagem
              </Button>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <div className="text-sm font-medium text-muted-foreground w-full mb-2">Botões:</div>
              <Button variant="outline" size="sm" onClick={() => insertButton('primary')}>
                <Type className="w-4 h-4 mr-2" /> Botão Primário
              </Button>
              <Button variant="outline" size="sm" onClick={() => insertButton('secondary')}>
                <Type className="w-4 h-4 mr-2" /> Botão Secundário
              </Button>
            </div>

          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium">HTML / Markdown:</label>
            <textarea
              id="html-editor"
              value={htmlContent}
              onChange={(e) => {
                setHtmlContent(e.target.value)
                onChange(e.target.value)
              }}
              placeholder={placeholder || 'Cole seu HTML aqui...'}
              className="w-full h-[600px] p-4 rounded-lg border border-border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
          </div>
        </div>
      )}

      {/* Preview Mode */}
      {showPreview && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">
            Pré-visualização (como aparecerá no site):
          </div>
          <div 
            className="border border-border rounded-lg p-8 bg-background min-h-[600px] prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
    </div>
  )
}