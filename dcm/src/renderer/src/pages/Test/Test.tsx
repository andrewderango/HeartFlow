// page to test real-time chart
import React, { useEffect, useState } from 'react'
import RealTimeChart from '../../components/RealTimeChart/RealTimeChart'
import type { ChartPoint } from 'src/common/types'

const Test: React.FC = () => {
  // state to hold the chart data
  const [series1, setSeries1] = useState<ChartPoint[]>([])
  const [series2, setSeries2] = useState<ChartPoint[]>([])

  let time = 0

  useEffect(() => {
    const interval = setInterval(() => {
      time += 1
      const cosVal = 50 * Math.cos(5*time * (Math.PI / 180))
      const newVal1 = Math.max(-100, Math.min(100, cosVal))

      // for series 2, generate a sinusoidal wave
      const sinVal = 50 * Math.sin(5*time * (Math.PI / 180))
      const newVal2 = Math.max(-100, Math.min(100, sinVal))

      setSeries1((prev) => {
        const newVals = [...prev, { x: time, y: newVal1 }]
        if (newVals.length > 100) {
          newVals.shift()
        }
        return newVals
      })
      setSeries2((prev) => {
        const newVals = [...prev, { x: time, y: newVal2 }]
        if (newVals.length > 100) {
          newVals.shift()
        }
        return newVals
      })
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="test-container">
      <RealTimeChart
        series1={{
          data: series1,
          title: 'Series 1',
          xWidth: 100,
          yMin: -100,
          yMax: 100,
        }}
        series2={{
          data: series2,
          title: 'Series 2',
          xWidth: 100,
          yMin: -100,
          yMax: 100,
        }}
        width={800}
        height={400}
      />
    </div>
  )
}

export default Test
