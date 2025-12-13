import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useUser } from './usercontext';
import {
  emitPreferencesEvent,
  readThemeForUser,
  writeThemeForUser,
  PREFERENCE_EVENT,
} from '../lib/preferences';

const ThemeContext = createContext({
  theme: 'default',
  resolvedTheme: 'default',
  toggleTheme: () => {},
  setTheme: () => {},
});


const normalizeTheme = (t) => {
  if (!t) return 'default';
  if (t === 'light') return 'default';
  if (t === 'dark' || t === 'high-contrast') return 'contrast';
  if (t === 'system') return 'default';
  return t; 
};


const THEME_DARKNESS = {
  default: false,
  particles: true,
  contrast: true,
  retro: false,
};

const DEFAULT_THEME = 'default';

const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme) root.setAttribute('data-theme', theme);
  const isDark = THEME_DARKNESS[theme] === true;
  if (isDark) root.classList.add('dark');
  else root.classList.remove('dark');
};

export const ThemeProvider = ({ children }) => {
  const { userId, token } = useUser();
  const [activeUserKey, setActiveUserKey] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
  });
  const [theme, setThemeState] = useState(() => {
    return DEFAULT_THEME;
  });
  const [hydrated, setHydrated] = useState(false);
  const lastSyncedThemeRef = useRef(theme);

  const hydrateTheme = useCallback((key) => {
    const stored = normalizeTheme(readThemeForUser(key) || DEFAULT_THEME);
    lastSyncedThemeRef.current = stored || DEFAULT_THEME;
    setThemeState(stored || DEFAULT_THEME);
    applyThemeToDocument(stored || DEFAULT_THEME);
  }, []);

  useEffect(() => {
    const key = userId || null;
    setActiveUserKey(key);
    hydrateTheme(key);
    setHydrated(true);
  }, [userId, hydrateTheme]);

  useEffect(() => {
    if (!hydrated) return;
    writeThemeForUser(activeUserKey, theme);
    applyThemeToDocument(theme);
  }, [theme, activeUserKey, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const handler = (event) => {
      const detail = event?.detail || {};
      const targetId = detail.userId ?? null;
      const relevant = !targetId || targetId === activeUserKey;
      if (!relevant) return;
      if (typeof detail.theme === 'string') {
        const incomingTheme = normalizeTheme(detail.theme);
        lastSyncedThemeRef.current = incomingTheme;
        setThemeState(incomingTheme);
        applyThemeToDocument(incomingTheme);
      } else {
        hydrateTheme(activeUserKey);
      }
    };

    window.addEventListener(PREFERENCE_EVENT, handler);
    return () => window.removeEventListener(PREFERENCE_EVENT, handler);
  }, [activeUserKey, hydrated, hydrateTheme]);

  useEffect(() => {
    if (!hydrated || !token || !activeUserKey) return;
    if (lastSyncedThemeRef.current === theme) return;

    const controller = new AbortController();
    const persist = async () => {
      try {
        await fetch('/api/users/preferences', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ theme }),
          signal: controller.signal,
        });
        lastSyncedThemeRef.current = theme;
        emitPreferencesEvent({ userId: activeUserKey, theme });
      } catch (err) {
        console.warn('Failed to persist theme preference:', err);
      }
    };

    persist();
    return () => controller.abort();
  }, [theme, hydrated, token, activeUserKey]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState((prev) => {
      const normalized = normalizeTheme(typeof nextTheme === 'function' ? nextTheme(prev) : nextTheme);
      return normalized || DEFAULT_THEME;
    });
  }, []);

  const resolvedTheme = theme;

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme: () => setTheme((t) => (
      t === 'default' ? 'contrast' :
      t === 'contrast' ? 'particles' :
      t === 'particles' ? 'retro' :
      'default'
    )),
  }), [theme, resolvedTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;

