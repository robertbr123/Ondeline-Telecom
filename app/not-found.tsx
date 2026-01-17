import Link from 'next/link'
import { FileQuestion, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-cyan-500/20 rounded-full animate-pulse"></div>
            <FileQuestion className="w-24 h-24 text-cyan-500 relative" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-black text-white tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-100">Ops! Página não encontrada</h2>
          <p className="text-slate-400">
            Parece que a página que você está procurando não existe ou foi movida para outro endereço.
          </p>
        </div>

        <div className="pt-8">
          <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Voltar para o Início
            </Link>
          </Button>
        </div>

        <p className="pt-12 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Ondeline Telecom. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
