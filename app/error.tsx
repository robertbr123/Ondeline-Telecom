'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
          <h2 className="text-3xl font-bold text-white">Algo deu errado</h2>
          <p className="text-slate-400">
            Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <RefreshCcw size={18} />
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

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-slate-800 rounded-lg text-left">
            <summary className="cursor-pointer text-sm text-slate-400 hover:text-white">
              Detalhes do erro (somente em desenvolvimento)
            </summary>
            <pre className="mt-4 text-xs text-red-400 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
