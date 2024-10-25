import React, { useEffect, useState } from 'react'
import './Toast.css'

// toasts are small notifications that appear at the bottom of the screen
// called toasts because they pop up like toast from a toaster

// type definitions for the props of the Toast component
interface ToastProps {
  message: string // message to display
  type: 'success' | 'error' | 'info' // type of toast
  onClose: () => void // callback when the toast is closed
  removing?: boolean // if the toast is being removed
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, removing }) => {
  // state to track if the toast is being removed
  const [isRemoving, setIsRemoving] = useState(removing)

  // effect handles the animation for removing the toast when
  // the removing prop is set to true by a parent component
  useEffect(() => {
    if (removing) {
      setIsRemoving(true)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }, [removing, onClose])

  // handler for close button, does similar to above
  const handleRemove = (): void => {
    setIsRemoving(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // return the component
  // styled with CSS classes based on the type of toast and if
  // it's being removed
  return (
    <div className={`toast toast-${type} ${isRemoving ? 'toast-removal' : ''}`}>
      <p>{message}</p>
      <button onClick={handleRemove}>X</button>
    </div>
  )
}

export default Toast
