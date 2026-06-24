// lib/detector-services.ts
export type DetectorCategory =
  | 'Redes Sociais'
  | 'Streaming'
  | 'Bancos'
  | 'Operadoras'
  | 'Infraestrutura'

export interface DetectorService {
  name: string
  /** Domínio usado para o logo (Clearbit) e identificação. */
  domain: string
  category: DetectorCategory
  /** URL alvo da checagem HTTP. */
  checkUrl: string
}

/** Ordem em que as categorias aparecem na página. */
export const DETECTOR_CATEGORIES: DetectorCategory[] = [
  'Redes Sociais',
  'Streaming',
  'Bancos',
  'Operadoras',
  'Infraestrutura',
]

export const DETECTOR_SERVICES: DetectorService[] = [
  // Redes Sociais
  { name: 'Instagram', domain: 'instagram.com', category: 'Redes Sociais', checkUrl: 'https://www.instagram.com' },
  { name: 'Facebook', domain: 'facebook.com', category: 'Redes Sociais', checkUrl: 'https://www.facebook.com' },
  { name: 'WhatsApp', domain: 'whatsapp.com', category: 'Redes Sociais', checkUrl: 'https://www.whatsapp.com' },
  { name: 'YouTube', domain: 'youtube.com', category: 'Redes Sociais', checkUrl: 'https://www.youtube.com' },
  { name: 'X (Twitter)', domain: 'x.com', category: 'Redes Sociais', checkUrl: 'https://x.com' },
  { name: 'TikTok', domain: 'tiktok.com', category: 'Redes Sociais', checkUrl: 'https://www.tiktok.com' },

  // Streaming
  { name: 'Netflix', domain: 'netflix.com', category: 'Streaming', checkUrl: 'https://www.netflix.com' },
  { name: 'Disney+', domain: 'disneyplus.com', category: 'Streaming', checkUrl: 'https://www.disneyplus.com' },
  { name: 'Prime Video', domain: 'primevideo.com', category: 'Streaming', checkUrl: 'https://www.primevideo.com' },

  // Bancos
  { name: 'Nubank', domain: 'nubank.com.br', category: 'Bancos', checkUrl: 'https://nubank.com.br' },
  { name: 'Bradesco', domain: 'bradesco.com.br', category: 'Bancos', checkUrl: 'https://banco.bradesco' },
  { name: 'Itaú', domain: 'itau.com.br', category: 'Bancos', checkUrl: 'https://www.itau.com.br' },
  { name: 'Caixa', domain: 'caixa.gov.br', category: 'Bancos', checkUrl: 'https://www.caixa.gov.br' },

  // Operadoras
  { name: 'Vivo', domain: 'vivo.com.br', category: 'Operadoras', checkUrl: 'https://www.vivo.com.br' },
  { name: 'Claro', domain: 'claro.com.br', category: 'Operadoras', checkUrl: 'https://www.claro.com.br' },
  { name: 'TIM', domain: 'tim.com.br', category: 'Operadoras', checkUrl: 'https://www.tim.com.br' },

  // Infraestrutura
  { name: 'Cloudflare', domain: 'cloudflare.com', category: 'Infraestrutura', checkUrl: 'https://www.cloudflare.com' },
  { name: 'Google', domain: 'google.com', category: 'Infraestrutura', checkUrl: 'https://www.google.com' },
  { name: 'AWS', domain: 'aws.amazon.com', category: 'Infraestrutura', checkUrl: 'https://aws.amazon.com' },
]

/** URL do logo colorido via Clearbit, dimensionado. */
export function clearbitLogo(domain: string): string {
  return `https://logo.clearbit.com/${domain}?size=128`
}
