import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'default', // 'default' | 'glass' | 'contrast'
  resolvedTheme: 'default',
  toggleTheme: () => {},
  setTheme: () => {},
});

// Normalize legacy theme values to new ones
const normalizeTheme = (t) => {
  if (!t) return 'default';
  if (t === 'light') return 'default';
  if (t === 'dark' || t === 'high-contrast') return 'contrast';
  if (t === 'system') return 'default';
  return t; // default | glass | contrast | others (ignored)
};

// Map to determine whether to apply `.dark` class
const THEME_DARKNESS = {
  default: false,
  particles: true,
  contrast: true,
  pixelblast: false,
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'default';
    try {
      return normalizeTheme(localStorage.getItem('theme')) || 'default';
    } catch {
      return 'default';
    }
  });

  const resolvedTheme = theme;

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    const root = document.documentElement;
    // Apply data-theme for CSS palettes
    if (theme) root.setAttribute('data-theme', theme);

    // Manage dark class for contrast theme
    const isDark = THEME_DARKNESS[theme] === true;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme: () => setTheme((t) => (
      t === 'default' ? 'contrast' :
      t === 'contrast' ? 'particles' :
      t === 'particles' ? 'pixelblast' :
      'default'
    )),
  }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;

