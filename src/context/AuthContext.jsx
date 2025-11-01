import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const { data } = await api.verifyToken();
          setUser(data.user);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      return data.user; // Return user data for redirect
    } catch (error) {
      console.error('Login failed', error);
      console.error('Error response:', error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.register(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      return data.user; // Return user data for redirect
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
