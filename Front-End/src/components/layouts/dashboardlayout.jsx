// src/components/layouts/DashboardLayout.jsx

import React from 'react';
import Navbar from './navbar'; // Mengimpor Navbar

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header dengan Navbar */}
      <header className="sticky top-0 z-10 shadow-sm">
        <Navbar />
      </header>

      {/* Konten Utama */}
      <main className="flex-grow px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
        {children} {/* Diisi oleh DashboardPage */}
      </main>

    </div>
  );
};

export default DashboardLayout;