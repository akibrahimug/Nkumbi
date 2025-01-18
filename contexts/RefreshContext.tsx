'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type RefreshContextType = {
  refreshTrigger: number;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined)

export function RefreshProvider({ children, refreshInterval = 300000 }: { children: React.ReactNode; refreshInterval?: number }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTrigger(prev => prev + 1)
    }, refreshInterval)

    return () => clearInterval(intervalId)
  }, [refreshInterval])

  return (
    <RefreshContext.Provider value={{ refreshTrigger }}>
      {children}
    </RefreshContext.Provider>
  )
}

export function useRefresh() {
  const context = useContext(RefreshContext)
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider')
  }
  return context
}

