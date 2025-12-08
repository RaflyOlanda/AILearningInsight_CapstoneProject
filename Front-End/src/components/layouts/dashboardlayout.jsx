// src/components/layouts/DashboardLayout.jsx

import React from 'react';
import { useTheme } from '../../context/themecontext';
import Particles from '../ui/Particles';
import PixelBlast from '../ui/PixelBlast';
import Navbar from './navbar'; // Mengimpor Navbar

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
        <div className="fixed inset-0 z-0 pointer-events-none">
          <PixelBlast
            variant="circle"
            pixelSize={3} /* smaller pixels -> more dots */
            color="#000000"
            patternScale={4} /* slightly more cells */
            patternDensity={1.6} /* denser fill */
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0}
            transparent
            className="w-full h-full"
          />
        </div>
      )}
      {/* Header dengan Navbar */}
      <header className="sticky top-0 z-10 shadow-sm bg-card border-b border-border">
        <Navbar />
      </header>

      {/* Konten Utama */}
      <main className="grow px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;