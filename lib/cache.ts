// ============================================
// Sistema de Cache para APIs
// Data: 15/02/2025
// Objetivo: Reduzir carga no banco e melhorar performance
// ============================================

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry<any>>()

// TTL padrão em milissegundos
const DEFAULT_TTL = {
  SHORT: 5 * 60 * 1000,      // 5 minutos - dados que mudam frequentemente
  MEDIUM: 15 * 60 * 1000,    // 15 minutos - dados que mudam moderadamente
  LONG: 60 * 60 * 1000,      // 1 hora - dados que mudam pouco
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 horas - dados estáticos
}

/**
 * Gera uma chave de cache única
 */
function generateCacheKey(prefix: string, params?: Record<string, any>): string {
  if (!params) return prefix
  
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${JSON.stringify(params[key])}`)
    .join('&')
  
  return `${prefix}:${sortedParams}`
}

/**
 * Limpa entradas expiradas do cache
 */
function cleanExpiredEntries(): void {
  const now = Date.now()
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key)
    }
  }
}

/**
 * Obtém dados do cache
 */
export async function getFromCache<T>(
  key: string
): Promise<T | null> {
  cleanExpiredEntries()
  
  const entry = cache.get(key)
  if (!entry) return null
  
  const now = Date.now()
  const age = now - entry.timestamp
  
  if (age > entry.ttl) {
    cache.delete(key)
    return null
  }
  
  return entry.data as T
}

/**
 * Armazena dados no cache
 */
export async function setCache<T>(
  key: string,
  data: T,
  ttl: number = DEFAULT_TTL.MEDIUM
): Promise<void> {
  cleanExpiredEntries()
  
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

/**
 * Invalida cache por padrão de chave
 */
export async function invalidateCache(pattern: string): Promise<void> {
  const regex = new RegExp(`^${pattern}`)
  for (const key of cache.keys()) {
    if (regex.test(key)) {
      cache.delete(key)
    }
  }
}

/**
 * Obtém dados com cache automático (Cache-Aside Pattern)
 */
export async function getWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL.MEDIUM
): Promise<T> {
  // Tenta obter do cache
  const cached = await getFromCache<T>(key)
  if (cached !== null) {
    return cached
  }
  
  // Se não está no cache, busca os dados
  const data = await fetchFn()
  
  // Armazena no cache
  await setCache(key, data, ttl)
  
  return data
}

/**
 * Obtém dados com cache automático e prefixo
 */
export async function getCachedData<T>(
  prefix: string,
  fetchFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL.MEDIUM,
  params?: Record<string, any>
): Promise<T> {
  const key = generateCacheKey(prefix, params)
  return getWithCache(key, fetchFn, ttl)
}

/**
 * Wrapper para fetch com cache para APIs
 */
export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit,
  ttl: number = DEFAULT_TTL.MEDIUM
): Promise<T> {
  const key = generateCacheKey('api', { url, ...options })
  
  return getWithCache(
    key,
    async () => {
      const response = await fetch(url, {
        ...options,
        cache: 'no-store', // Não usar cache do navegador, apenas nosso cache
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return response.json()
    },
    ttl
  )
}

/**
 * Limpa todo o cache
 */
export async function clearAllCache(): Promise<void> {
  cache.clear()
}

/**
 * Obtém estatísticas do cache
 */
export function getCacheStats(): {
  size: number
  keys: string[]
} {
  cleanExpiredEntries()
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  }
}

// Limpa cache periodicamente (a cada 5 minutos)
if (typeof window === 'undefined') {
  setInterval(cleanExpiredEntries, 5 * 60 * 1000)
}

// ============================================
// Exemplos de Uso
// ============================================
/*
// Exemplo 1: Caching simples
const plans = await getCachedData(
  'plans:active',
  () => query('SELECT * FROM plans WHERE active = 1'),
  DEFAULT_TTL.MEDIUM
)

// Exemplo 2: Caching com parâmetros
const blogPosts = await getCachedData(
  'blog:posts',
  () => query('SELECT * FROM blog_posts WHERE status = $1', ['published']),
  DEFAULT_TTL.MEDIUM,
  { page: 1, limit: 10 }
)

// Exemplo 3: Invalidar cache após atualização
await invalidateCache('plans:')
await query('UPDATE plans SET price = $1 WHERE id = $2', [newPrice, id])

// Exemplo 4: Wrapper para APIs externas
const weatherData = await fetchWithCache(
  'https://api.weather.com/data',
  undefined,
  DEFAULT_TTL.SHORT // Dados que mudam rapidamente
)

// Exemplo 5: Estatísticas do cache
const stats = getCacheStats()
console.log(`Cache size: ${stats.size}`)
*/

export { DEFAULT_TTL }
export default {
  getFromCache,
  setCache,
  invalidateCache,
  getWithCache,
  getCachedData,
  fetchWithCache,
  clearAllCache,
  getCacheStats,
}
