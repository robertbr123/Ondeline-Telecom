"use client"

import { useRef, useState, useEffect } from "react"
import { Code } from "lucide-react"

interface ContentEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

type ToolbarItem =
  | { label: string; title: string; command: string; cmdValue?: string; bold?: boolean; italic?: boolean }
  | { type: "separator" }

const TOOLBAR: ToolbarItem[] = [
  { label: "N", title: "Negrito (Ctrl+B)", command: "bold", bold: true },
  { label: "I", title: "Itálico (Ctrl+I)", command: "italic", italic: true },
  { label: "S", title: "Tachado", command: "strikeThrough" },
  { type: "separator" },
  { label: "H2", title: "Título", command: "formatBlock", cmdValue: "h2" },
  { label: "H3", title: "Subtítulo", command: "formatBlock", cmdValue: "h3" },
  { label: "P", title: "Parágrafo normal", command: "formatBlock", cmdValue: "p" },
  { type: "separator" },
  { label: "• Lista", title: "Lista com marcadores", command: "insertUnorderedList" },
  { label: "1. Lista", title: "Lista numerada", command: "insertOrderedList" },
  { label: "❝", title: "Citação", command: "formatBlock", cmdValue: "blockquote" },
  { type: "separator" },
  { label: "🔗 Link", title: "Inserir link", command: "createLink" },
  { label: "—", title: "Linha horizontal", command: "insertHorizontalRule" },
]

function cleanHtml(html: string): string {
  if (typeof document === "undefined") return html
  const div = document.createElement("div")
  div.innerHTML = html
  // remove tags desnecessários vindos de Word/Docs
  div.querySelectorAll("script,style,meta,link,o\\:p").forEach((el) => el.remove())
  div.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("style")
    el.removeAttribute("class")
    el.removeAttribute("id")
    el.removeAttribute("dir")
    el.removeAttribute("lang")
    el.removeAttribute("xml:lang")
  })
  return div.innerHTML
}

export function ContentEditor({ value, onChange, placeholder, className }: ContentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showHtml, setShowHtml] = useState(false)
  // flag para evitar loop: quando a mudança vem do editor, não re-injetar innerHTML
  const internalChange = useRef(false)

  // Inicializa o conteúdo no mount e quando o valor muda externamente
  useEffect(() => {
    const el = editorRef.current
    if (!el || internalChange.current) return
    if (el.innerHTML !== value) {
      el.innerHTML = value ?? ""
    }
  }, [value])

  const emitChange = () => {
    const el = editorRef.current
    if (!el) return
    internalChange.current = true
    onChange(el.innerHTML)
    internalChange.current = false
  }

  const execCmd = (command: string, cmdValue?: string) => {
    if (command === "createLink") {
      const url = prompt("URL do link:")
      if (!url) return
      document.execCommand("createLink", false, url)
      // garante que abre em nova aba
      editorRef.current?.querySelectorAll("a:not([target])").forEach((a) => {
        a.setAttribute("target", "_blank")
        a.setAttribute("rel", "noopener")
      })
    } else {
      document.execCommand(command, false, cmdValue)
    }
    editorRef.current?.focus()
    emitChange()
  }

  const handlePaste = (e: { preventDefault: () => void; clipboardData: DataTransfer }) => {
    e.preventDefault()
    const html = e.clipboardData.getData("text/html")
    if (html) {
      document.execCommand("insertHTML", false, cleanHtml(html))
    } else {
      // texto simples: converte \n\n → parágrafos, \n → <br>
      const text = e.clipboardData.getData("text/plain")
      const asHtml = text
        .split(/\n{2,}/)
        .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
        .join("")
      document.execCommand("insertHTML", false, asHtml)
    }
    emitChange()
  }

  const handleHtmlChange = (e: { target: { value: string } }) => {
    const v = e.target.value
    onChange(v)
    if (editorRef.current) editorRef.current.innerHTML = v
  }

  return (
    <div className={`border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-muted/40 border-b border-border">
        {TOOLBAR.map((item, i) => {
          if ("type" in item && item.type === "separator") {
            return <div key={i} className="w-px h-5 bg-border mx-1" />
          }
          const it = item as Exclude<ToolbarItem, { type: "separator" }>
          return (
            <button
              key={i}
              type="button"
              title={it.title}
              onMouseDown={(e) => {
                e.preventDefault() // mantém foco no editor
                execCmd(it.command, it.cmdValue)
              }}
              className={`px-2 py-1 text-xs rounded transition hover:bg-primary/20 hover:text-primary text-muted-foreground
                ${it.bold ? "font-bold" : ""}
                ${it.italic ? "italic" : ""}
              `}
            >
              {it.label}
            </button>
          )
        })}

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setShowHtml((h) => !h)}
            title="Ver/editar HTML bruto"
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition ${
              showHtml
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-primary/20 hover:text-primary"
            }`}
          >
            <Code size={12} />
            HTML
          </button>
        </div>
      </div>

      {/* Área de edição WYSIWYG */}
      <div
        ref={editorRef}
        contentEditable={!showHtml}
        suppressContentEditableWarning
        onInput={emitChange}
        onPaste={handlePaste}
        data-placeholder={placeholder ?? "Escreva o conteúdo aqui..."}
        className={`prose prose-invert max-w-none p-4 bg-background outline-none focus:outline-none
          empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/50
          ${showHtml ? "hidden" : "block"}
        `}
        style={{ minHeight: "16rem" }}
      />

      {/* Modo HTML bruto */}
      {showHtml && (
        <textarea
          value={value}
          onChange={handleHtmlChange}
          className="w-full p-3 bg-background font-mono text-xs resize-none outline-none block"
          style={{ minHeight: "16rem" }}
          spellCheck={false}
        />
      )}
    </div>
  )
}
