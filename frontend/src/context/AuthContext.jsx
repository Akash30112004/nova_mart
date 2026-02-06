import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-login on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('novamart_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/auth/me');
        setUser(response.data.data || response.data.user || response.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to restore session:', err);
        localStorage.removeItem('novamart_token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password && password.length >= 6;
  };

  const validateName = (name) => {
    return name && name.trim().length >= 2;
  };

  const extractErrorMessage = (err, fallback = 'Something went wrong') => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      fallback
    );
  };

  // Login function
  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }

      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      const userData = response.data.user || response.data.data;

      if (!token) {
        throw new Error('Authentication token not received');
      }

      localStorage.setItem('novamart_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('authChanged'));
      setLoading(false);

      return { success: true };
    } catch (err) {
      const message = extractErrorMessage(err, 'Invalid email or password');
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  // Signup function
  const signup = async (name, email, password, confirmPassword, adminSecretKey = null) => {
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (!validateName(name)) {
        throw new Error('Name must be at least 2 characters');
      }

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const payload = { name, email, password };
      if (adminSecretKey) {
        payload.adminSecretKey = adminSecretKey;
      }
      const response = await api.post('/api/auth/signup', payload);

      const token = response.data.token;
      const userData = response.data.user || response.data.data;

      if (!token) {
        throw new Error('Authentication token not received');
      }

      localStorage.setItem('novamart_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      window.dispatchEvent(new Event('authChanged'));
      setLoading(false);

      return { success: true };
    } catch (err) {
      const message = extractErrorMessage(err, 'Failed to create account');
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    }
    localStorage.removeItem('novamart_token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    window.dispatchEvent(new Event('authChanged'));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


