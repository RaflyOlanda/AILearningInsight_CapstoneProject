import React from 'react'
import CardContainer from '../Shared/CardContainer'

function HistoryItem({ title }) {
  return (
    <div className="history-item">
      <div className="dot" />
      <div className="hist-text">{title}</div>
    </div>
  )
}

export default function HistorySection() {
  return (
    <CardContainer title="Riwayat Pembelajaran" className="history">
      <div className="history-list">
        <HistoryItem title="Webinar Accessibility" />
        <HistoryItem title="Group Project meet" />
        <HistoryItem title="Live class" />
      </div>
    </CardContainer>
  )
}
