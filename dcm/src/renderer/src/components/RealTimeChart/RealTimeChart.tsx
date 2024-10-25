import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js/auto'
import './RealTimeChart.css'
import type { ChartPoint } from 'src/common/types'

interface RealTimeChartProps {
  data: ChartPoint[]
  title: string
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        Chart.register(...registerables)
        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map((point) => point.x),
            datasets: [
              {
                label: title,
                data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
              },
            },
          },
        })
      }
    }

    return (): void => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [data, title])

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = data
      chartInstanceRef.current.update()
    }
  }, [data])

  return <canvas ref={chartRef} />
}

export default RealTimeChart
