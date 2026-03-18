// Lead scoring system for Ondeline Telecom
// Cities where service is active get higher scores

const ACTIVE_CITIES = ['ipixuna', 'eirunepe', 'eirunepé']
const COMING_SOON_CITIES = ['itamarati', 'itamaratí', 'carauari']

export function calculateLeadScore(lead: {
  city: string
  plan_interest?: string | null
  coupon_code?: string | null
  email?: string
  phone?: string
}): number {
  let score = 0
  const cityLower = (lead.city || '').toLowerCase().trim()

  // City scoring (0-40 points)
  if (ACTIVE_CITIES.some(c => cityLower.includes(c))) {
    score += 40 // Active city = hot lead
  } else if (COMING_SOON_CITIES.some(c => cityLower.includes(c))) {
    score += 20 // Coming soon city = warm lead
  } else {
    score += 5 // Unknown city = cold lead
  }

  // Has plan interest (0-25 points)
  if (lead.plan_interest) {
    score += 25
  }

  // Has coupon code (0-15 points) - shows intent
  if (lead.coupon_code) {
    score += 15
  }

  // Has email (0-10 points)
  if (lead.email && lead.email.includes('@')) {
    score += 10
  }

  // Has phone (0-10 points)
  if (lead.phone && lead.phone.length >= 10) {
    score += 10
  }

  return Math.min(score, 100)
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 70) return { label: 'Quente', color: 'text-red-500' }
  if (score >= 40) return { label: 'Morno', color: 'text-yellow-500' }
  return { label: 'Frio', color: 'text-blue-500' }
}
