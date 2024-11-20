import React, { useState, useEffect, useRef } from 'react'
import { Info, HardDriveUpload, ClipboardX, Menu, HeartPulse, FileText } from 'lucide-react'
import { is } from '@electron-toolkit/utils'

interface RightSidebarProps {
  showHelp: boolean
  handleModeSelect: (
    mode:
      | 'VOO'
      | 'AOO'
      | 'VVI'
      | 'AAI'
      | 'OFF'
      | 'DDDR'
      | 'DDD'
      | 'AOOR'
      | 'AAIR'
      | 'VOOR'
      | 'VVIR',
  ) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleDiscard: () => void
  atriumAmpError: boolean
  ventricleAmpError: boolean
  atrialPWError: boolean
  ventriclePWError: boolean
  atrialRPError: boolean
  ventricleRPError: boolean
  lowerRateLimitError: boolean
  upperRateLimitError: boolean
  isAtriumDisabled: boolean
  isVentricleDisabled: boolean
  isRateLimitDisabled: boolean
  telemetryStatus: string
  currentMode:
    | 'VOO'
    | 'AOO'
    | 'VVI'
    | 'AAI'
    | 'OFF'
    | 'DDDR'
    | 'DDD'
    | 'AOOR'
    | 'AAIR'
    | 'VOOR'
    | 'VVIR'
    | null
  modes: any
  isVisible: boolean
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  showHelp,
  handleModeSelect,
  handleInputChange,
  handleSubmit,
  handleDiscard,
  atriumAmpError,
  ventricleAmpError,
  atrialPWError,
  ventriclePWError,
  atrialRPError,
  ventricleRPError,
  lowerRateLimitError,
  upperRateLimitError,
  isAtriumDisabled,
  isVentricleDisabled,
  isRateLimitDisabled,
  telemetryStatus,
  currentMode,
  modes,
  isVisible,
}) => {
  const [view, setView] = useState<'PARAMETERS' | 'REPORTS'>('PARAMETERS')
  const [menuOpen, setMenuOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
    }
    if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
      setHelpOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const inputs = document.querySelectorAll('.input-field')
    inputs.forEach((input) => {
      if (input.value) {
        input.classList.add('filled')
      } else {
        input.classList.remove('filled')
      }
    })
  }, [isAtriumDisabled, isVentricleDisabled, isRateLimitDisabled])

  useEffect(() => {
    if (view === 'PARAMETERS') {
      const inputs = document.querySelectorAll('.input-field')
      inputs.forEach((input) => {
        if (input.value) {
          input.classList.add('filled')
        } else {
          input.classList.remove('filled')
        }
      })
    }
  }, [view])

  const handleViewChange = (newView: 'PARAMETERS' | 'REPORTS') => {
    setView(newView)
  }

  return (
    <div className={`right-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      {/* Menu Button */}
      <div className="menu-button-container" ref={menuRef}>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={20} />
        </button>
        {menuOpen && (
          <div className="menu-popup">
            <button
              className={`menu-item ${view === 'PARAMETERS' ? 'selected' : ''}`}
              onClick={() => {
                handleViewChange('PARAMETERS')
                setMenuOpen(false)
              }}
            >
              <HeartPulse size={16} style={{ marginRight: '8px' }} />
              PARAMETERS
            </button>
            <button
              className={`menu-item ${view === 'REPORTS' ? 'selected' : ''}`}
              onClick={() => {
                handleViewChange('REPORTS')
                setMenuOpen(false)
              }}
            >
              <FileText size={16} style={{ marginRight: '8px' }} />
              REPORTS
            </button>
          </div>
        )}
      </div>

      {/* HEADER */}
      <h2>{view}</h2>

      {view === 'PARAMETERS' && (
        <>
          {/* Mode Selection */}
          <div className="mode-container">
            <h3>Mode Selection</h3>
            <div className="button-grid">
              {(
                [
                  'AOO',
                  'AAI',
                  'VOO',
                  'VVI',
                  'AOOR',
                  'AAIR',
                  'VOOR',
                  'VVIR',
                  'OFF',
                  'DDD',
                  'DDDR',
                ] as const
              ).map((mode) => (
                <button
                  key={mode}
                  className={`mode-button ${currentMode === mode ? 'selected' : ''}`}
                  onClick={() => handleModeSelect(mode)}
                  style={{ flex: '1 1 20%' }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Continuous Parameters */}
          <div className="parameter-container">
            <div className="header-with-help">
              <h3>Continuous Parameters</h3>
              <button className="help-button" onClick={() => setHelpOpen(!helpOpen)}>
                <Info size={14} />
              </button>
            </div>
            {helpOpen && (
              <div className="help-popup" ref={helpRef}>
                <div className="help-header">
                  <h3>Pulse Parameters</h3>
                </div>
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
                  <li>
                    <strong>Upper Rate Limit:</strong> Maximum heart rate (bpm)
                  </li>
                </ul>
              </div>
            )}
            <div className="input-row">
              <div className={`input-container ${atriumAmpError ? 'validation-error' : ''}`}>
                <input
                  type="number"
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
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isVentricleDisabled}
                  value={
                    isVentricleDisabled ? '' : (modes[currentMode]?.ventricularAmplitude ?? '')
                  }
                  name="ventricleAmp"
                />
                <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle AMP</label>
              </div>
            </div>
            <div className="input-row">
              <div className={`input-container ${atrialPWError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isAtriumDisabled}
                  value={isAtriumDisabled ? '' : (modes[currentMode]?.atrialPulseWidth ?? '')}
                  name="atrialPW"
                />
                <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrium PW</label>
              </div>
              <div className={`input-container ${ventriclePWError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isVentricleDisabled}
                  value={
                    isVentricleDisabled ? '' : (modes[currentMode]?.ventricularPulseWidth ?? '')
                  }
                  name="ventriclePW"
                />
                <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricle PW</label>
              </div>
            </div>
            <div className="input-row">
              <div className={`input-container ${atrialRPError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isAtriumDisabled}
                  value={isAtriumDisabled ? '' : (modes[currentMode]?.atrialRefractoryPeriod ?? '')}
                  name="atrialRP"
                />
                <label className={isAtriumDisabled ? 'disabled-label' : ''}>Atrial RP</label>
              </div>
              <div className={`input-container ${ventricleRPError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isVentricleDisabled}
                  value={
                    isVentricleDisabled
                      ? ''
                      : (modes[currentMode]?.ventricularRefractoryPeriod ?? '')
                  }
                  name="ventricleRP"
                />
                <label className={isVentricleDisabled ? 'disabled-label' : ''}>
                  Ventricular RP
                </label>
              </div>
            </div>
            <div className="input-row">
              <div className={`input-container ${lowerRateLimitError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isRateLimitDisabled}
                  value={isRateLimitDisabled ? '' : (modes[currentMode]?.lowerRateLimit ?? '')}
                  name="lowerRateLimit"
                />
                <label className={isRateLimitDisabled ? 'disabled-label' : ''}>
                  Lower Rate Limit
                </label>
              </div>
              <div className={`input-container ${upperRateLimitError ? 'validation-error' : ''}`}>
                <input
                  type="number"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isRateLimitDisabled}
                  value={isRateLimitDisabled ? '' : (modes[currentMode]?.upperRateLimit ?? '')}
                  name="upperRateLimit"
                />
                <label className={isRateLimitDisabled ? 'disabled-label' : ''}>
                  Upper Rate Limit
                </label>
              </div>
            </div>
            {/* <div className="input-row">
              <div className={`input-container-long ${upperRateLimitError ? 'validation-error' : ''}`}>
                <input
                  type="text"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isRateLimitDisabled}
                  value={isRateLimitDisabled ? '' : (modes[currentMode]?.upperRateLimit ?? '')}
                  name="upperRateLimit"
                />
                <label className={isRateLimitDisabled ? 'disabled-label' : ''}>
                  Upper Rate Limit
                </label>
              </div>
            </div> */}
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
        </>
      )}

      {/* Reports */}
      {view === 'REPORTS' && (
        <div className="reports-container full-height">
          <button className="full-height-button electrogram-report" type="button">
            Electrogram Report
            <span className="report-subtitle">Detailed tabular electrogram data</span>
          </button>
          <button className="full-height-button parameter-log" type="button">
            Parameter Log
            <span className="report-subtitle">Log of mode and parameter changes</span>
          </button>
          <button className="full-height-button serial-log" type="button">
            Serial Log
            <span className="report-subtitle">Log of serial communication transmissions</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default RightSidebar