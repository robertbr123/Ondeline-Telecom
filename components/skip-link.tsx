'use client'

import { useEffect, useState } from 'react'

/**
 * Skip Link Component
 * Permite que usuários de teclado pulem diretamente para o conteúdo principal,
 * melhorando a acessibilidade conforme WCAG 2.1.
 * 
 * Uso: Adicionar no topo do layout.tsx antes de qualquer outro conteúdo
 */
export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    // Esconder o link após clicar
    const handleHashChange = () => {
      const element = document.getElementById('main-content')
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <a
      href="#main-content"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        fixed top-0 left-0 z-[9999] px-4 py-2 -translate-y-full
        transition-transform duration-200
        ${isFocused ? 'translate-y-0' : ''}
        bg-primary text-primary-foreground font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        lg:-ml-[1px]
      `}
    >
      Pular para o conteúdo principal
    </a>
  )
}