import { createContext, useContext, useState, ReactNode } from 'react'
import type { Toast } from '../../../common/types'

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: 'success' | 'error' | 'info') => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info'): void => {
    const id = Date.now()
    setToasts([...toasts, { id: id, message, type }])
    setTimeout(() => initiateRemoveToast(id), 3000)
  }

  const initiateRemoveToast = (id: number): void => {
    setToasts(
      toasts.map((toast) => {
        if (toast.id === id) {
          return { ...toast, removing: true }
        }
        return toast
      }),
    )
    setTimeout(() => removeToast(id), 300)
  }

  const removeToast = (id: number): void => {
    setToasts(toasts.filter((toast) => toast.id !== id))
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
