import React from 'react'
import { useToast } from '../../context/ToastContext'
import Toast from '../Toast/Toast'
import './ToastContainer.css'

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          removing={toast.removing}
        />
      ))}
    </div>
  )
}

export default ToastContainer
