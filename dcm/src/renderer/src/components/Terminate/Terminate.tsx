import React from 'react'
import { PowerOff } from 'lucide-react'
import './Terminate.css'

const TerminateButton: React.FC = () => {
  const handleTermination = (): void => {
    console.log("TELEMETRY TERMINATION TO BE IMPLEMENTED HERE");
  }

  return (
    <button className="terminate-button" type="button" onClick={handleTermination}>
      <PowerOff size={24} />
      <span>Terminate Telemetry</span>
    </button>
  )
}

export default TerminateButton