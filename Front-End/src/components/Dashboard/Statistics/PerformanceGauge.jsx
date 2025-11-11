import React from 'react'

export default function PerformanceGauge({ value = 75 }) {
  const radius = 40
  const circ = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, value))
  const dash = (pct / 100) * circ

  return (
    <div className="gauge">
      <svg width="100" height="100" viewBox="-10 -10 120 120">
        <circle cx="50" cy="50" r={radius} stroke="#eee" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#f6c94a"
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          fill="none"
        />
        <text x="50" y="54" textAnchor="middle" fontSize="14" fill="#111">{pct}</text>
      </svg>
    </div>
  )
}
