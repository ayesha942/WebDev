import React, { createContext, useContext, useEffect, useState } from 'react'

// Creating the context
const AuthContext = createContext();

// Creating a provider for the context
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    // Check if authentication data exists in localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);


  const login = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
