import React, { useEffect, useState } from 'react'
import useStore from '@renderer/store/mainStore'
import { useToast } from '../../context/ToastContext'
import './ConnectButton.css'
import type { SerialConnectionResponse } from 'src/common/types'

const ConnectButton: React.FC = () => {
  const { connectionStatus, serialNumber, dispatch } = useStore()
  const [buttonClass, setButtonClass] = useState<string>('connect-button')
  const { addToast } = useToast()

  window.api.onSerialConnectionMessage((message: SerialConnectionResponse) => {
    if (message.type === 'connection') {
      if (message.connectionType === 'initialize' && message.status === 'success') {
        addToast('Connected to device', 'success')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'CONNECTED' })
      } else if (message.connectionType === 'initialize' && message.status === 'failed') {
        addToast('Failed to connect to device', 'error')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })
      } else if (message.connectionType === 'reconnect' && message.status === 'reconnecting') {
        addToast('Reconnecting to device', 'info')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'RECONNECTING' })
      } else if (message.connectionType === 'reconnect' && message.status === 'success') {
        addToast('Reconnected to device', 'success')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'CONNECTED' })
      } else if (message.connectionType === 'reconnect' && message.status === 'failed') {
        addToast('Failed to reconnect to device', 'error')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })
      } else if (message.connectionType === 'disconnect' && message.status === 'success') {
        addToast('Disconnected from device', 'success')
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })
      } else if (message.connectionType === 'disconnect' && message.status === 'failed') {
        addToast('Failed to disconnect from device', 'error')
      }
    }
  })

  const handleButtonLogic = (): void => {
    if (connectionStatus === 'DISCONNECTED') {
      window.api.serialInitialize(parseInt(serialNumber, 10))
    } else if (connectionStatus === 'CONNECTED') {
      window.api.serialDisconnect()
    }
  }

  useEffect(() => {
    if (connectionStatus === 'CONNECTED') {
      setButtonClass('disconnect')
    } else if (connectionStatus === 'DISCONNECTED') {
      setButtonClass('connect-button')
    } else if (connectionStatus === 'RECONNECTING') {
      setButtonClass('reconnecting')
    } else {
      setButtonClass('')
    }
  }, [connectionStatus])

  return (
    <button className={`connect-button ${buttonClass}`} onClick={handleButtonLogic}>
      {connectionStatus === 'CONNECTED' ? 'Disconnect' : 'Connect'}
    </button>
  )
}

export default ConnectButton
