
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { mockUsers } from '../data/mockData';
import { toast } from 'sonner';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, find user in mock data
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return;
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be sent to the backend)
      const newUser: User = {
        id: `user${Math.floor(Math.random() * 10000)}`,
        name,
        email,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        location: {
          lat: 37.7749,
          lng: -122.4194,
          address: "San Francisco, CA"
        }
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success(`Welcome to LocalSwap, ${name}!`);
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  const setUserLocation = (location: { lat: number; lng: number; address: string }) => {
    if (user) {
      const updatedUser = { ...user, location };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthState = {
    isAuthenticated: !!user,
    user,
    login,
    signup,
    logout,
    setUserLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
