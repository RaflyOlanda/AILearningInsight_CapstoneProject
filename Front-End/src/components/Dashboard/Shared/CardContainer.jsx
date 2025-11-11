import React from 'react'

export default function CardContainer({ title, children, className = '' }) {
  return (
    <section className={`card-container ${className}`}>
      {title && <h4 className="card-title">{title}</h4>}
      <div className="card-body">{children}</div>
    </section>
  )
}
