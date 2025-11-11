import React from 'react'
// Impor ikon yang dibutuhkan (misalnya, FaUser dari Font Awesome)
import { FaUser } from 'react-icons/fa'; 
import dicodingLogo from '../../assets/dicoding.png'

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <img src={dicodingLogo} alt="Dicoding Logo" className="logo" />
      </div>
      <nav className="top-nav">
        <a href="#home">Home</a>
        <a href="#academy">Academy</a>
        <a href="#challenge">Challenge</a>
        <a href="#event">Event</a>
        <a href="#job">Job</a>
      </nav>
      <div className="user-actions">
        {/* Mengganti tombol profil dengan ikon FaUser */}
        <button className="profile-icon">
          <FaUser />
        </button>
        <button className="sign-out-btn">Sign out</button>
      </div>
    </header>
  )
}