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
  const NUM_POINTS = 1000
  const [series1, setSeries1] = useState<ChartPoint[]>(() => {
    return Array.from({ length: NUM_POINTS }, () => ({ x: 0, y: 0 }))
  })
  const [series2, setSeries2] = useState<ChartPoint[]>(() => {
    return Array.from({ length: NUM_POINTS }, () => ({ x: 0, y: 0 }))
  })
  const [isEgramHidden, setIsEgramHidden] = useState(false)
  const [rootTime, setRootTime] = useState(0)

  useEffect(() => {
    const handleSerialDataMessage = (message: any): void => {
      if (message.type === 'data' && message.dataType === 'egram') {
        const newSeries1: ChartPoint[] = []
        const newSeries2: ChartPoint[] = []

        Object.entries(message.data).forEach(([timestamp, egramData]) => {
          const { atrial, ventrical }: { atrial: number[]; ventrical: number[] } = egramData as {
            atrial: number[]
            ventrical: number[]
          }
          const baseTimestamp = parseInt(timestamp, 10)
          if (rootTime === 0) {
            setRootTime(baseTimestamp)
          }

          const time = (baseTimestamp - rootTime) / 1000

          atrial.forEach((value: number, index: number) => {
            if (index % 10 === 0) {
              newSeries1.push({ x: time + index * 0.002, y: value })
            }
          })
          ventrical.forEach((value: number, index: number) => {
            if (index % 10 === 0) {
              newSeries2.push({ x: time + index * 0.002, y: value })
            }
          })
        })

        setSeries1((prev) => {
          const updatedSeries = [...prev, ...newSeries1]
          return updatedSeries.slice(-NUM_POINTS)
        })

        setSeries2((prev) => {
          const updatedSeries = [...prev, ...newSeries2]
          return updatedSeries.slice(-NUM_POINTS)
        })
      }
    }

    window.api.onSerialDataMessage(handleSerialDataMessage)

    return (): void => {
      window.api.removeSerialDataMessageListener()
    }
  }, [rootTime, setRootTime])

  useEffect(() => {
    const handleHideEgram = (): void => {
      setIsEgramHidden((prev) => !prev)
    }

    window.addEventListener('hideEgram', handleHideEgram)

    return (): void => {
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
                xWidth: NUM_POINTS,
                yMin: -1,
                yMax: 1,
              }}
              series2={{
                data: series2,
                title: 'Ventricle',
                xWidth: NUM_POINTS,
                yMin: -1,
                yMax: 1,
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
