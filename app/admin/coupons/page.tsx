"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, Copy, Tag } from 'lucide-react'
import Link from 'next/link'

interface Coupon {
  id: string
  code: string
  description: string
  discount_type: string
  discount_value: number
  max_uses: number
  current_uses: number
  valid_from: string
  valid_until: string
  active: number
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons')
      const data = await res.json()
      if (data.success) setCoupons(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar cupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditing({
      id: '',
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 10,
      max_uses: 0,
      current_uses: 0,
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: 1,
    })
  }

  const saveCoupon = async (coupon: Coupon) => {
    try {
      const isNew = isCreating || !coupon.id
      const method = isNew ? 'POST' : 'PUT'
      const url = isNew ? '/api/coupons' : `/api/coupons/${coupon.id}`

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: coupon.code,
          description: coupon.description,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value,
          max_uses: coupon.max_uses,
          valid_from: coupon.valid_from,
          valid_until: coupon.valid_until,
          active: coupon.active === 1,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(`Erro: ${data.error || 'Erro ao salvar cupom'}`)
        return
      }

      fetchCoupons()
      setEditing(null)
      setIsCreating(false)
      alert('Cupom salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar cupom:', error)
      alert('Erro ao salvar cupom.')
    }
  }

  const deleteCoupon = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este cupom?')) return
    try {
      const res = await fetch(`/api/coupons/${id}`, { method: 'DELETE' })
      if (res.ok) fetchCoupons()
    } catch (error) {
      console.error('Erro ao deletar cupom:', error)
    }
  }

  const toggleActive = async (coupon: Coupon) => {
    try {
      await fetch(`/api/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...coupon,
          active: coupon.active !== 1,
        }),
      })
      fetchCoupons()
    } catch (error) {
      console.error('Erro ao atualizar cupom:', error)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Código "${code}" copiado!`)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Gerenciar Cupons</h1>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} /> Novo Cupom
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Carregando...</div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum cupom criado ainda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Código</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Descrição</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Desconto</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Usos</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Validade</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="bg-primary/10 text-primary px-2 py-1 rounded font-mono font-bold text-sm">
                          {coupon.code}
                        </code>
                        <button onClick={() => copyCode(coupon.code)} className="text-muted-foreground hover:text-foreground">
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{coupon.description}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {coupon.discount_type === 'percentage'
                        ? `${coupon.discount_value}%`
                        : `R$ ${coupon.discount_value}`}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {coupon.current_uses}/{coupon.max_uses === 0 ? '∞' : coupon.max_uses}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatDate(coupon.valid_from)} - {formatDate(coupon.valid_until)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        coupon.active === 1
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {coupon.active === 1 ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setIsCreating(false); setEditing(coupon) }}>
                          <Edit size={14} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleActive(coupon)}>
                          {coupon.active === 1 ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteCoupon(coupon.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de Edição */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isCreating ? 'Novo Cupom' : 'Editar Cupom'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Código</label>
                  <input
                    type="text"
                    value={editing.code}
                    onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg uppercase"
                    placeholder="VOLTA10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <input
                    type="text"
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="10% de desconto na primeira mensalidade"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Desconto</label>
                    <select
                      value={editing.discount_type}
                      onChange={(e) => setEditing({ ...editing, discount_type: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    >
                      <option value="percentage">Porcentagem (%)</option>
                      <option value="fixed">Valor Fixo (R$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor do Desconto</label>
                    <input
                      type="number"
                      value={editing.discount_value}
                      onChange={(e) => setEditing({ ...editing, discount_value: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Limite de usos (0 = ilimitado)</label>
                  <input
                    type="number"
                    value={editing.max_uses}
                    onChange={(e) => setEditing({ ...editing, max_uses: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    min={0}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Válido de</label>
                    <input
                      type="date"
                      value={editing.valid_from?.split('T')[0]}
                      onChange={(e) => setEditing({ ...editing, valid_from: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Válido até</label>
                    <input
                      type="date"
                      value={editing.valid_until?.split('T')[0]}
                      onChange={(e) => setEditing({ ...editing, valid_until: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.active === 1}
                    onChange={(e) => setEditing({ ...editing, active: e.target.checked ? 1 : 0 })}
                  />
                  <span className="text-sm">Ativo</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => { setEditing(null); setIsCreating(false) }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => saveCoupon(editing)}
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
