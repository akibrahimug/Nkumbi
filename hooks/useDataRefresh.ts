import { useState, useEffect, useCallback } from 'react'
import { useRefresh } from '@/contexts/RefreshContext'

export function useDataRefresh<T>(
  fetchFunction: () => Promise<T>,
  initialData: T
) {
  const [data, setData] = useState<T>(initialData)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { refreshTrigger } = useRefresh()

  const refreshData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const newData = await fetchFunction()
      setData(newData)
      setLastRefreshed(new Date())
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching data'))
    } finally {
      setIsLoading(false)
    }
  }, [fetchFunction])

  useEffect(() => {
    refreshData()
  }, [refreshData, refreshTrigger])

  return { data, lastRefreshed, isLoading, error }
}

