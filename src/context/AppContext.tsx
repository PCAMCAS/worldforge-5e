import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AppContextType {
  globalMessage: string
  setGlobalMessage: (msg: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [globalMessage, setGlobalMessage] = useState('Bienvenido a WorldForge')

  return (
    <AppContext.Provider value={{ globalMessage, setGlobalMessage }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  return context
}