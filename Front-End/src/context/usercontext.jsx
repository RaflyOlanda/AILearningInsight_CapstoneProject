import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
  emitPreferencesEvent,
  readThemeForUser,
  writeThemeForUser,
  writeBadgeForUser,
  readBadgeForUser,
} from '../lib/preferences';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const syncPreferencesFromServer = useCallback(async (uid, authToken) => {
    if (!uid || !authToken || typeof window === 'undefined') return;
    try {
      const response = await fetch('/api/users/preferences', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const body = await response.json();
      const prefs = body?.data || {};
      if (prefs.theme) {
        writeThemeForUser(uid, prefs.theme);
      }
      if (prefs.badge) {
        writeBadgeForUser(uid, prefs.badge);
      }
      emitPreferencesEvent({ userId: uid, ...prefs });
    } catch (err) {
      console.warn('Failed to sync preferences from server:', err);
    }
  }, []);

  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
      
      if (storedUserId) {
        setUserId(storedUserId);
      }

      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId && token) {
      syncPreferencesFromServer(userId, token);
    }
  }, [userId, token, syncPreferencesFromServer]);

  const login = (userData, authToken, preferences = {}) => {
    setUser(userData);
    const uid = String(userData.user_id ?? userData.id ?? '');
    setUserId(uid || null);
    localStorage.setItem('user', JSON.stringify(userData));
    if (uid) localStorage.setItem('userId', uid);
    setToken(authToken || null);
    if (authToken) localStorage.setItem('token', authToken);

    if (uid && preferences.theme) {
      writeThemeForUser(uid, preferences.theme);
    }
    if (uid && preferences.badge) {
      writeBadgeForUser(uid, preferences.badge);
    }
    if (uid && (preferences.theme || preferences.badge)) {
      emitPreferencesEvent({ userId: uid, ...preferences });
    }

    if (uid && authToken) {
      syncPreferencesFromServer(uid, authToken);
    }
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    emitPreferencesEvent({ userId: null });
  };

  return (
    <UserContext.Provider value={{
      user,
      userId,
      token,
      loading,
      login,
      logout,
      refreshPreferences: () => {
        if (userId && token) {
          syncPreferencesFromServer(userId, token);
        }
      },
      getStoredPreferences: () => ({
        theme: userId ? readThemeForUser(userId) : null,
        badge: userId ? readBadgeForUser(userId) : null,
      }),
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
