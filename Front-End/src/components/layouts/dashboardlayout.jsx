import React from 'react';
import { useTheme } from '../../context/themecontext';
import Particles from '../ui/Particles';
import RetroGrid from '../ui/retro-grid';
import Navbar from './navbar'; 
import '../../styles/layouts.css';

const DashboardLayout = ({ children, wide = false }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {theme === 'particles' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={220}
            particleSpread={10}
            speed={0.12}
            particleBaseSize={90}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>
      )}
      {}
      {theme === 'retro' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {}
          <RetroGrid
            angle={40} 
            cellSize={42}
            opacity={0.7}
            lightLineColor="#ffffff"
            darkLineColor="#ffffff"
            className="w-full"
            startY={340} 
          />
        </div>
      )}
      {}
      <header className="sticky top-0 z-20 shadow-sm bg-card border-b border-border">
        <Navbar />
      </header>
      <main className={"grow px-4 py-6 md:px-8 md:py-8 mx-auto w-full relative z-10 " + (wide ? "max-w-[1600px]" : "max-w-7xl") }>
        {children}
      </main>

      <footer className="app-footer w-full border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 text-xs md:text-sm text-muted-foreground text-center">
          © 2025 Dicoding | Dicoding adalah merek milik PT Presentologics, perusahaan induk dari PT Dicoding Akademi Indonesia.
        </div>
      </footer>

    </div>
  );
};

export default DashboardLayout;