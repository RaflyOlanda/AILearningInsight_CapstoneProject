import React from 'react'
import dicodingLogo from '../../assets/dicoding.png'

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <img src={dicodingLogo} alt="Dicoding Logo" className="logo" />
      </div>
      <nav className="top-nav">
        <a>Home</a>
        <a>Academy</a>
        <a>Challenge</a>
        <a>Event</a>
        <a>Job</a>
      </nav>
      <div className="user-actions">
        <button className="profile">👤</button>
        <button className="signout">Sign out</button>
      </div>
    </header>
  )
}
