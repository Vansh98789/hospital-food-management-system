import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { getToken, setStoredToken, removeStoredToken } from '../utils/authHelpers';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to wait for token
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      // Optionally, fetch user data based on the token (e.g., an API call)
      // Example:
      // fetchUserData(storedToken).then(data => setUser(data));
    }
    setLoading(false); // Stop loading after checking the token
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setStoredToken(token); // Store token in local storage
    navigate('/patients');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeStoredToken(); // Remove token from local storage
    navigate('/'); // Redirect to the login page
  };

  // If loading is true, wait until the token is fetched before rendering anything
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a better loading screen
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
