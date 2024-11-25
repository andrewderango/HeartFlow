import React, { useState } from 'react'
import useStore from '@renderer/store/mainStore'
import { useToast } from '../../context/ToastContext'
import './ConnectButton.css'

const ConnectButton: React.FC = () => {
  const { connectionStatus, serialNumber, dispatch } = useStore()
  const [serialConnectionStatus, setSerialConnectionStatus] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const { addToast } = useToast()

  window.api.onSerialConnectionMessage((message) => {
    if (message.type === 'connection') {
      setSerialConnectionStatus(message.status)
    }
  })

  window.api.onSerialDataMessage((message) => {
    if (message.type === 'connection' && message.status === 'RECONNECTING') {
      setConnecting(true)
    } else if (message.type === 'connection' && message.status === 'CONNECTED') {
      setConnecting(false)
    }
  })

  const awaitConnectionStatusChange = async (): void => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (connectionStatus !== null) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  }

  const handleConnect = async (): void => {
    if (connectionStatus === 'CONNECTED') {
      window.api.serialDisconnect()
      await awaitConnectionStatusChange()
      if (serialConnectionStatus === 'success') {
        addToast('Disconnected successfully', 'success')
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'DISCONNECTED' })
      } else {
        addToast('Failed to disconnect', 'error')
      }
    } else if (connectionStatus === 'DISCONNECTED') {
      addToast('Connecting...', 'info')
      window.api.serialConnect(serialNumber)
      setConnecting(true)
      await awaitConnectionStatusChange()
      if (serialConnectionStatus === 'success') {
        addToast('Connected successfully', 'success')
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'CONNECTED' })
      } else {
        addToast('Failed to connect', 'error')
      }
      setConnecting(false)
    }
  }

  const getButtonClass = (): string => {
    if (connectionStatus === 'CONNECTED') {
      return 'disconnect'
    } else if (connectionStatus === 'DISCONNECTED') {
      return 'connect'
    } else {
      return 'reconnecting'
    }
  }

  return (
    <button
      className={`connect-button ${getButtonClass()}`}
      onClick={() => handleConnect()}
      disabled={connecting}
    >
      {connectionStatus === 'CONNECTED' ? 'Disconnect' : 'Connect'}
    </button>
  )
}

export default ConnectButton
