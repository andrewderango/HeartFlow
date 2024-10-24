import { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Toast } from '../../../common/types'

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: 'success' | 'error' | 'info') => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info'): void => {
    const id = uuidv4()
    setToasts((prevToasts) => [...prevToasts, { id, message, type }])
    setTimeout(() => initiateRemoveToast(id), 3000)
  }

  const initiateRemoveToast = (id: string): void => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => {
        if (toast.id === id) {
          return { ...toast, removing: true }
        }
        return toast
      }),
    )
    setTimeout(() => removeToast(id), 300)
  }

  const removeToast = (id: string): void => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
