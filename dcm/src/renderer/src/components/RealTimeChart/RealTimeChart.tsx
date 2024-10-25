import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js/auto'
import './RealTimeChart.css'
import type { ChartPoint } from 'src/common/types'

// separate chart component since it's reusable for multiple charts

// type definitions for the props of the RealTimeChart component
// (props = properties = inputs into a component)
interface RealTimeChartProps {
  data: ChartPoint[]
  title: string
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ data, title }) => {
  // use references to get the canvas element in DOM + chart instance
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  // on mount and on data change, create or update the chart w/ Chart.js
  useEffect(() => {
    // if statements to ensure the canvas element and context exist
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        // create the line chrart with Chart.js
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

    // cleanup function to destroy the chart instance
    return (): void => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [data, title])

  // on data change, update the chart data
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = data
      chartInstanceRef.current.update()
    }
  }, [data])

  // return the canvas element for the chart
  return <canvas ref={chartRef} />
}

export default RealTimeChart
