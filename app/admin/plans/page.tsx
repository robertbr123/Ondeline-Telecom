"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, Check } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Plan {
  id: string
  name: string
  speed: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
  active: boolean
}

export default function AdminPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans')
      const data = await res.json()
      if (data.success) {
        setPlans(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingPlan({
      id: '',
      name: '',
      speed: '',
      price: '',
      description: '',
      features: [],
      highlighted: false,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  const toggleActive = async (planId: string, currentStatus: boolean) => {
    try {
      const plan = plans.find(p => p.id === planId)
      const res = await fetch(`/api/plans/${planId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: plan.name,
          speed: plan.speed,
          price: plan.price,
          description: plan.description,
          features: plan.features,
          highlighted: plan.highlighted,
          active: !currentStatus,
        }),
      })
      if (res.ok) {
        fetchPlans()
        toast.success(`Plano ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`)
      } else {
        toast.error('Erro ao atualizar status do plano')
      }
    } catch (error) {
      console.error('Erro ao atualizar plano:', error)
      toast.error('Erro ao atualizar status do plano')
    }
  }

  const savePlan = async (plan: Plan) => {
    try {
      const isNewPlan = isCreating || !plan.id || plan.id === ''
      const method = isNewPlan ? 'POST' : 'PUT'
      const url = isNewPlan ? '/api/plans' : `/api/plans/${plan.id}`
      
      const planData = {
        name: plan.name,
        speed: plan.speed,
        price: plan.price,
        description: plan.description,
        features: plan.features,
        highlighted: plan.highlighted,
        active: plan.active,
      }
      
      console.log('=== SALVANDO PLANO ===')
      console.log('isNewPlan:', isNewPlan)
      console.log('method:', method)
      console.log('url:', url)
      console.log('planData:', planData)
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData),
      })

      const data = await res.json()
      console.log('=== RESPOSTA DA API ===', data)
      
      if (!res.ok) {
        console.error('Erro na resposta:', data)
        toast.error(`Erro: ${data.error || 'Erro ao salvar plano'}`)
        return
      }
      
      fetchPlans()
      setEditingPlan(null)
      setIsCreating(false)
      toast.success('Plano salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
      toast.error('Erro ao salvar plano. Verifique o console.')
    }
  }

  const deletePlan = async (planId: string) => {
    if (!confirm('Tem certeza que deseja deletar este plano?')) return

    try {
      const res = await fetch(`/api/plans/${planId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPlans()
        toast.success('Plano deletado com sucesso!')
      } else {
        toast.error('Erro ao deletar plano')
      }
    } catch (error) {
      console.error('Erro ao deletar plano:', error)
      toast.error('Erro ao deletar plano')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Gerenciar Planos</h1>
            <Button
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Novo Plano
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum plano encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 rounded-xl border transition-all ${
                  plan.highlighted
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/5'
                    : 'border-border bg-card/50 hover:border-primary/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs rounded mb-3">
                    Destaque
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-primary mb-1">{plan.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                    setIsCreating(false)
                    setEditingPlan(plan)
                  }}
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(plan.id, plan.active)}
                  >
                    {plan.active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deletePlan(plan.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Edição */}
        {editingPlan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingPlan.id ? 'Editar Plano' : 'Novo Plano'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Velocidade</label>
                    <input
                      type="text"
                      value={editingPlan.speed}
                      onChange={(e) => setEditingPlan({ ...editingPlan, speed: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preço</label>
                    <input
                      type="text"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features (uma por linha)</label>
                  <textarea
                    value={editingPlan.features.join('\n')}
                    onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split('\n').filter(f => f.trim()) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg h-32"
                    placeholder="- 20 MB de velocidade&#10;- Wi-Fi grátis&#10;- Suporte 24/7"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPlan.highlighted}
                      onChange={(e) => setEditingPlan({ ...editingPlan, highlighted: e.target.checked })}
                    />
                    <span className="text-sm">Destacar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPlan.active}
                      onChange={(e) => setEditingPlan({ ...editingPlan, active: e.target.checked })}
                    />
                    <span className="text-sm">Ativo</span>
                  </label>
                </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingPlan(null)
                    setIsCreating(false)
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => savePlan(editingPlan)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  >
                  Salvar
                </Button>
              </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
