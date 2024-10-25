import React, { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogOut/LogOut'
import TerminateButton from '../../components/Terminate/Terminate'
import { useUser } from '../../context/UserContext'
import { useToast } from '../../context/ToastContext'
import { Activity, HardDriveUpload, ClipboardX, Info, XCircle } from 'lucide-react'
import heartflowLogo from '../../assets/heartflow.png'
import pacemakerHeart from '../../assets/pacemaker-heart.png'
import './Dashboard.css'

function Dashboard(): JSX.Element {
  // set up states for the following:
  // - the current user via the UserContext
  // - function to add toasts via the ToastContext
  // - current time
  // - telemetry status
  // - whether the help popup is shown
  // - the selected mode
  // - the mode that was submitted
  // - whether the terminate button is disabled
  // - whether telemetry is terminated
  // - the natural heart rate
  // - the pacemaker heart rate
  const { user } = useUser()
  const { addToast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [communicationStatus, _setCommunicationStatus] = useState('CONNECTED')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedMode, setSelectedMode] = useState<'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | null>(
    null,
  )
  const [submittedMode, setSubmittedMode] = useState<'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | null>(
    null,
  )
  const [isTerminateDisabled, setIsTerminateDisabled] = useState(false)
  const [isTelemetryTerminated, setIsTelemetryTerminated] = useState(false)
  const [naturalHeartBPM, _setNaturalHeartBPM] = useState<number>(68)
  const [pacemakerBPM, _setPacemakerBPM] = useState<number>(0)

  // todo: we might need a better state solution for these values
  // these states are for the input fields
  // treat them as strings and convert to floats when needed
  const [atriumAmp, setAtriumAmp] = useState<string>('0')
  const [ventricleAmp, setVentricleAmp] = useState<string>('0')
  const [atrialPW, setAtrialPW] = useState<string>('0')
  const [ventriclePW, setVentriclePW] = useState<string>('0')
  const [atrialRP, setAtrialRP] = useState<string>('0')
  const [ventricleRP, setVentricleRP] = useState<string>('0')
  const [lowerRateLimit, setLowerRateLimit] = useState<string>('0')

  // these states are for the error handling of the input fields
  // if an error is true, the input field will have a red border
  const [atriumAmpError, setAtriumAmpError] = useState<boolean>(false)
  const [ventricleAmpError, setVentricleAmpError] = useState<boolean>(false)
  const [atrialPWError, setAtrialPWError] = useState<boolean>(false)
  const [ventriclePWError, setVentriclePWError] = useState<boolean>(false)
  const [atrialRPError, setAtrialRPError] = useState<boolean>(false)
  const [ventricleRPError, setVentricleRPError] = useState<boolean>(false)
  const [lowerRateLimitError, setLowerRateLimitError] = useState<boolean>(false)

  // set up a timer to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return (): void => clearInterval(timer)
  }, [])

  // effect hook runs when user changes
  // sets the selected mode and submitted mode to the last used mode
  useEffect(() => {
    if (user && user.lastUsedMode) {
      setSelectedMode(user.lastUsedMode)
      setSubmittedMode(user.lastUsedMode)
    }

    if (user && user.lastUsedMode === 'OFF') {
      setIsTerminateDisabled(true)
      setIsTelemetryTerminated(true)
      _setCommunicationStatus('DISCONNECTED')
    }
  }, [user])

  // handles the terminate button click
  const handleTerminate = (): void => {
    // set the mode to OFF, disable terminate button, and set telemetry terminated
    setSelectedMode('OFF')
    setSubmittedMode('OFF')
    _setCommunicationStatus('DISCONNECTED')
    setIsTerminateDisabled(true)
    setIsTelemetryTerminated(true)

    // reset error states
    setAtriumAmpError(false)
    setVentricleAmpError(false)
    setAtrialPWError(false)
    setVentriclePWError(false)
    setAtrialRPError(false)
    setVentricleRPError(false)
    setLowerRateLimitError(false)

    // reset input field values
    setAtriumAmp('0')
    setVentricleAmp('0')
    setAtrialPW('0')
    setVentriclePW('0')
    setAtrialRP('0')
    setVentricleRP('0')
    setLowerRateLimit('0')
  }

  // handles the mode selection
  const handleModeSelect = (mode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF'): void => {
    // set the selected mode, enable terminate button, and set telemetry not terminated
    setSelectedMode(mode)
    setIsTerminateDisabled(false)
    setIsTelemetryTerminated(false)

    // reset error states
    setAtriumAmpError(false)
    setVentricleAmpError(false)
    setAtrialPWError(false)
    setVentriclePWError(false)
    setAtrialRPError(false)
    setVentricleRPError(false)
    setLowerRateLimitError(false)
  }

  // helper function to get appropriate icon based on communication status
  const getStatusIcon = (): JSX.Element => {
    return communicationStatus === 'CONNECTED' ? (
      <Activity size={16} className="activity-icon" />
    ) : (
      <XCircle size={16} className="disconnected-icon" />
    )
  }

  // helper function to get appropriate class based on communication status
  const getStatusClass = (): string => {
    return communicationStatus === 'CONNECTED'
      ? 'communication-status'
      : 'communication-status disconnected'
  }

  // handles the input change for the input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // get the name and value from the event
    const { name, value } = e.target
    // check if only numbers and decimals are entered w/ regex
    if (!/^\d*\.?\d*$/.test(value)) {
      return
    }
    // set the appropriate state variable based on the input field name from
    // the event
    switch (name) {
      case 'atriumAmp':
        setAtriumAmp(value)
        break
      case 'ventricleAmp':
        setVentricleAmp(value)
        break
      case 'atrialPW':
        setAtrialPW(value)
        break
      case 'ventriclePW':
        setVentriclePW(value)
        break
      case 'atrialRP':
        setAtrialRP(value)
        break
      case 'ventricleRP':
        setVentricleRP(value)
        break
      case 'lowerRateLimit':
        setLowerRateLimit(value)
        break
      default:
        break
    }
  }

  // handles the discard button click
  const handleDiscard = async (): Promise<void> => {
    // reset error states
    setAtriumAmpError(false)
    setVentricleAmpError(false)
    setAtrialPWError(false)
    setVentriclePWError(false)
    setAtrialRPError(false)
    setVentricleRPError(false)
    setLowerRateLimitError(false)

    // just set the values back to previous values based on the submitted mode
    switch (submittedMode) {
      case 'AOO': {
        // get the settings for the mode via ipc
        const aooSettings = await window.api.getSettingsForMode(user?.username ?? '', 'AOO')
        // then update appropriate state variables, converted to strings
        setSelectedMode('AOO')
        setAtriumAmp((aooSettings.settings?.atrialAmplitude ?? 0).toString())
        setAtrialPW((aooSettings.settings?.atrialPulseWidth ?? 0).toString())
        setAtrialRP((aooSettings.settings?.atrialRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((aooSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'VOO': {
        const vooSettings = await window.api.getSettingsForMode(user?.username ?? '', 'VOO')
        setSelectedMode('VOO')
        setVentricleAmp((vooSettings.settings?.ventricularAmplitude ?? 0).toString())
        setVentriclePW((vooSettings.settings?.ventricularPulseWidth ?? 0).toString())
        setVentricleRP((vooSettings.settings?.ventricularRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((vooSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'AAI': {
        const aaiSettings = await window.api.getSettingsForMode(user?.username ?? '', 'AAI')
        setSelectedMode('AAI')
        setAtriumAmp((aaiSettings.settings?.atrialAmplitude ?? 0).toString())
        setAtrialPW((aaiSettings.settings?.atrialPulseWidth ?? 0).toString())
        setAtrialRP((aaiSettings.settings?.atrialRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((aaiSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'VVI': {
        const vviSettings = await window.api.getSettingsForMode(user?.username ?? '', 'VVI')
        setSelectedMode('VVI')
        setVentricleAmp((vviSettings.settings?.ventricularAmplitude ?? 0).toString())
        setVentriclePW((vviSettings.settings?.ventricularPulseWidth ?? 0).toString())
        setVentricleRP((vviSettings.settings?.ventricularRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((vviSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'OFF':
        setSelectedMode('OFF')
        setIsTerminateDisabled(true)
        setIsTelemetryTerminated(true)
        _setCommunicationStatus('DISCONNECTED')
        break
      default:
        break
    }

    addToast('Settings discarded', 'info')
  }

  // helper function to validate the input fields
  const validateInput = (): boolean => {
    let isValid = true

    // make sure the values are within the acceptable ranges
    // if not, set the error state to true and display a toast
    // otherwise, set the error state to false
    if (selectedMode === 'AOO' || selectedMode === 'AAI') {
      if (parseFloat(atriumAmp) < 0 || parseFloat(atriumAmp) > 5) {
        addToast('Atrium Amplitude must be between 0.5 and 5 mV', 'error')
        setAtriumAmpError(true)
        isValid = false
      } else {
        setAtriumAmpError(false)
      }
      if (parseFloat(atrialPW) < 0.05 || parseFloat(atrialPW) > 1.9) {
        addToast('Atrial Pulse Width must be between 0.05 and 1.9 ms', 'error')
        setAtrialPWError(true)
        isValid = false
      } else {
        setAtrialPWError(false)
      }
      if (parseFloat(atrialRP) < 150 || parseFloat(atrialRP) > 500) {
        addToast('Atrial Refractory Period must be between 150 and 500 ms', 'error')
        setAtrialRPError(true)
        isValid = false
      } else {
        setAtrialRPError(false)
      }
    } else if (selectedMode === 'VOO' || selectedMode === 'VVI') {
      if (parseFloat(ventricleAmp) < 0 || parseFloat(ventricleAmp) > 5) {
        addToast('Ventricle Amplitude must be between 0.5 and 5 mV', 'error')
        setVentricleAmpError(true)
        isValid = false
      } else {
        setVentricleAmpError(false)
      }
      if (parseFloat(ventriclePW) < 0.05 || parseFloat(ventriclePW) > 1.9) {
        addToast('Ventricular Pulse Width must be between 0.05 and 1.9 ms', 'error')
        setVentriclePWError(true)
        isValid = false
      } else {
        setVentriclePWError(false)
      }
      if (parseFloat(ventricleRP) < 150 || parseFloat(ventricleRP) > 500) {
        addToast('Ventricular Refractory Period must be between 150 and 500 ms', 'error')
        setVentricleRPError(true)
        isValid = false
      } else {
        setVentricleRPError(false)
      }
    }

    if (parseFloat(lowerRateLimit) <= 30 || parseFloat(lowerRateLimit) >= 175) {
      addToast('Lower Rate Limit must be between 30 and 175 bpm', 'error')
      setLowerRateLimitError(true)
      isValid = false
    }

    return isValid
  }

  // handles the submit button click
  const handleSubmit = async (_e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    // quit early if the mode is OFF or there is no user
    if (selectedMode === 'OFF') {
      return
    }
    if (!user) {
      return
    }

    // quit early if the input is not valid
    const isValid = validateInput()
    if (!isValid) {
      return
    }

    // reset error states
    setAtriumAmpError(false)
    setVentricleAmpError(false)
    setAtrialPWError(false)
    setVentriclePWError(false)
    setAtrialRPError(false)
    setVentricleRPError(false)
    setLowerRateLimitError(false)

    // e.preventDefault()
    // based on selected mode, call the appropriate ipc channel with
    // right settings
    switch (selectedMode) {
      case 'AOO':
        if (atriumAmp !== '' && atrialPW !== '' && atrialRP !== '' && lowerRateLimit !== '') {
          // ipc channel sets the values for the mode for given user
          window.api.setUser(user.username, 'AOO', {
            atrialAmplitude: parseFloat(atriumAmp),
            atrialPulseWidth: parseFloat(atrialPW),
            atrialRefractoryPeriod: parseFloat(atrialRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          console.log(
            `User: ${user.username}, Mode: AOO, Settings: ${atriumAmp}, ${atrialPW}, ${atrialRP}, ${lowerRateLimit}`,
          )
          setSubmittedMode('AOO')
        }
        break
      case 'VOO':
        if (
          ventricleAmp !== '' &&
          ventriclePW !== '' &&
          ventricleRP !== '' &&
          lowerRateLimit !== ''
        ) {
          window.api.setUser(user.username, 'VOO', {
            ventricularAmplitude: parseFloat(ventricleAmp),
            ventricularPulseWidth: parseFloat(ventriclePW),
            ventricularRefractoryPeriod: parseFloat(ventricleRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          console.log(
            `User: ${user.username}, Mode: VOO, Settings: ${ventricleAmp}, ${ventriclePW}, ${ventricleRP}, ${lowerRateLimit}`,
          )
          setSubmittedMode('VOO')
        }
        setSubmittedMode('VOO')
        break
      case 'AAI':
        if (atriumAmp !== '' && atrialPW !== '' && atrialRP !== '' && lowerRateLimit !== '') {
          window.api.setUser(user.username, 'AAI', {
            atrialAmplitude: parseFloat(atriumAmp),
            atrialPulseWidth: parseFloat(atrialPW),
            atrialRefractoryPeriod: parseFloat(atrialRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          console.log(
            `User: ${user.username}, Mode: AAI, Settings: ${atriumAmp}, ${atrialPW}, ${atrialRP}, ${lowerRateLimit}`,
          )
        }
        setSubmittedMode('AAI')
        break
      case 'VVI':
        if (
          ventricleAmp !== '' &&
          ventriclePW !== '' &&
          ventricleRP !== '' &&
          lowerRateLimit !== ''
        ) {
          window.api.setUser(user.username, 'VVI', {
            ventricularAmplitude: parseFloat(ventricleAmp),
            ventricularPulseWidth: parseFloat(ventriclePW),
            ventricularRefractoryPeriod: parseFloat(ventricleRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          console.log(
            `User: ${user.username}, Mode: VVI, Settings: ${ventricleAmp}, ${ventriclePW}, ${ventricleRP}, ${lowerRateLimit}`,
          )
        }
        setSubmittedMode('VVI')
        break
      default:
        console.log('Invalid mode')
        break
    }

    addToast('Settings sent and saved', 'success')
    _setCommunicationStatus('CONNECTED')
  }

  // effect hook to check if the input fields are filled
  // if they are, update the CSS class to filled for nice animations
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
  }, [
    atriumAmp,
    ventricleAmp,
    atrialPW,
    ventriclePW,
    atrialRP,
    ventricleRP,
    lowerRateLimit,
    selectedMode,
  ])

  // populate settings for selected mode on initial mount and when mode changes
  useEffect(() => {
    // quit early if there is no user or mode selected
    if (!user || !selectedMode) {
      return
    }

    // now get the settings for the selected mode via ipc
    window.api.getSettingsForMode(user.username, selectedMode).then((response) => {
      if (response.success) {
        const settings = response.settings
        // and set the appropriate state variables based on the mode
        switch (selectedMode) {
          case 'AOO':
            setAtriumAmp((settings?.atrialAmplitude ?? 0).toString())
            setAtrialPW((settings?.atrialPulseWidth ?? 0).toString())
            setAtrialRP((settings?.atrialRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'VOO':
            setVentricleAmp((settings?.ventricularAmplitude ?? 0).toString())
            setVentriclePW((settings?.ventricularPulseWidth ?? 0).toString())
            setVentricleRP((settings?.ventricularRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'AAI':
            setAtriumAmp((settings?.atrialAmplitude ?? 0).toString())
            setAtrialPW((settings?.atrialPulseWidth ?? 0).toString())
            setAtrialRP((settings?.atrialRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'VVI':
            setVentricleAmp((settings?.ventricularAmplitude ?? 0).toString())
            setVentriclePW((settings?.ventricularPulseWidth ?? 0).toString())
            setVentricleRP((settings?.ventricularRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          default:
            break
        }
      }
    })
  }, [user, selectedMode])

  // toggle help popup
  const toggleHelp = (): void => {
    setShowHelp(!showHelp)
  }

  // variables to disable input fields based on selected mode
  const isAtriumDisabled = selectedMode === 'VOO' || selectedMode === 'VVI' || isTelemetryTerminated
  const isVentricleDisabled =
    selectedMode === 'AOO' || selectedMode === 'AAI' || isTelemetryTerminated

  // return the actual JSX component
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
          <p className={getStatusClass()}>
            {getStatusIcon()}
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
            <TerminateButton onTerminate={handleTerminate} disabled={isTerminateDisabled} />
          </div>
        </div>
      </div>
      <div className="main-content">
        <img
          alt="pacemaker heart"
          className={submittedMode === 'OFF' ? 'pacemaker-heart-stop' : 'pacemaker-heart'}
          src={pacemakerHeart}
        />
        <div className="stats-container">
          <div className="bpm-container">
            <div className="bpm-box">
              <h3>Current Mode</h3>
              <p>{submittedMode}</p>
            </div>
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
            <div className={`input-container ${atriumAmpError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={isAtriumDisabled ? '' : atriumAmp}
                name="atriumAmp"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrium AMP</label>
            </div>
            <div className={`input-container ${ventricleAmpError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={isVentricleDisabled ? '' : ventricleAmp}
                name="ventricleAmp"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle AMP</label>
            </div>
          </div>
          <div className="input-row">
            <div className={`input-container ${atrialPWError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={isAtriumDisabled ? '' : atrialPW}
                name="atrialPW"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrium PW</label>
            </div>
            <div className={`input-container ${ventriclePWError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={isVentricleDisabled ? '' : ventriclePW}
                name="ventriclePW"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle PW</label>
            </div>
          </div>
          <div className="input-row">
            <div className={`input-container ${atrialRPError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={isAtriumDisabled ? '' : atrialRP}
                name="atrialRP"
              />
              <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrial RP</label>
            </div>
            <div className={`input-container ${ventricleRPError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isVentricleDisabled}
                value={isVentricleDisabled ? '' : ventricleRP}
                name="ventricleRP"
              />
              <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricular RP</label>
            </div>
          </div>
          <div className="input-row">
            <div
              className={`input-container-long ${lowerRateLimitError ? 'validation-error' : ''}`}
            >
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isTelemetryTerminated}
                value={isTelemetryTerminated ? '' : lowerRateLimit}
                name="lowerRateLimit"
              />
              <label className={isVentricleDisabled && isAtriumDisabled ? 'disabled-label' : ''}>
                Lower Rate Limit
              </label>
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
