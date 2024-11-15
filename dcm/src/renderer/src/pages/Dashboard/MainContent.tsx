
import React from 'react'
import pacemakerHeart from '../../assets/pacemaker-heart.png'

interface MainContentProps {
  submittedMode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'VOOR' | 'AOOR' | 'VVIR' | 'AAIR' | 'OFF' | 'DDDR' | null
  telemetry: { heartRate: number }
  pacemakerBPM: number
}

const MainContent: React.FC<MainContentProps> = ({ submittedMode, telemetry, pacemakerBPM }) => {
  return (
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
            <h3>Refresh Rate</h3>
            <p>{pacemakerBPM} Hz</p>
          </div>
          <div className="bpm-box">
            <h3>Heart BPM</h3>
            <p>{telemetry.heartRate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent