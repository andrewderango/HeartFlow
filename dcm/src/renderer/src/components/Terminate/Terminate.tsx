import React from 'react'
import { PowerOff } from 'lucide-react'
import './Terminate.css'

interface TerminateButtonProps {
  onTerminate: () => void
  disabled: boolean
}

const TerminateButton: React.FC<TerminateButtonProps> = ({ onTerminate, disabled }) => {
  const handleTermination = (): void => {
    console.log('TELEMETRY TERMINATION TO BE IMPLEMENTED HERE')
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