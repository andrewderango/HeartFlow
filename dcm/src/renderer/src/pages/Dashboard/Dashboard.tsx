import React, { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogOut/LogOut'
import TerminateButton from '../../components/Terminate/Terminate'
import useStore from '@renderer/store/mainStore'
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

  // for now we'll only test the user state
  const {
    username,
    serialNumber,
    lastUsedMode,
    connectionStatus,
    telemetryStatus,
    telemetry,
    currentMode,
    modes,
    dispatch,
  } = useStore()

  const { addToast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showHelp, setShowHelp] = useState(false)
  const [submittedMode, setSubmittedMode] = useState<'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | null>(
    null,
  )

  // ! we should probably remove this
  const [pacemakerBPM, _setPacemakerBPM] = useState<number>(0)

  // todo: we might need a better state solution for these values
  // these states are for the input fields
  // treat them as strings and convert to floats when needed
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

  // have to convert the variables to state variables to force a rerender
  const [isAtriumDisabled, setIsAtriumDisabled] = useState<boolean>(false)
  const [isVentricleDisabled, setIsVentricleDisabled] = useState<boolean>(false)

  useEffect(() => {
    setIsAtriumDisabled(currentMode === 'VOO' || currentMode === 'VVI' || currentMode === 'OFF')
    setIsVentricleDisabled(currentMode === 'AOO' || currentMode === 'AAI' || currentMode === 'OFF')
  }, [currentMode])

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
    if (lastUsedMode) {
      setSubmittedMode(lastUsedMode)
      dispatch({ type: 'UPDATE_CURRENT_MODE', payload: lastUsedMode })
      dispatch({ type: 'UPDATE_TELEMETRY_STATUS', payload: 'ON' })
      dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'CONNECTED' })
    }

    if (lastUsedMode === 'OFF') {
      dispatch({ type: 'UPDATE_TELEMETRY_STATUS', payload: 'OFF' })
      dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })
    }
  }, [lastUsedMode])

  // handles the terminate button click
  const handleTerminate = (): void => {
    // set the mode to OFF, disable terminate button, and set telemetry terminated
    setSubmittedMode('OFF')
    dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'OFF' })
    dispatch({ type: 'UPDATE_TELEMETRY_STATUS', payload: 'OFF' })
    dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })

    // reset error states
    setAtriumAmpError(false)
    setVentricleAmpError(false)
    setAtrialPWError(false)
    setVentriclePWError(false)
    setAtrialRPError(false)
    setVentricleRPError(false)
    setLowerRateLimitError(false)

    // todo: figure out if we want to reset the input fields after
    // todo: terminating telemetry. this may change.
  }

  // handles the mode selection
  const handleModeSelect = (mode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF'): void => {
    // set the selected mode, enable terminate button, and set telemetry not terminated
    dispatch({ type: 'UPDATE_CURRENT_MODE', payload: mode })

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
    return connectionStatus === 'CONNECTED' ? (
      <Activity size={16} className="activity-icon" />
    ) : (
      <XCircle size={16} className="disconnected-icon" />
    )
  }

  // helper function to get appropriate class based on communication status
  const getStatusClass = (): string => {
    return connectionStatus === 'CONNECTED'
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
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { atrialAmplitude: parseFloat(value) || 0 },
          },
        })
        break
      case 'ventricleAmp':
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { ventricularAmplitude: parseFloat(value) || 0 },
          },
        })
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
        const aooSettings = await window.api.getSettingsForMode(username ?? '', 'AOO')
        // then update appropriate state variables, converted to strings
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'AOO' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'AOO',
            settings: {
              atrialAmplitude: aooSettings.settings?.atrialAmplitude ?? 0,
              atrialPulseWidth: aooSettings.settings?.atrialPulseWidth ?? 0,
              atrialRefractoryPeriod: aooSettings.settings?.atrialRefractoryPeriod ?? 0,
              lowerRateLimit: aooSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        // these will be removed once we have the above dispatch working
        setAtrialPW((aooSettings.settings?.atrialPulseWidth ?? 0).toString())
        setAtrialRP((aooSettings.settings?.atrialRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((aooSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'VOO': {
        // get the settings for the mode via ipc
        const vooSettings = await window.api.getSettingsForMode(username ?? '', 'VOO')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'VOO' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'VOO',
            settings: {
              ventricularAmplitude: vooSettings.settings?.ventricularAmplitude ?? 0,
              ventricularPulseWidth: vooSettings.settings?.ventricularPulseWidth ?? 0,
              ventricularRefractoryPeriod: vooSettings.settings?.ventricularRefractoryPeriod ?? 0,
              lowerRateLimit: vooSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })
        setVentriclePW((vooSettings.settings?.ventricularPulseWidth ?? 0).toString())
        setVentricleRP((vooSettings.settings?.ventricularRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((vooSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'AAI': {
        // get the settings for the mode via ipc
        const aaiSettings = await window.api.getSettingsForMode(username ?? '', 'AAI')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'AAI' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'AAI',
            settings: {
              atrialAmplitude: aaiSettings.settings?.atrialAmplitude ?? 0,
              atrialPulseWidth: aaiSettings.settings?.atrialPulseWidth ?? 0,
              atrialRefractoryPeriod: aaiSettings.settings?.atrialRefractoryPeriod ?? 0,
              lowerRateLimit: aaiSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        setAtrialPW((aaiSettings.settings?.atrialPulseWidth ?? 0).toString())
        setAtrialRP((aaiSettings.settings?.atrialRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((aaiSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'VVI': {
        // get the settings for the mode via ipc
        const vviSettings = await window.api.getSettingsForMode(username ?? '', 'VVI')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'VVI' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'VVI',
            settings: {
              ventricularAmplitude: vviSettings.settings?.ventricularAmplitude ?? 0,
              ventricularPulseWidth: vviSettings.settings?.ventricularPulseWidth ?? 0,
              ventricularRefractoryPeriod: vviSettings.settings?.ventricularRefractoryPeriod ?? 0,
              lowerRateLimit: vviSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        setVentriclePW((vviSettings.settings?.ventricularPulseWidth ?? 0).toString())
        setVentricleRP((vviSettings.settings?.ventricularRefractoryPeriod ?? 0).toString())
        setLowerRateLimit((vviSettings.settings?.lowerRateLimit ?? 0).toString())
        break
      }
      case 'OFF':
        // if the mode is OFF, set the mode to OFF, disable terminate button,
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'OFF' })
        dispatch({ type: 'UPDATE_TELEMETRY_STATUS', payload: 'OFF' })
        dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'DISCONNECTED' })
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
    if (currentMode === 'AOO' || currentMode === 'AAI') {
      if (modes[currentMode].atrialAmplitude < 0 || modes[currentMode].atrialAmplitude > 5) {
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
    } else if (currentMode === 'VOO' || currentMode === 'VVI') {
      if (
        modes[currentMode].ventricularAmplitude < 0 ||
        modes[currentMode].ventricularAmplitude > 5
      ) {
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
    if (currentMode === 'OFF') {
      return
    }
    if (!username) {
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
    switch (currentMode) {
      case 'AOO':
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          atrialPW !== '' &&
          atrialRP !== '' &&
          lowerRateLimit !== ''
        ) {
          // ipc channel sets the values for the mode for given user
          // ! we also might wanna fix how we get the values here
          window.api.setUser(username, 'AOO', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: parseFloat(atrialPW),
            atrialRefractoryPeriod: parseFloat(atrialRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          setSubmittedMode('AOO')
        }
        break
      case 'VOO':
        // same as above, but for VOO
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          ventriclePW !== '' &&
          ventricleRP !== '' &&
          lowerRateLimit !== ''
        ) {
          window.api.setUser(username, 'VOO', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: parseFloat(ventriclePW),
            ventricularRefractoryPeriod: parseFloat(ventricleRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
          setSubmittedMode('VOO')
        }
        setSubmittedMode('VOO')
        break
      case 'AAI':
        // same as above, but for AAI
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          atrialPW !== '' &&
          atrialRP !== '' &&
          lowerRateLimit !== ''
        ) {
          window.api.setUser(username, 'AAI', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: parseFloat(atrialPW),
            atrialRefractoryPeriod: parseFloat(atrialRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
        }
        setSubmittedMode('AAI')
        break
      case 'VVI':
        // same as above, but for VVI
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          ventriclePW !== '' &&
          ventricleRP !== '' &&
          lowerRateLimit !== ''
        ) {
          window.api.setUser(username, 'VVI', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: parseFloat(ventriclePW),
            ventricularRefractoryPeriod: parseFloat(ventricleRP),
            lowerRateLimit: parseFloat(lowerRateLimit),
          })
        }
        setSubmittedMode('VVI')
        break
      default:
        console.log('Invalid mode')
        break
    }

    addToast('Settings sent and saved', 'success')
    dispatch({ type: 'UPDATE_TELEMETRY_STATUS', payload: 'ON' })
    dispatch({ type: 'UPDATE_CONNECTION_STATUS', payload: 'CONNECTED' })
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
    modes[currentMode]?.atrialAmplitude,
    modes[currentMode]?.ventricularAmplitude,
    atrialPW,
    ventriclePW,
    atrialRP,
    ventricleRP,
    lowerRateLimit,
    currentMode,
  ])

  // populate settings for selected mode on initial mount and when mode changes
  useEffect(() => {
    // quit early if there is no user or mode selected
    if (!currentMode) {
      return
    }

    // now get the settings for the selected mode via ipc
    window.api.getSettingsForMode(username, currentMode).then((response) => {
      if (response.success) {
        const settings = response.settings
        // and set the appropriate state variables based on the mode
        switch (currentMode) {
          case 'AOO':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'AOO',
                settings: {
                  atrialAmplitude: settings?.atrialAmplitude ?? 0,
                  atrialPulseWidth: settings?.atrialPulseWidth ?? 0,
                  atrialRefractoryPeriod: settings?.atrialRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            // ? everything below this is probably gonna be removed too
            // ? once we have the above dispatch working
            setAtrialPW((settings?.atrialPulseWidth ?? 0).toString())
            setAtrialRP((settings?.atrialRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'VOO':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'VOO',
                settings: {
                  ventricularAmplitude: settings?.ventricularAmplitude ?? 0,
                  ventricularPulseWidth: settings?.ventricularPulseWidth ?? 0,
                  ventricularRefractoryPeriod: settings?.ventricularRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            setVentriclePW((settings?.ventricularPulseWidth ?? 0).toString())
            setVentricleRP((settings?.ventricularRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'AAI':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'AAI',
                settings: {
                  atrialAmplitude: settings?.atrialAmplitude ?? 0,
                  atrialPulseWidth: settings?.atrialPulseWidth ?? 0,
                  atrialRefractoryPeriod: settings?.atrialRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            setAtrialPW((settings?.atrialPulseWidth ?? 0).toString())
            setAtrialRP((settings?.atrialRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          case 'VVI':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'VVI',
                settings: {
                  ventricularAmplitude: settings?.ventricularAmplitude ?? 0,
                  ventricularPulseWidth: settings?.ventricularPulseWidth ?? 0,
                  ventricularRefractoryPeriod: settings?.ventricularRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            setVentriclePW((settings?.ventricularPulseWidth ?? 0).toString())
            setVentricleRP((settings?.ventricularRefractoryPeriod ?? 0).toString())
            setLowerRateLimit((settings?.lowerRateLimit ?? 0).toString())
            break
          default:
            break
        }
      }
    })
  }, [username, currentMode])

  // toggle help popup
  const toggleHelp = (): void => {
    setShowHelp(!showHelp)
  }

  // Return the actual JSX component
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        {/* Pacemaker Heart Image */}
        <img
          alt="pacemaker heart"
          className={submittedMode === 'OFF' ? 'pacemaker-heart-stop' : 'pacemaker-heart'}
          src={pacemakerHeart}
        />

        {/* BPM Statistics */}
        <div className="stats-container">
          <div className="bpm-container">
            <div className="bpm-box">
              <h3>Current Mode</h3>
              <p>{submittedMode}</p>
            </div>
            <div className="bpm-box">
              <h3>Natural BPM</h3>
              <p>{telemetry.heartRate}</p>
            </div>
            <div className="bpm-box">
              <h3>Pacemaker BPM</h3>
              <p>{pacemakerBPM}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        {/* Help Button */}
        <div className="help-button-container">
          <button className="help-button" onClick={toggleHelp}>
            <Info size={14} />
          </button>
        </div>

        {/* Help Popup */}
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

        {/* Pacemaker Parameters Header */}
        <div className="header-container">
          <h2>Pacemaker Parameters</h2>
          <hr></hr>
        </div>

        {/* Mode Selection */}
        <div className="mode-container">
          <h3>Mode Selection</h3>
          <div className="button-row">
            {(['AOO', 'VOO', 'AAI', 'VVI'] as const).map((mode) => (
              <button
                key={mode}
                className={`mode-button ${currentMode === mode ? 'selected' : ''}`}
                onClick={() => handleModeSelect(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Continuous Parameters */}
        <div className="parameter-container">
          <h3>Continuous Parameters</h3>
          <div className="input-row">
            <div className={`input-container ${atriumAmpError ? 'validation-error' : ''}`}>
              <input
                type="text"
                className="input-field"
                onChange={handleInputChange}
                disabled={isAtriumDisabled}
                value={isAtriumDisabled ? '' : (modes[currentMode]?.atrialAmplitude ?? '')}
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
                value={isVentricleDisabled ? '' : (modes[currentMode]?.ventricularAmplitude ?? '')}
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
                disabled={telemetryStatus === 'OFF'}
                value={telemetryStatus === 'OFF' ? '' : lowerRateLimit}
                name="lowerRateLimit"
              />
              <label className={isVentricleDisabled || isAtriumDisabled ? 'disabled-label' : ''}>
                Lower Rate Limit
              </label>
            </div>
          </div>
        </div>

        {/* Submit and Discard Buttons */}
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
