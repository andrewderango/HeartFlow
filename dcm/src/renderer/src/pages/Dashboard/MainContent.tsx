import React, { useEffect, useState } from 'react'
import pacemakerHeart from '../../assets/pacemaker-heart.png'
import RealTimeChart from '../../components/RealTimeChart/RealTimeChart'
import type { ChartPoint } from 'src/common/types'

interface MainContentProps {
  submittedMode:
    | 'VOO'
    | 'AOO'
    | 'VVI'
    | 'AAI'
    | 'VOOR'
    | 'AOOR'
    | 'VVIR'
    | 'AAIR'
    | 'OFF'
    | 'DDDR'
    | 'DDD'
    | null
  telemetry: { heartRate: number }
  telemetryRate: number
  isRightSidebarVisible: boolean
}

const MainContent: React.FC<MainContentProps> = ({
  submittedMode,
  telemetry,
  telemetryRate,
  isRightSidebarVisible,
}) => {
  const [series1, setSeries1] = useState<ChartPoint[]>([])
  const [series2, setSeries2] = useState<ChartPoint[]>([])
  const [isEgramHidden, setIsEgramHidden] = useState(false)
  let time = 0
  const period = 60 // assuming 1 second period for simplicity
  const scaler = 0.1

  useEffect(() => {
    const interval = setInterval(() => {
      time += (1/scaler)
      const heartBeat = (t: number) => {
        const amplitude = 20
        const noise = Math.random() * 10 - 5
        if (t % period < 5) {
          return amplitude + noise
        } else if (t % period < 10) {
          return -amplitude + noise
        } else {
          return noise
        }
      }

      const newVal1 = heartBeat(time*scaler)
      const newVal2 = heartBeat(time*scaler + period / 2) // phase shift for second series

      setSeries1((prev) => {
        const newVals = [...prev, { x: time / 1000, y: newVal1 }]
        if (newVals.length > 300) {
          newVals.shift()
        }
        return newVals
      })
      setSeries2((prev) => {
        const newVals = [...prev, { x: time / 1000, y: newVal2 }]
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
      setIsEgramHidden((prev) => !prev)
    }

    window.addEventListener('hideEgram', handleHideEgram)

    return () => {
      window.removeEventListener('hideEgram', handleHideEgram)
    }
  }, [])

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
                yMin: -50,
                yMax: 50,
              }}
              series2={{
                data: series2,
                title: 'Ventricle',
                xWidth: 100,
                yMin: -50,
                yMax: 50,
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
          <h3>Telemetry Rate</h3>
          <p>{telemetryRate} Hz</p>
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
