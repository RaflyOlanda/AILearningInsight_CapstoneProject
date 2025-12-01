import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Initialize from localStorage on mount, or use demo userId
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedUserId = localStorage.getItem('userId');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
      
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        // Default to a demo user ID for testing (first user in database)
        setUserId('96989');
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      // Fallback to demo user
      setUserId('96989');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setUserId(userData.user_id || userData.id);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', userData.user_id || userData.id);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, userId, loading, login, logout }}>
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
