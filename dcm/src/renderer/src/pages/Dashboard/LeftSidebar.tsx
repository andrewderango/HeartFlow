import React, { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogOut/LogOut'
import TerminateButton from '../../components/Terminate/Terminate'
import useStore from '@renderer/store/mainStore'
import { useToast } from '../../context/ToastContext'
import heartflowLogo from '../../assets/heartflow.png'
import { Activity, XCircle } from 'lucide-react'

interface LeftSidebarProps {
  handleTerminate: () => void
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ handleTerminate }) => {
  const {
    username,
    serialNumber,
    connectionStatus,
    telemetryStatus,
  } = useStore()
  const { addToast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return (): void => clearInterval(timer)
  }, [])

  const getStatusIcon = (): JSX.Element => {
    return connectionStatus === 'CONNECTED' ? (
      <Activity size={16} className="activity-icon" />
    ) : (
      <XCircle size={16} className="disconnected-icon" />
    )
  }

  const getStatusClass = (): string => {
    return connectionStatus === 'CONNECTED'
      ? 'communication-status'
      : 'communication-status disconnected'
  }

  return (
    <div className="sidebar">
      {/* Logo */}
      <img alt="logo" className="logo-sidebar" src={heartflowLogo} />

      {/* Welcome Section */}
      <div className="welcome-section">
        <p className="welcome-header">Welcome</p>
        {username && <p className="username">{username}</p>}
      </div>

      {/* Telemetry Status */}
      <div className="sidebar-section">
        <p className="communication-status-header">Telemetry Status</p>
        <p className={getStatusClass()}>
          {getStatusIcon()}
          {connectionStatus}
        </p>
      </div>

      {/* Current Date and Time */}
      <div className="sidebar-time">
        <p className="current-date">
          {currentTime.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <p className="current-time">
          {currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            hour12: true,
          })}
        </p>
      </div>

      {/* Bottom Sidebar Components */}
      <div className="bottom-sidebar-components">
        <div className="sidebar-versions">
          <p>HeartFlow Release: v1.0.0</p>
          {serialNumber && <p>Serial Number: {serialNumber}</p>}
        </div>
        <div className="logout-button-container">
          <LogoutButton />
        </div>
        <div className="terminate-button-container">
          <TerminateButton onTerminate={handleTerminate} disabled={telemetryStatus === 'OFF'} />
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar