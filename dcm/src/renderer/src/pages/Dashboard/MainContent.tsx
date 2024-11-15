import React, { useEffect, useState } from 'react'
import pacemakerHeart from '../../assets/pacemaker-heart.png'
import RealTimeChart from '../../components/RealTimeChart/RealTimeChart'
import type { ChartPoint } from 'src/common/types'

interface MainContentProps {
  submittedMode: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'VOOR' | 'AOOR' | 'VVIR' | 'AAIR' | 'OFF' | 'DDDR' | 'DDD' | null
  telemetry: { heartRate: number }
  pacemakerBPM: number
  isRightSidebarVisible: boolean
}

const MainContent: React.FC<MainContentProps> = ({ submittedMode, telemetry, pacemakerBPM, isRightSidebarVisible }) => {
  const [series1, setSeries1] = useState<ChartPoint[]>([])
  const [series2, setSeries2] = useState<ChartPoint[]>([])
  const [isEgramHidden, setIsEgramHidden] = useState(false);
  let time = 0

  useEffect(() => {
    const interval = setInterval(() => {
      time += 1
      const cosVal = 50 * Math.cos(5 * time * (Math.PI / 180))
      const newVal1 = Math.max(-100, Math.min(100, cosVal))

      const sinVal = 50 * Math.sin(5 * time * (Math.PI / 180))
      const newVal2 = Math.max(-100, Math.min(100, sinVal))

      setSeries1((prev) => {
        const newVals = [...prev, { x: time, y: newVal1 }]
        if (newVals.length > 300) {
          newVals.shift()
        }
        return newVals
      })
      setSeries2((prev) => {
        const newVals = [...prev, { x: time, y: newVal2 }]
        if (newVals.length > 300) {
          newVals.shift()
        }
        return newVals
      })
    }, 10)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleHideEgram = () => {
      setIsEgramHidden((prev) => !prev);
    };

    window.addEventListener('hideEgram', handleHideEgram);

    return () => {
      window.removeEventListener('hideEgram', handleHideEgram);
    };
  }, []);

  return (
    <div className={`main-content ${isRightSidebarVisible ? '' : 'expanded'}`}>
      {isEgramHidden ? (
        <img
          alt="pacemaker heart"
          className={submittedMode === 'OFF' ? 'pacemaker-heart-stop' : 'pacemaker-heart'}
          src={pacemakerHeart}
        />
      ) : (
        <div className="electrogram-container">
          <h2>REAL-TIME ELECTROGRAM</h2>
          <div className="electrogram">
            <RealTimeChart
              series1={{
                data: series1,
                title: 'Atrium',
                xWidth: 100,
                yMin: -100,
                yMax: 100,
              }}
              series2={{
                data: series2,
                title: 'Ventricle',
                xWidth: 100,
                yMin: -100,
                yMax: 100,
              }}
              width={isRightSidebarVisible ? 550 : 900}
              height={500}
            />
          </div>
        </div>
      )}
      <div className="stats-container">
        <div className="stat-box">
          <h3>Current Mode</h3>
          <p>{submittedMode}</p>
        </div>
        <div className="stat-box">
          <h3>Refresh Rate</h3>
          <p>{pacemakerBPM} Hz</p>
        </div>
        <div className="stat-box">
          <h3>Heart BPM</h3>
          <p>{telemetry.heartRate}</p>
        </div>
      </div>
    </div>
  )
}

export default MainContent