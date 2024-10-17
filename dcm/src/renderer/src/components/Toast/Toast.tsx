import React, { useEffect, useState } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
  removing?: boolean
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, removing }) => {
  const [isRemoving, setIsRemoving] = useState(removing)

  useEffect(() => {
    if (removing) {
      setIsRemoving(true)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }, [removing, onClose])

  const handleRemove = (): void => {
    setIsRemoving(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div className={`toast toast-${type} ${isRemoving ? 'toast-removal' : ''}`}>
      <p>{message}</p>
      <button onClick={handleRemove}>X</button>
    </div>
  )
}

export default Toast
