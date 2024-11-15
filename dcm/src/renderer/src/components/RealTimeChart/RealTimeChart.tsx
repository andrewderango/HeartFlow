import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js/auto'
import './RealTimeChart.css'
import type { ChartPoint } from 'src/common/types'

// separate chart component since it's reusable for multiple charts

// type definitions for the props of the RealTimeChart component
// (props = properties = inputs into a component)
interface RealTimeChartProps {
  series1: {
    data: ChartPoint[]
    title: string
    xWidth: number
    yMin: number
    yMax: number
  }
  series2?: {
    data: ChartPoint[]
    title: string
    xWidth: number
    yMin: number
    yMax: number
  }
  width: number
  height: number
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ series1, series2, width, height }) => {
  // use references to get the canvas element in DOM + chart instance
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  const xWidth = Math.max(series1.xWidth, series2 ? series2.xWidth : 0)
  const yMin = Math.min(series1.yMin, series2 ? series2.yMin : 0)
  const yMax = Math.max(series1.yMax, series2 ? series2.yMax : 0)

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
            // we assume both series have the same x values
            labels: series1.data.map((point) => point.x),
            datasets: [
              {
                label: series1.title,
                data: series1.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
              },
              ...(series2
                ? [
                    {
                      label: series2.title,
                      data: series2.data,
                      borderColor: 'rgba(192, 75, 75, 1)',
                      tension: 0.1,
                    },
                  ]
                : []),
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 0,
            },
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                min: series1.data.length > 0 ? series1.data[0].x : 0,
                max: series1.data.length > 0 ? series1.data[series1.data.length - 1].x : xWidth,
              },
              y: {
                min: yMin,
                max: yMax,
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
  }, [series1, series2])

  // on data change, update the chart data
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = series1.data
      if (series2) {
        if (chartInstanceRef.current.data.datasets[1]) {
          chartInstanceRef.current.data.datasets[1].data = series2.data
        } else {
          chartInstanceRef.current.data.datasets.push({
            label: series2.title,
            data: series2.data,
            borderColor: 'rgba(192, 75, 75, 1)',
            tension: 0.1,
          })
        }
      }
      if (chartInstanceRef.current.options.scales && chartInstanceRef.current.options.scales.x) {
        chartInstanceRef.current.options.scales.x.min =
          series1.data.length > 0 ? series1.data[0].x : 0
        chartInstanceRef.current.options.scales.x.max =
          series1.data.length > 0 ? series1.data[series1.data.length - 1].x : xWidth
      }
      if (chartInstanceRef.current.options.scales && chartInstanceRef.current.options.scales.y) {
        chartInstanceRef.current.options.scales.y.min = yMin
        chartInstanceRef.current.options.scales.y.max = yMax
      }
      chartInstanceRef.current.update()
    }
  }, [series1, series2])

  // return the canvas element for the chart
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default RealTimeChart
