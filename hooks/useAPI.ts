import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'

interface UseAPIOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
  autoFetch?: boolean
}

export function useAPI<T>(endpoint: string, options: UseAPIOptions = {}) {
  const { onSuccess, onError, autoFetch = true } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)
  
  // Use refs para callbacks para evitar re-renders
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)
  
  useEffect(() => {
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(endpoint)
      const json = await res.json()
      
      if (json.success) {
        setData(json.data)
        onSuccessRef.current?.(json.data)
      } else {
        const errorMsg = json.error || 'Erro ao carregar dados'
        setError(errorMsg)
        onErrorRef.current?.(errorMsg)
      }
    } catch (err) {
      const errorMsg = 'Erro de conexão'
      setError(errorMsg)
      onErrorRef.current?.(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

export function usePlans() {
  return useAPI('/api/plans')
}

export function useFAQs() {
  return useAPI('/api/faq')
}

export function useFeatures() {
  return useAPI('/api/features')
}

export function useClients() {
  return useAPI('/api/clients')
}

export function useLeads() {
  return useAPI('/api/leads')
}

export function useBlogPosts(published = true) {
  return useAPI(`/api/blog${published ? '?published=true' : ''}`)
}

export function useSiteConfig() {
  return useAPI('/api/site/config')
}

export function useCoverage() {
  return useAPI('/api/coverage')
}

export function useReferrals() {
  return useAPI('/api/referrals')
}

export async function submitAPI<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE',
  data?: T,
  showToast = true
) {
  try {
    const res = await fetch(endpoint, {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    })

    const json = await res.json()

    if (json.success) {
      if (showToast) {
        toast.success(json.message || 'Operação realizada com sucesso!')
      }
      return { success: true, data: json.data }
    } else {
      const errorMsg = json.error || 'Erro ao realizar operação'
      if (showToast) {
        toast.error(errorMsg)
      }
      return { success: false, error: errorMsg }
    }
  } catch (error) {
    const errorMsg = 'Erro de conexão'
    if (showToast) {
      toast.error(errorMsg)
    }
    return { success: false, error: errorMsg }
  }
}
