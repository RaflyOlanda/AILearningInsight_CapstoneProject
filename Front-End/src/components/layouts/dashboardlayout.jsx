

import React from 'react';
import { useTheme } from '../../context/themecontext';
import Particles from '../ui/Particles';
import PixelBlast from '../ui/PixelBlast';
import RetroGrid from '../ui/retro-grid';
import Navbar from './navbar'; // Mengimpor Navbar
import './dashboardlayout.css';

const DashboardLayout = ({ children }) => {
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
      {theme === 'pixelblast' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <PixelBlast
            variant="circle"
            pixelSize={3}
            color="#000000"
            patternScale={4}
            patternDensity={1.6}
            pixelSizeJitter={0.4}
            enableRipples={false}
            liquid={false}
            speed={0.3}
            edgeFade={0}
            transparent
            className="w-full h-full pointer-events-auto"
          />
        </div>
      )}
      {theme === 'retro' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Grid starts below header/cards, adjust startY as needed (e.g. 320–350px) */}
          <RetroGrid
            angle={40} // less perspective, less z-depth
            cellSize={42}
            opacity={0.7}
            lightLineColor="#ffffff"
            darkLineColor="#ffffff"
            className="w-full"
            startY={340} // adjust this value to align with Daily Checkpoint
          />
        </div>
      )}
      {/* Header dengan Navbar */}
      <header className="sticky top-0 z-20 shadow-sm bg-card border-b border-border">
        <Navbar />
      </header>
      <main className="grow px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto w-full relative z-10">
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