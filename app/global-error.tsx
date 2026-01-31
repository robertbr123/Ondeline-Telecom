'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="space-y-4">
              <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto" />
              <h1 className="text-4xl font-bold text-white">Erro Crítico</h1>
              <p className="text-slate-400">
                Ocorreu um erro crítico no sistema. Nossa equipe foi notificada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                Tentar Novamente
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link href="/">
                  <Home size={18} />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
