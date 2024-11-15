import React, { useEffect, useState } from 'react'
import useStore from '@renderer/store/mainStore'
import { useToast } from '../../context/ToastContext'
import { Activity, HardDriveUpload, ClipboardX, Info, XCircle } from 'lucide-react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import MainContent from './MainContent'
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
  const [submittedMode, setSubmittedMode] = useState<'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | 'VOOR' | 'AOOR' | 'VVIR' | 'AAIR' | 'DDDR' | null>(
    null,
  )

  // ! we should probably remove this
  const [pacemakerBPM, _setPacemakerBPM] = useState<number>(0)

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
    setIsAtriumDisabled(currentMode === 'VOO' || currentMode === 'VVI' || currentMode === 'OFF' || currentMode === 'VOOR' || currentMode === 'VVIR')
    setIsVentricleDisabled(currentMode === 'AOO' || currentMode === 'AAI' || currentMode === 'OFF' || currentMode === 'AOOR' || currentMode === 'AAIR')
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
  const handleModeSelect = (mode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | 'VOOR' | 'AOOR' | 'VVIR' | 'AAIR' | 'DDDR'): void => {
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
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { atrialPulseWidth: parseFloat(value) || 0 },
          },
        })
        break
      case 'ventriclePW':
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { ventricularPulseWidth: parseFloat(value) || 0 },
          },
        })
        break
      case 'atrialRP':
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { atrialRefractoryPeriod: parseFloat(value) || 0 },
          },
        })
        break
      case 'ventricleRP':
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { ventricularRefractoryPeriod: parseFloat(value) || 0 },
          },
        })
        break
      case 'lowerRateLimit':
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: currentMode,
            settings: { lowerRateLimit: parseFloat(value) || 0 },
          },
        })
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

        break
      }
      case 'AOOR': {
        // get the settings for the mode via ipc
        const aoorSettings = await window.api.getSettingsForMode(username ?? '', 'AOOR')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'AOOR' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'AOOR',
            settings: {
              atrialAmplitude: aoorSettings.settings?.atrialAmplitude ?? 0,
              atrialPulseWidth: aoorSettings.settings?.atrialPulseWidth ?? 0,
              atrialRefractoryPeriod: aoorSettings.settings?.atrialRefractoryPeriod ?? 0,
              lowerRateLimit: aoorSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        break
      }
      case 'VOOR': {
        // get the settings for the mode via ipc
        const voorSettings = await window.api.getSettingsForMode(username ?? '', 'VOOR')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'VOOR' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'VOOR',
            settings: {
              ventricularAmplitude: voorSettings.settings?.ventricularAmplitude ?? 0,
              ventricularPulseWidth: voorSettings.settings?.ventricularPulseWidth ?? 0,
              ventricularRefractoryPeriod: voorSettings.settings?.ventricularRefractoryPeriod ?? 0,
              lowerRateLimit: voorSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        break
      }
      case 'AAIR': {
        // get the settings for the mode via ipc
        const aairSettings = await window.api.getSettingsForMode(username ?? '', 'AAIR')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'AAIR' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'AAIR',
            settings: {
              atrialAmplitude: aairSettings.settings?.atrialAmplitude ?? 0,
              atrialPulseWidth: aairSettings.settings?.atrialPulseWidth ?? 0,
              atrialRefractoryPeriod: aairSettings.settings?.atrialRefractoryPeriod ?? 0,
              lowerRateLimit: aairSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        break
      }
      case 'VVIR': {
        // get the settings for the mode via ipc
        const vvirSettings = await window.api.getSettingsForMode(username ?? '', 'VVIR')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'VVIR' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'VVIR',
            settings: {
              ventricularAmplitude: vvirSettings.settings?.ventricularAmplitude ?? 0,
              ventricularPulseWidth: vvirSettings.settings?.ventricularPulseWidth ?? 0,
              ventricularRefractoryPeriod: vvirSettings.settings?.ventricularRefractoryPeriod ?? 0,
              lowerRateLimit: vvirSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

        break
      }
      case 'DDDR': {
        // get the settings for the mode via ipc
        const dddrSettings = await window.api.getSettingsForMode(username ?? '', 'DDDR')
        dispatch({ type: 'UPDATE_CURRENT_MODE', payload: 'DDDR' })
        dispatch({
          type: 'UPDATE_MODE_SETTINGS',
          payload: {
            mode: 'DDDR',
            settings: {
              atrialAmplitude: dddrSettings.settings?.atrialAmplitude ?? 0,
              atrialPulseWidth: dddrSettings.settings?.atrialPulseWidth ?? 0,
              atrialRefractoryPeriod: dddrSettings.settings?.atrialRefractoryPeriod ?? 0,
              ventricularAmplitude: dddrSettings.settings?.ventricularAmplitude ?? 0,
              ventricularPulseWidth: dddrSettings.settings?.ventricularPulseWidth ?? 0,
              ventricularRefractoryPeriod: dddrSettings.settings?.ventricularRefractoryPeriod ?? 0,
              lowerRateLimit: dddrSettings.settings?.lowerRateLimit ?? 0,
            },
          },
        })

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
    if (currentMode === 'AOO' || currentMode === 'AAI' || currentMode === 'DDDR' || currentMode === 'AOOR' || currentMode === 'AAIR') {
      if (modes[currentMode].atrialAmplitude < 0 || modes[currentMode].atrialAmplitude > 5) {
        addToast('Atrium Amplitude must be between 0.5 and 5 mV', 'error')
        setAtriumAmpError(true)
        isValid = false
      } else {
        setAtriumAmpError(false)
      }
      if (modes[currentMode].atrialPulseWidth < 0.05 || modes[currentMode].atrialPulseWidth > 1.9) {
        addToast('Atrial Pulse Width must be between 0.05 and 1.9 ms', 'error')
        setAtrialPWError(true)
        isValid = false
      } else {
        setAtrialPWError(false)
      }
      if (
        modes[currentMode].atrialRefractoryPeriod < 150 ||
        modes[currentMode].atrialRefractoryPeriod > 500
      ) {
        addToast('Atrial Refractory Period must be between 150 and 500 ms', 'error')
        setAtrialRPError(true)
        isValid = false
      } else {
        setAtrialRPError(false)
      }
    } else if (currentMode === 'VOO' || currentMode === 'VVI' || currentMode === 'DDDR' || currentMode === 'VOOR' || currentMode === 'VVIR') {
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
      if (
        modes[currentMode].ventricularPulseWidth < 0.05 ||
        modes[currentMode].ventricularPulseWidth > 1.9
      ) {
        addToast('Ventricular Pulse Width must be between 0.05 and 1.9 ms', 'error')
        setVentriclePWError(true)
        isValid = false
      } else {
        setVentriclePWError(false)
      }
      if (
        modes[currentMode].ventricularRefractoryPeriod < 150 ||
        modes[currentMode].ventricularRefractoryPeriod > 500
      ) {
        addToast('Ventricular Refractory Period must be between 150 and 500 ms', 'error')
        setVentricleRPError(true)
        isValid = false
      } else {
        setVentricleRPError(false)
      }
    }

    if (modes[currentMode].lowerRateLimit <= 30 || modes[currentMode].lowerRateLimit >= 175) {
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
          modes[currentMode].atrialPulseWidth !== 0 &&
          modes[currentMode].atrialRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          // ipc channel sets the values for the mode for given user
          // ! we also might wanna fix how we get the values here
          window.api.setUser(username, 'AOO', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: modes[currentMode].atrialPulseWidth,
            atrialRefractoryPeriod: modes[currentMode].atrialRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
          setSubmittedMode('AOO')
        }
        break
      case 'VOO':
        // same as above, but for VOO
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          modes[currentMode].ventricularPulseWidth !== 0 &&
          modes[currentMode].ventricularRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'VOO', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: modes[currentMode].ventricularPulseWidth,
            ventricularRefractoryPeriod: modes[currentMode].ventricularRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
          setSubmittedMode('VOO')
        }
        setSubmittedMode('VOO')
        break
      case 'AAI':
        // same as above, but for AAI
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          modes[currentMode].atrialPulseWidth !== 0 &&
          modes[currentMode].atrialRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'AAI', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: modes[currentMode].atrialPulseWidth,
            atrialRefractoryPeriod: modes[currentMode].atrialRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('AAI')
        break
      case 'VVI':
        // same as above, but for VVI
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          modes[currentMode].ventricularPulseWidth !== 0 &&
          modes[currentMode].ventricularRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'VVI', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: modes[currentMode].ventricularPulseWidth,
            ventricularRefractoryPeriod: modes[currentMode].ventricularRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('VVI')
        break
      case 'AOOR':
        // same as above, but for AOOR
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          modes[currentMode].atrialPulseWidth !== 0 &&
          modes[currentMode].atrialRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'AOOR', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: modes[currentMode].atrialPulseWidth,
            atrialRefractoryPeriod: modes[currentMode].atrialRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('AOOR')
        break
      case 'VOOR':
        // same as above, but for VOOR
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          modes[currentMode].ventricularPulseWidth !== 0 &&
          modes[currentMode].ventricularRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'VOOR', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: modes[currentMode].ventricularPulseWidth,
            ventricularRefractoryPeriod: modes[currentMode].ventricularRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('VOOR')
        break
      case 'AAIR':
        // same as above, but for AAIR
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          modes[currentMode].atrialPulseWidth !== 0 &&
          modes[currentMode].atrialRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'AAIR', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: modes[currentMode].atrialPulseWidth,
            atrialRefractoryPeriod: modes[currentMode].atrialRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('AAIR')
        break
      case 'VVIR':
        // same as above, but for VVIR
        if (
          modes[currentMode].ventricularAmplitude !== 0 &&
          modes[currentMode].ventricularPulseWidth !== 0 &&
          modes[currentMode].ventricularRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'VVIR', {
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: modes[currentMode].ventricularPulseWidth,
            ventricularRefractoryPeriod: modes[currentMode].ventricularRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('VVIR')
        break
      case 'DDDR':
        // same as above, but for DDDR
        if (
          modes[currentMode].atrialAmplitude !== 0 &&
          modes[currentMode].atrialPulseWidth !== 0 &&
          modes[currentMode].atrialRefractoryPeriod !== 0 &&
          modes[currentMode].ventricularAmplitude !== 0 &&
          modes[currentMode].ventricularPulseWidth !== 0 &&
          modes[currentMode].ventricularRefractoryPeriod !== 0 &&
          modes[currentMode].lowerRateLimit !== 0
        ) {
          window.api.setUser(username, 'DDDR', {
            atrialAmplitude: modes[currentMode].atrialAmplitude,
            atrialPulseWidth: modes[currentMode].atrialPulseWidth,
            atrialRefractoryPeriod: modes[currentMode].atrialRefractoryPeriod,
            ventricularAmplitude: modes[currentMode].ventricularAmplitude,
            ventricularPulseWidth: modes[currentMode].ventricularPulseWidth,
            ventricularRefractoryPeriod: modes[currentMode].ventricularRefractoryPeriod,
            lowerRateLimit: modes[currentMode].lowerRateLimit,
          })
        }
        setSubmittedMode('DDDR')
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
    modes[currentMode]?.atrialPulseWidth,
    modes[currentMode]?.ventricularPulseWidth,
    modes[currentMode]?.atrialRefractoryPeriod,
    modes[currentMode]?.ventricularRefractoryPeriod,
    modes[currentMode]?.lowerRateLimit,
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

            break
          case 'AOOR':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'AOOR',
                settings: {
                  atrialAmplitude: settings?.atrialAmplitude ?? 0,
                  atrialPulseWidth: settings?.atrialPulseWidth ?? 0,
                  atrialRefractoryPeriod: settings?.atrialRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            break
          case 'VOOR':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'VOOR',
                settings: {
                  ventricularAmplitude: settings?.ventricularAmplitude ?? 0,
                  ventricularPulseWidth: settings?.ventricularPulseWidth ?? 0,
                  ventricularRefractoryPeriod: settings?.ventricularRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            break
          case 'AAIR':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'AAIR',
                settings: {
                  atrialAmplitude: settings?.atrialAmplitude ?? 0,
                  atrialPulseWidth: settings?.atrialPulseWidth ?? 0,
                  atrialRefractoryPeriod: settings?.atrialRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            break
          case 'VVIR':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'VVIR',
                settings: {
                  ventricularAmplitude: settings?.ventricularAmplitude ?? 0,
                  ventricularPulseWidth: settings?.ventricularPulseWidth ?? 0,
                  ventricularRefractoryPeriod: settings?.ventricularRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

            break
          case 'DDDR':
            dispatch({
              type: 'UPDATE_MODE_SETTINGS',
              payload: {
                mode: 'DDDR',
                settings: {
                  atrialAmplitude: settings?.atrialAmplitude ?? 0,
                  atrialPulseWidth: settings?.atrialPulseWidth ?? 0,
                  atrialRefractoryPeriod: settings?.atrialRefractoryPeriod ?? 0,
                  ventricularAmplitude: settings?.ventricularAmplitude ?? 0,
                  ventricularPulseWidth: settings?.ventricularPulseWidth ?? 0,
                  ventricularRefractoryPeriod: settings?.ventricularRefractoryPeriod ?? 0,
                  lowerRateLimit: settings?.lowerRateLimit ?? 0,
                },
              },
            })

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

  const handleEgramHiding = (): void => {
    console.log('Electrogram hidden')
  }

  // Return the actual JSX component
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <LeftSidebar handleTerminate={handleTerminate} handleEgramHiding={handleEgramHiding} />

      {/* Main Content */}
      <MainContent
        submittedMode={submittedMode}
        telemetry={telemetry}
        pacemakerBPM={pacemakerBPM}
      />

      {/* Right Sidebar */}
      <RightSidebar
        showHelp={showHelp}
        toggleHelp={toggleHelp}
        handleModeSelect={handleModeSelect}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleDiscard={handleDiscard}
        atriumAmpError={atriumAmpError}
        ventricleAmpError={ventricleAmpError}
        atrialPWError={atrialPWError}
        ventriclePWError={ventriclePWError}
        atrialRPError={atrialRPError}
        ventricleRPError={ventricleRPError}
        lowerRateLimitError={lowerRateLimitError}
        isAtriumDisabled={isAtriumDisabled}
        isVentricleDisabled={isVentricleDisabled}
        telemetryStatus={telemetryStatus}
        currentMode={currentMode}
        modes={modes}
      />
    </div>
  )
}

export default Dashboard
