import React, { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogOut/LogOut'
import TerminateButton from '../../components/Terminate/Terminate'
import { useUser } from '../../context/UserContext'
import { Activity, HardDriveUpload, ClipboardX, Info } from 'lucide-react'
import heartflowLogo from '../../assets/heartflow.png'
import pacemakerHeart from '../../assets/pacemaker-heart.png'
import './Dashboard.css'

function Dashboard(): JSX.Element {
  const { user } = useUser()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [communicationStatus, setCommunicationStatus] = useState('CONNECTED')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [naturalHeartBPM, setNaturalHeartBPM] = useState<number>(42)
  const [pacemakerBPM, setPacemakerBPM] = useState<number>(19)
  const [combinedBPM, setCombinedBPM] = useState<number>(61)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value !== '') {
      e.target.classList.add('filled')
    } else {
      e.target.classList.remove('filled')
    }
  }

  const toggleHelp = (): void => {
    setShowHelp(!showHelp)
  }

  const handleModeSelect = (mode: string): void => {
    setSelectedMode(mode)
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img alt="logo" className="logo-sidebar" src={heartflowLogo} />
        <div className="welcome-section">
          <p className="welcome-header">Welcome</p>
          {user && <p className="username">{user.username}</p>}
        </div>
        <div className="sidebar-section">
          <p className="communication-status-header">Telemetry Status</p>
          <p className="communication-status">
            <Activity size={16} className="activity-icon" />
            {communicationStatus}
          </p>
        </div>
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
        <div className="bottom-sidebar-components">
          <div className="sidebar-versions">
            <p>HeartFlow Release: v1.0.0</p>
            {user && <p>Serial Number: {user.serialNumber}</p>}
          </div>
          <div className="logout-button-container">
            <LogoutButton />
          </div>
          <div className="terminate-button-container">
            <TerminateButton />
          </div>
        </div>
      </div>
      <div className="main-content">
        <img alt="pacemaker heart" className="pacemaker-heart" src={pacemakerHeart} />
        <div className="bpm-container">
          <div className="bpm-box">
            <h3>Natural BPM</h3>
            <p>{naturalHeartBPM}</p>
          </div>
          <div className="bpm-box">
            <h3>Pacemaker BPM</h3>
            <p>{pacemakerBPM}</p>
          </div>
          <div className="bpm-box">
            <h3>Combined BPM</h3>
            <p>{combinedBPM}</p>
          </div>
        </div>
      </div>
      <div className="right-sidebar">
        <div className="help-button-container">
          <button className="help-button" onClick={toggleHelp}>
            <Info size={14} />
          </button>
        </div>
        {showHelp && (
          <div className="help-popup">
            <h3>Pulse Parameters</h3>
            <ul>
              <li><strong>Atrium Amp:</strong> Amplitude of the atrial pulse (mV)</li>
              <li><strong>Ventricle Amp:</strong> Amplitude of the ventricular pulse (mV)</li>
              <li><strong>Atrial PW:</strong> Pulse width of the atrial pulse (ms)</li>
              <li><strong>Ventricle PW:</strong> Pulse width of the ventricular pulse (ms)</li>
              <li><strong>Atrial RP:</strong> Refractory period of the atrial pulse (ms)</li>
              <li><strong>Ventricular RP:</strong> Refractory period of the ventricular pulse (ms)</li>
              <li><strong>Lower Rate Limit:</strong> Minimum heart rate (bpm)</li>
            </ul>
          </div>
        )}
        <div className="header-container">
          <h2>Pacemaker Parameters</h2>
          <hr></hr>
        </div>
        <div className="mode-container">
          <h3>Mode Selection</h3>
          <div className="button-row">
            {['AOO', 'VOO', 'AAI', 'VII'].map((mode) => (
              <button
                key={mode}
                className={`mode-button ${selectedMode === mode ? 'selected' : ''}`}
                onClick={() => handleModeSelect(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <div className="parameter-container">
          <h3>Continuous Parameters</h3>
          <div className="input-row">
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Atrium AMP</label>
            </div>
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Ventricle AMP</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Atrial PW</label>
            </div>
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Ventricle PW</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Atrial RP</label>
            </div>
            <div className="input-container">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Ventricular RP</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container-long">
              <input type="text" className="input-field" onChange={handleInputChange} />
              <label>Lower Rate Limit</label>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="submit-button" type="button">
            <HardDriveUpload size={16} />
            <span>Submit</span>
          </button>
          <button className="discard-button" type="button">
            <ClipboardX size={16} />
            <span>Discard</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard