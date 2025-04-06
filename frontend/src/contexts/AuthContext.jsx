"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { getUserProfile, loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem("token");
    if (token) {
      // Get user data
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getUserProfile();
      const { user } = response.data;
      setCurrentUser(user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError("");
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setError("");
      const response = await loginUser(email, password);
      const { token, user } = response.data;
      // Save token to sessionStorage
      sessionStorage.setItem("token", token);

      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
    setError,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
