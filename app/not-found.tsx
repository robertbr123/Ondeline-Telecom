'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white">Página não encontrada</h2>
          <p className="text-slate-400">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Link href="/">
              <Home size={18} />
              Voltar ao Início
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2"
          >
            <Link href="/coverage">
              <Search size={18} />
              Ver Cobertura
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <Button
            asChild
            variant="ghost"
            className="text-slate-400 hover:text-white"
          >
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Voltar para a página anterior
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
