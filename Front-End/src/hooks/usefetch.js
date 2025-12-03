import { useState, useEffect } from 'react';

// Prefer env-configured base URL; fallback to /api (Vite proxy)
const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || '').trim();
const API_PREFIX = '/api';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fullUrl = url.startsWith('http')
          ? url
          : `${API_BASE_URL || API_PREFIX}${url}`;
        
        const fetchOptions = {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
          },
          ...options,
        };

        const response = await fetch(fullUrl, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.status === 'success') {
          setData(result.data);
        } else {
          setError(result.message || 'Unknown error');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetch;
