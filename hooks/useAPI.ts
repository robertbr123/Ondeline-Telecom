import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

interface UseAPIOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
  autoFetch?: boolean
}

export function useAPI<T>(endpoint: string, options: UseAPIOptions = {}) {
  const { onSuccess, onError, autoFetch = true } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(endpoint)
      const json = await res.json()
      
      if (json.success) {
        setData(json.data)
        onSuccess?.(json.data)
      } else {
        const errorMsg = json.error || 'Erro ao carregar dados'
        setError(errorMsg)
        onError?.(errorMsg)
      }
    } catch (err) {
      const errorMsg = 'Erro de conexão'
      setError(errorMsg)
      onError?.(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [endpoint, onSuccess, onError])

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
  return useAPI('/api/plans', {
    onError: (error) => toast.error(error),
  })
}

export function useFAQs() {
  return useAPI('/api/faq', {
    onError: (error) => toast.error(error),
  })
}

export function useFeatures() {
  return useAPI('/api/features', {
    onError: (error) => toast.error(error),
  })
}

export function useLeads() {
  return useAPI('/api/leads', {
    onError: (error) => toast.error(error),
  })
}

export function useBlogPosts(published = true) {
  return useAPI(`/api/blog${published ? '?published=true' : ''}`, {
    onError: (error) => toast.error(error),
  })
}

export function useSiteConfig() {
  return useAPI('/api/site/config', {
    onError: (error) => toast.error(error),
  })
}

export function useCoverage() {
  return useAPI('/api/coverage', {
    onError: (error) => toast.error(error),
  })
}

export function useReferrals() {
  return useAPI('/api/referrals', {
    onError: (error) => toast.error(error),
  })
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
