import { query } from "@/lib/db"
import { getCachedData, DEFAULT_TTL } from "@/lib/cache"

export interface PublicPlan {
  id: string
  name: string
  speed: string
  price: string
  description: string
  features: string[]
  highlighted: boolean
}

/**
 * Planos ativos para a página inicial (renderizados no servidor).
 * Usa a mesma chave de cache do GET /api/plans, então o admin
 * invalida os dois ao salvar um plano.
 */
export async function getActivePlans(): Promise<PublicPlan[]> {
  try {
    const plans = await getCachedData(
      "plans",
      async () => {
        const result = await query(
          "SELECT * FROM plans WHERE active = 1 ORDER BY highlighted DESC, name ASC"
        )
        return result.rows.map((plan: any) => ({
          id: plan.id,
          name: plan.name,
          speed: plan.speed,
          price: plan.price,
          description: plan.description,
          features: JSON.parse(plan.features),
          highlighted: plan.highlighted === 1,
          active: plan.active === 1,
          created_at: plan.created_at,
          updated_at: plan.updated_at,
        }))
      },
      DEFAULT_TTL.LONG,
      { includeInactive: false }
    )
    return plans as PublicPlan[]
  } catch (error) {
    console.error("[plans] erro ao carregar planos:", error)
    return []
  }
}

/** "60 MB" → 60 ; "1 Giga" → 1000 */
export function speedNumber(speed: string): number {
  const n = parseFloat(String(speed).replace(",", ".").replace(/[^\d.]/g, "")) || 0
  return /g/i.test(speed) && n < 50 ? n * 1000 : n
}

/** "R$ 150" → { reais: "150", centavos: "" } ; "139,90" → { "139", "90" } */
export function splitPrice(price: string): { reais: string; centavos: string } {
  const [r, c] = String(price).replace(/R\$/i, "").trim().split(",")
  return { reais: (r || price).trim(), centavos: c && c !== "00" ? c.trim() : "" }
}
