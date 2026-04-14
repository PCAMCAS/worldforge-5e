import { createContext, useContext, useState, type ReactNode } from 'react'

interface Notification {
  message: string
  type: 'success' | 'error'
}

interface NotificationContextValue {
  notification: Notification | null
  showNotification: (message: string, type?: 'success' | 'error') => void
  clearNotification: () => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null)

  function showNotification(
    message: string,
    type: 'success' | 'error' = 'success',
  ) {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  function clearNotification() {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification debe usarse dentro de NotificationProvider',
    )
  }

  return context
}