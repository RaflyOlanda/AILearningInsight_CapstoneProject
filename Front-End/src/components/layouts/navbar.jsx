import React, { useState, useRef, useEffect } from 'react';
// Ikon dari react-icons
import { FaRegUserCircle, FaChevronDown, FaTrophy, FaMedal } from 'react-icons/fa'; 
// Import gambar logo
import DicodingLogo from '../../assets/images/dicoding.png'; 
// Import file CSS yang berisi semua styling
import './navbar.css'; 
import { useUser } from '../../context/usercontext';
import { useFetch } from '../../hooks/usefetch';
import LoginModal from '../ui/loginmodal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengelola tampilan dropdown
  const [loginOpen, setLoginOpen] = useState(false); // Modal login ketika belum login
  const dropdownRef = useRef(null); // Ref untuk mendeteksi klik di luar dropdown
  const { userId, logout } = useUser();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { data: profile } = useFetch(userId ? `/dashboard/learning-profile/${userId}` : null);
  const xp = Number(profile?.xp) || 0;
  const xpFormatted = xp.toLocaleString('id-ID');

  // Fungsi untuk menutup dropdown ketika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Fungsi untuk mengganti status buka/tutup
  const toggleDropdown = () => setIsOpen(!isOpen); 

  const isAuthenticated = Boolean(userId || token);

  return (
    <nav className="navbar-container">
      <div className="navbar-left-section">
        <img
          src={DicodingLogo}
          alt="Dicoding Logo"
          className="navbar-logo-image"
          onClick={() => { window.location.href = '/'; }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="navbar-right-section" ref={dropdownRef}>
        <span className="navbar-seeker-text">Knowledge Seeker</span>

        {!isAuthenticated ? (
          <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm" onClick={() => setLoginOpen(true)}>
            Masuk
          </button>
        ) : (
          <>
            {/* Profile Container: Diklik untuk toggle dropdown */}
            <div className="navbar-profile-container" onClick={toggleDropdown}>
              <FaRegUserCircle className="profile-avatar" />
              <FaChevronDown size={10} className={`navbar-dropdown-icon ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* --- Dropdown Menu (Popup) --- */}
            {isOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <FaTrophy className="dropdown-icon-trophy" /> 0 Points
                </div>
                <div className="dropdown-item">
                  <FaMedal className="dropdown-icon-medal" /> {xpFormatted} XP
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={() => { window.location.href = '/dashboard'; }}>
                  <FaRegUserCircle className="dropdown-icon-generic" /> Dashboard
                </div>
                <div className="dropdown-item" onClick={() => { /* placeholder for settings */ }}>
                  <FaRegUserCircle className="dropdown-icon-generic" /> Settings
                </div>
                <div className="dropdown-divider"></div>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    window.location.href = '/';
                  }}
                >
                  <FaRegUserCircle className="dropdown-icon-generic" /> Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Login Modal (only when not authenticated) */}
      {!isAuthenticated && (
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;