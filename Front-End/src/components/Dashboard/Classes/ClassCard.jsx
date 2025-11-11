import React from 'react'

export default function ClassCard({ title, bg = '#dfe' }) {
  return (
    <div className="class-card" style={{ background: bg }}>
      <div className="class-thumb">📚</div>
      <h5>{title}</h5>
      <div className="class-meta">3/10</div>
    </div>
  )
}
