import React, { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogOut/LogOut'
import TerminateButton from '../../components/Terminate/Terminate'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'
import { Activity, HardDriveUpload, ClipboardX, Info } from 'lucide-react'
import heartflowLogo from '../../assets/heartflow.png'
import pacemakerHeart from '../../assets/pacemaker-heart.png'
import './Dashboard.css'

function Dashboard(): JSX.Element {
  const { user } = useUser()
  const { addToast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [communicationStatus, _setCommunicationStatus] = useState('CONNECTED')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedMode, setSelectedMode] = useState<'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | null>(
    null,
  )
  const [naturalHeartBPM, _setNaturalHeartBPM] = useState<number>(42)
  const [pacemakerBPM, _setPacemakerBPM] = useState<number>(19)

  // todo: we might need a better state solution for these values
  const [atriumAmp, setAtriumAmp] = useState<number>(0)
  const [ventricleAmp, setVentricleAmp] = useState<number>(0)
  const [atrialPW, setAtrialPW] = useState<number>(0)
  const [ventriclePW, setVentriclePW] = useState<number>(0)
  const [atrialRP, setAtrialRP] = useState<number>(0)
  const [ventricleRP, setVentricleRP] = useState<number>(0)
  const [lowerRateLimit, setLowerRateLimit] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return (): void => clearInterval(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    const numericValue = value === '' ? null : parseInt(e.target.value)
    switch (name) {
      case 'atriumAmp':
        setAtriumAmp(numericValue ?? 0)
        break
      case 'ventricleAmp':
        setVentricleAmp(numericValue ?? 0)
        break
      case 'atrialPW':
        setAtrialPW(numericValue ?? 0)
        break
      case 'ventriclePW':
        setVentriclePW(numericValue ?? 0)
        break
      case 'atrialRP':
        setAtrialRP(numericValue ?? 0)
        break
      case 'ventricleRP':
        setVentricleRP(numericValue ?? 0)
        break
      case 'lowerRateLimit':
        setLowerRateLimit(numericValue ?? 0)
        break
      default:
        break
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!selectedMode) {
      return
    }

    if (!user) {
      return
    }

    e.preventDefault()
    switch (selectedMode) {
      case 'AOO':
        if (atriumAmp && atrialPW && atrialRP && lowerRateLimit) {
          window.api.setUser(user.username, 'AOO', {
            atrialAmplitude: atriumAmp,
            atrialPulseWidth: atrialPW,
            atrialRefractoryPeriod: atrialRP,
            lowerRateLimit,
          })
          console.log(
            `User: ${user.username}, Mode: AOO, Settings: ${atriumAmp}, ${atrialPW}, ${atrialRP}, ${lowerRateLimit}`,
          )
        }
        break
      case 'VOO':
        if (ventricleAmp && ventriclePW && ventricleRP && lowerRateLimit) {
          window.api.setUser(user.username, 'VOO', {
            ventricularAmplitude: ventricleAmp,
            ventricularPulseWidth: ventriclePW,
            ventricularRefractoryPeriod: ventricleRP,
            lowerRateLimit,
          })
          console.log(
            `User: ${user.username}, Mode: VOO, Settings: ${ventricleAmp}, ${ventriclePW}, ${ventricleRP}, ${lowerRateLimit}`,
          )
        }
        break
      case 'AAI':
        if (atriumAmp && atrialPW && atrialRP && lowerRateLimit) {
          window.api.setUser(user.username, 'AAI', {
            atrialAmplitude: atriumAmp,
            atrialPulseWidth: atrialPW,
            atrialRefractoryPeriod: atrialRP,
            lowerRateLimit,
          })
          console.log(
            `User: ${user.username}, Mode: AAI, Settings: ${atriumAmp}, ${atrialPW}, ${atrialRP}, ${lowerRateLimit}`,
          )
        }
        break
      case 'VVI':
        if (ventricleAmp && ventriclePW && ventricleRP && lowerRateLimit) {
          window.api.setUser(user.username, 'VVI', {
            ventricularAmplitude: ventricleAmp,
            ventricularPulseWidth: ventriclePW,
            ventricularRefractoryPeriod: ventricleRP,
            lowerRateLimit,
          })
          console.log(
            `User: ${user.username}, Mode: VVI, Settings: ${ventricleAmp}, ${ventriclePW}, ${ventricleRP}, ${lowerRateLimit}`,
          )
        }
        break
      default:
        console.log('Invalid mode')
        break
    }

    addToast('Settings sent and saved', 'success')
  }

  const handleDiscard = async (): Promise<void> => {
    // just set the values back to previous values
    switch (selectedMode) {
      case 'AOO': {
        const aooSettings = await window.api.getSettingsForMode(user?.username ?? '', 'AOO')
        setAtriumAmp(aooSettings.settings?.atrialAmplitude ?? 0)
        setAtrialPW(aooSettings.settings?.atrialPulseWidth ?? 0)
        setAtrialRP(aooSettings.settings?.atrialRefractoryPeriod ?? 0)
        setLowerRateLimit(aooSettings.settings?.lowerRateLimit ?? 0)
        break
      }
      case 'VOO': {
        const vooSettings = await window.api.getSettingsForMode(user?.username ?? '', 'VOO')
        setVentricleAmp(vooSettings.settings?.ventricularAmplitude ?? 0)
        setVentriclePW(vooSettings.settings?.ventricularPulseWidth ?? 0)
        setVentricleRP(vooSettings.settings?.ventricularRefractoryPeriod ?? 0)
        setLowerRateLimit(vooSettings.settings?.lowerRateLimit ?? 0)
        break
      }
      case 'AAI': {
        const aaiSettings = await window.api.getSettingsForMode(user?.username ?? '', 'AAI')
        setAtriumAmp(aaiSettings.settings?.atrialAmplitude ?? 0)
        setAtrialPW(aaiSettings.settings?.atrialPulseWidth ?? 0)
        setAtrialRP(aaiSettings.settings?.atrialRefractoryPeriod ?? 0)
        setLowerRateLimit(aaiSettings.settings?.lowerRateLimit ?? 0)
        break
      }
      case 'VVI': {
        const vviSettings = await window.api.getSettingsForMode(user?.username ?? '', 'VVI')
        setVentricleAmp(vviSettings.settings?.ventricularAmplitude ?? 0)
        setVentriclePW(vviSettings.settings?.ventricularPulseWidth ?? 0)
        setVentricleRP(vviSettings.settings?.ventricularRefractoryPeriod ?? 0)
        setLowerRateLimit(vviSettings.settings?.lowerRateLimit ?? 0)
        break
      }
      default:
        break
    }

    addToast('Settings discarded', 'info')
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('.input-field')
    inputs.forEach((input) => {
      const value = input.getAttribute('value')
      if (value !== '') {
        input.classList.add('filled')
      } else {
        input.classList.remove('filled')
      }
    })
  }, [atriumAmp, ventricleAmp, atrialPW, ventriclePW, atrialRP, ventricleRP, lowerRateLimit])

  // useEffect for last-used mode
  useEffect(() => {
    if (!user) {
      return
    }

    setSelectedMode(user.lastUsedMode ?? null)
  }, [user, setSelectedMode])

  // populate settings for selected mode
  useEffect(() => {
    if (!user || !selectedMode) {
      return
    }

    window.api.getSettingsForMode(user.username, selectedMode).then((response) => {
      if (response.success) {
        const settings = response.settings
        switch (selectedMode) {
          case 'AOO':
            setAtriumAmp(settings?.atrialAmplitude ?? 0)
            setAtrialPW(settings?.atrialPulseWidth ?? 0)
            setAtrialRP(settings?.atrialRefractoryPeriod ?? 0)
            setLowerRateLimit(settings?.lowerRateLimit ?? 0)
            break
          case 'VOO':
            setVentricleAmp(settings?.ventricularAmplitude ?? 0)
            setVentriclePW(settings?.ventricularPulseWidth ?? 0)
            setVentricleRP(settings?.ventricularRefractoryPeriod ?? 0)
            setLowerRateLimit(settings?.lowerRateLimit ?? 0)
            break
          case 'AAI':
            setAtriumAmp(settings?.atrialAmplitude ?? 0)
            setAtrialPW(settings?.atrialPulseWidth ?? 0)
            setAtrialRP(settings?.atrialRefractoryPeriod ?? 0)
            setLowerRateLimit(settings?.lowerRateLimit ?? 0)
            break
          case 'VVI':
            setVentricleAmp(settings?.ventricularAmplitude ?? 0)
            setVentriclePW(settings?.ventricularPulseWidth ?? 0)
            setVentricleRP(settings?.ventricularRefractoryPeriod ?? 0)
            setLowerRateLimit(settings?.lowerRateLimit ?? 0)
            break
          default:
            break
        }
      }
    })
  }, [user, selectedMode])

  const toggleHelp = (): void => {
    setShowHelp(!showHelp)
  }

  const handleModeSelect = (mode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF'): void => {
    setSelectedMode(mode)
  }

  const isAtriumDisabled = selectedMode === 'VOO' || selectedMode === 'VVI'
  const isVentricleDisabled = selectedMode === 'AOO' || selectedMode === 'AAI'

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
              <li>
                <strong>Atrium Amp:</strong> Amplitude of the atrial pulse (mV)
              </li>
              <li>
                <strong>Ventricle Amp:</strong> Amplitude of the ventricular pulse (mV)
              </li>
              <li>
                <strong>Atrial PW:</strong> Pulse width of the atrial pulse (ms)
              </li>
              <li>
                <strong>Ventricle PW:</strong> Pulse width of the ventricular pulse (ms)
              </li>
              <li>
                <strong>Atrial RP:</strong> Refractory period of the atrial pulse (ms)
              </li>
              <li>
                <strong>Ventricular RP:</strong> Refractory period of the ventricular pulse (ms)
              </li>
              <li>
                <strong>Lower Rate Limit:</strong> Minimum heart rate (bpm)
              </li>
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
            {(['AOO', 'VOO', 'AAI', 'VVI'] as const).map((mode) => (
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
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={atriumAmp?.toString()}
                name="atriumAmp"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrium AMP</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={ventricleAmp?.toString()}
                name="ventricleAmp"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle AMP</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={atrialPW?.toString()}
                name="atrialPW"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrium PW</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={ventriclePW?.toString()}
                name="ventriclePW"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle PW</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={atrialRP?.toString()}
                name="atrialRP"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrial RP</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={ventricleRP?.toString()}
                name="ventricleRP"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricular RP</label>
            </div>
          </div>
          <div className="input-row">
            <div className="input-container-long">
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                value={lowerRateLimit?.toString()}
                name="lowerRateLimit"
              />
              <label>Lower Rate Limit</label>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="submit-button" type="button" onClick={handleSubmit}>
            <HardDriveUpload size={16} />
            <span>Submit</span>
          </button>
          <button className="discard-button" type="button" onClick={handleDiscard}>
            <ClipboardX size={16} />
            <span>Discard</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
