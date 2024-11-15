import React, { useState } from 'react'
import { Info, HardDriveUpload, ClipboardX } from 'lucide-react'

interface RightSidebarProps {
  showHelp: boolean
  toggleHelp: () => void
  handleModeSelect: (mode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF') => void
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
  isAtriumDisabled: boolean
  isVentricleDisabled: boolean
  telemetryStatus: string
  currentMode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF' | null
  modes: any
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  showHelp,
  toggleHelp,
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
  isAtriumDisabled,
  isVentricleDisabled,
  telemetryStatus,
  currentMode,
  modes,
}) => {
  const [view, setView] = useState<'PARAMETERS' | 'REPORTS'>('PARAMETERS')

  return (
    <div className="right-sidebar">
      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === 'PARAMETERS' ? 'selected' : ''}`}
          onClick={() => setView('PARAMETERS')}
        >
          PARAMETERS
        </button>
        <button
          className={`toggle-button ${view === 'REPORTS' ? 'selected' : ''}`}
          onClick={() => setView('REPORTS')}
        >
          REPORTS
        </button>
      </div>

      {view === 'PARAMETERS' && (
        <>
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
                  value={isAtriumDisabled ? '' : (modes[currentMode]?.atrialPulseWidth ?? '')}
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
                  type="text"
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
                  type="text"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={isVentricleDisabled}
                  value={
                    isVentricleDisabled ? '' : (modes[currentMode]?.ventricularRefractoryPeriod ?? '')
                  }
                  name="ventricleRP"
                />
                <label className={isVentricleDisabled ? 'disabled-label' : ''}>Ventricular RP</label>
              </div>
            </div>
            <div className="input-row">
              <div className={`input-container-long ${lowerRateLimitError ? 'validation-error' : ''}`}>
                <input
                  type="text"
                  className="input-field"
                  onChange={handleInputChange}
                  disabled={telemetryStatus === 'OFF'}
                  value={telemetryStatus === 'OFF' ? '' : (modes[currentMode]?.lowerRateLimit ?? '')}
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
        </>
      )}

      {view === 'REPORTS' && (
        <div className="reports-container">
          <h2>Reports</h2>
            <p>To be implemented</p>
        </div>
      )}
    </div>
  )
}

export default RightSidebar
