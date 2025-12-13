import React from 'react';
import Navbar from '../../components/layouts/navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="shadow-sm sticky top-0 z-10">
        <Navbar />
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Personal Tracking Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Pantau perkembangan belajar dan dapatkan rekomendasi yang dipersonalisasi.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="/dashboard" className="px-4 py-2 rounded-lg bg-gray-900 text-white">
              Buka Dashboard
            </a>
          </div>
        </div>
      </main>
      <footer className="app-footer w-full border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 text-xs md:text-sm text-muted-foreground text-center">
          © 2025 Dicoding | Dicoding adalah merek milik PT Presentologics, perusahaan induk dari PT Dicoding Akademi Indonesia.
        </div>
      </footer>
    </div>
  );
}
