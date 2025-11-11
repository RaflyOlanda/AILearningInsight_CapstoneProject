import React from 'react'

export default function LineChart() {
  return (
    <svg viewBox="0 0 300 120" className="line-chart">
      <rect x="0" y="0" width="300" height="120" rx="8" fill="#fff" stroke="#3b3b6b" />
      <polyline fill="none" stroke="#6f52ff" strokeWidth="2" points="10,80 60,40 110,90 160,50 210,70 260,30" />
      <polyline fill="none" stroke="#58b55a" strokeWidth="2" points="10,60 60,70 110,60 160,70 210,65 260,60" />
      <polyline fill="none" stroke="#ff66a3" strokeWidth="2" points="10,95 60,60 110,100 160,75 210,90 260,70" />
    </svg>
  )
}
