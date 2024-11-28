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
  telemetryRate: number
  isRightSidebarVisible: boolean
}

const MainContent: React.FC<MainContentProps> = ({
  submittedMode,
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
  const [heartRate, setHeartRate] = useState(0)

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

  // to calculate heart rate from series 1, look for peaks that dip below 0.2
  // divide by time and multiply by 60 to get bpm
  // smooth with EMA
  useEffect(() => {
    const series1Values = series1.map((point) => point.y)
    const peaks: number[] = []
    const smoothingFactor = 0.2
    for (let i = 1; i < series1Values.length - 1; i++) {
      if (
        series1Values[i] < 0.2 &&
        series1Values[i - 1] > series1Values[i] &&
        series1Values[i + 1] > series1Values[i]
      ) {
        peaks.push(i)
      }
    }

    const time = series1[series1.length - 1].x - series1[0].x
    const currentHeartRate = (peaks.length / time) * 60
    const smoothedHeartRate =
      currentHeartRate * smoothingFactor +
      (Number.isNaN(heartRate) ? 0 : heartRate) * (1 - smoothingFactor)
    setHeartRate(Math.round(smoothedHeartRate))
  }, [series1])

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
                yMin: 0,
                yMax: 1,
              }}
              series2={{
                data: series2,
                title: 'Ventricle',
                xWidth: NUM_POINTS,
                yMin: 0,
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
          <p>{heartRate}</p>
        </div>
      </div>
    </div>
  )
}

export default MainContent
