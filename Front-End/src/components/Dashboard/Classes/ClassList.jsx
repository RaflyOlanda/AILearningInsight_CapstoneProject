import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList() {
  const classes = [
    { title: 'Introduction to UI/UX Design', bg: '#bfe6b6' },
    { title: 'VR AR Fundamentals', bg: '#f7b88c' },
    { title: 'Interaction Design', bg: '#bfe6f0' },
  ]

  return (
    <div className="class-list">
      {classes.map((c, i) => (
        <ClassCard key={i} title={c.title} bg={c.bg} />
      ))}
    </div>
  )
}
