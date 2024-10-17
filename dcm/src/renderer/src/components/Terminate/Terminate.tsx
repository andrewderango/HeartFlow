import React from 'react'
import { PowerOff } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import './Terminate.css'

interface TerminateButtonProps {
  onTerminate: () => void
  disabled: boolean
}

const TerminateButton: React.FC<TerminateButtonProps> = ({ onTerminate, disabled }) => {
  const { user } = useUser()

  const handleTermination = async (): Promise<void> => {
    console.log('TELEMETRY TERMINATION TO BE IMPLEMENTED HERE')
    if (user) {
      await window.api.setUser(user.username, 'OFF', {})
    }
    onTerminate()
  }

  return (
    <button className="terminate-button" type="button" onClick={handleTermination} disabled={disabled}>
      <PowerOff size={24} />
      <span>Terminate Telemetry</span>
    </button>
  )
}

export default TerminateButton