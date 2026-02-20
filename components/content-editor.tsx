"use client"

import { useRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface ContentEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

type ToolbarItem =
  | { type: "wrap"; label: string; title: string; before: string; after: string }
  | { type: "line" }
  | { type: "insert"; label: string; title: string; text: string }
  | { type: "block"; label: string; title: string; tag: string }
  | { type: "link"; label: string; title: string }
  | { type: "autoformat"; label: string; title: string }

const TOOLBAR: ToolbarItem[] = [
  { type: "wrap", label: "B", title: "Negrito", before: "<strong>", after: "</strong>" },
  { type: "wrap", label: "I", title: "Itálico", before: "<em>", after: "</em>" },
  { type: "wrap", label: "S", title: "Tachado", before: "<s>", after: "</s>" },
  { type: "line" },
  { type: "block", label: "H2", title: "Título H2", tag: "h2" },
  { type: "block", label: "H3", title: "Subtítulo H3", tag: "h3" },
  { type: "block", label: "P", title: "Parágrafo", tag: "p" },
  { type: "line" },
  { type: "block", label: "• Lista", title: "Lista com marcadores", tag: "ul-li" },
  { type: "block", label: "1. Lista", title: "Lista numerada", tag: "ol-li" },
  { type: "block", label: "❝", title: "Citação", tag: "blockquote" },
  { type: "line" },
  { type: "insert", label: "—", title: "Linha horizontal", text: "\n<hr>\n" },
  { type: "insert", label: "↵ BR", title: "Quebra de linha", text: "<br>" },
  { type: "link", label: "🔗 Link", title: "Inserir link" },
  { type: "line" },
  { type: "autoformat", label: "✨ Auto-formatar", title: "Converte texto simples em HTML (parágrafos + quebras)" },
]

function wrapText(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  update: (v: string) => void
) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end)
  const replacement = before + (selected || "texto aqui") + after
  const newValue =
    textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
  update(newValue)
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + (selected || "texto aqui").length)
  }, 0)
}

function insertBlock(
  textarea: HTMLTextAreaElement,
  tag: string,
  update: (v: string) => void
) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end) || "conteúdo aqui"
  let replacement = ""

  if (tag === "ul-li") {
    replacement = `<ul>\n  <li>${selected}</li>\n</ul>`
  } else if (tag === "ol-li") {
    replacement = `<ol>\n  <li>${selected}</li>\n</ol>`
  } else {
    replacement = `<${tag}>${selected}</${tag}>`
  }

  const newValue =
    textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
  update(newValue)
  setTimeout(() => textarea.focus(), 0)
}

function insertLink(
  textarea: HTMLTextAreaElement,
  update: (v: string) => void
) {
  const url = prompt("URL do link:")
  if (!url) return
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.substring(start, end) || "clique aqui"
  const replacement = `<a href="${url}" target="_blank" rel="noopener">${selected}</a>`
  const newValue =
    textarea.value.substring(0, start) + replacement + textarea.value.substring(end)
  update(newValue)
  setTimeout(() => textarea.focus(), 0)
}

function insertText(
  textarea: HTMLTextAreaElement,
  text: string,
  update: (v: string) => void
) {
  const start = textarea.selectionStart
  const newValue =
    textarea.value.substring(0, start) + text + textarea.value.substring(start)
  update(newValue)
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + text.length, start + text.length)
  }, 0)
}

function autoFormat(text: string): string {
  // Se já tem tags HTML, não re-formatar
  if (/<\/?[a-z][\s\S]*>/i.test(text)) return text
  // Converte texto simples: \n\n → <p>, \n → <br>
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("\n")
}

export function ContentEditor({ value, onChange, placeholder, className }: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [preview, setPreview] = useState(false)

  const handleToolbar = (item: ToolbarItem) => {
    const ta = textareaRef.current
    if (!ta) return

    switch (item.type) {
      case "wrap":
        wrapText(ta, item.before, item.after, onChange)
        break
      case "block":
        insertBlock(ta, item.tag, onChange)
        break
      case "insert":
        insertText(ta, item.text, onChange)
        break
      case "link":
        insertLink(ta, onChange)
        break
      case "autoformat": {
        const formatted = autoFormat(value)
        if (formatted !== value) {
          onChange(formatted)
        } else {
          alert("O conteúdo já contém HTML ou não há texto para formatar.")
        }
        break
      }
    }
  }

  return (
    <div className={`border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-muted/40 border-b border-border">
        {TOOLBAR.map((item, i) => {
          if (item.type === "line") {
            return <div key={i} className="w-px h-5 bg-border mx-1" />
          }
          const isAutoformat = item.type === "autoformat"
          return (
            <button
              key={i}
              type="button"
              title={item.title}
              onClick={() => handleToolbar(item)}
              className={`px-2 py-1 text-xs rounded transition hover:bg-primary/20 hover:text-primary ${
                item.label === "B" ? "font-bold" : ""
              } ${item.label === "I" ? "italic" : ""} ${
                isAutoformat ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          )
        })}

        {/* Spacer + Preview toggle */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition ${
              preview
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-primary/20 hover:text-primary"
            }`}
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />}
            {preview ? "Editar" : "Preview"}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div
          className="prose prose-invert max-w-none p-4 min-h-64 bg-background text-sm"
          dangerouslySetInnerHTML={{ __html: value || "<p class='text-muted-foreground'>Nada para exibir ainda.</p>" }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholder ||
            "Escreva o conteúdo aqui...\n\nDica: use a toolbar para formatar, ou clique em ✨ Auto-formatar para converter texto simples em HTML."
          }
          className="w-full p-3 bg-background font-mono text-sm resize-none min-h-64 outline-none"
          style={{ minHeight: "16rem" }}
        />
      )}
    </div>
  )
}
