// src/components/Layout/Sidebar.jsx

import React from 'react';
// Import CSS yang berisi styling layout
import '../../styles/Layout.css'; 

// Import ikon yang dibutuhkan
import { MdOutlineDashboard } from 'react-icons/md'; // Untuk Overview
import { IoBookSharp } from 'react-icons/io5';       // Untuk Courses

function Sidebar({ username = "Khalil" }) {
  return (
    // Menggunakan kelas app-sidebar
    <aside className="app-sidebar">
      <div className="greeting">Hello, {username}</div> 
      
      {/* Menu Navigasi Sidebar */}
      <ul className="side-menu">
        {/* Item Aktif: Overview */}
        <li className="active">
          <MdOutlineDashboard /> Overview
        </li>
        {/* Item Pasif: Courses */}
        <li>
          <IoBookSharp /> Courses
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;