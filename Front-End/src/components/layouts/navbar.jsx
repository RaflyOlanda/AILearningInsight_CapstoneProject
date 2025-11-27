import React, { useState, useRef, useEffect } from 'react';
// Ikon dari react-icons
import { FaRegUserCircle, FaChevronDown, FaTrophy, FaMedal } from 'react-icons/fa'; 
// Import gambar logo
import DicodingLogo from '../../assets/images/dicoding.png'; 
// Import file CSS yang berisi semua styling
import './Navbar.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengelola tampilan dropdown
  const dropdownRef = useRef(null); // Ref untuk mendeteksi klik di luar dropdown

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

  return (
    <nav className="navbar-container">
      <div className="navbar-left-section">
        <img 
          src={DicodingLogo} 
          alt="Dicoding Logo" 
          className="navbar-logo-image" 
        />
      </div>

      <div className="navbar-right-section" ref={dropdownRef}> {/* Tambahkan ref di sini */}
        <span className="navbar-seeker-text">Knowledge Seeker</span>
        
        {/* Profile Container: Diklik untuk toggle dropdown */}
        <div className="navbar-profile-container" onClick={toggleDropdown}>
          
          {/* Ikon Profil (Sekarang menjadi elemen lingkaran, sesuai CSS) */}
          <FaRegUserCircle className="profile-avatar" /> 
          
          {/* Panah dropdown: Kelas 'rotate-180' dipicu saat isOpen true */}
          <FaChevronDown size={10} className={`navbar-dropdown-icon ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* --- Dropdown Menu (Popup) --- */}
        {isOpen && ( // Tampilkan hanya jika isOpen true
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <FaTrophy className="dropdown-icon-trophy" /> 0 Points
            </div>
            <div className="dropdown-item">
              <FaMedal className="dropdown-icon-medal" /> 8.624 XP
            </div>
            <div className="dropdown-divider"></div> {/* Garis pemisah */}
            <div className="dropdown-item">
              <FaRegUserCircle className="dropdown-icon-generic" /> Dashboard
            </div>
            <div className="dropdown-item">
              <FaRegUserCircle className="dropdown-icon-generic" /> Settings
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;