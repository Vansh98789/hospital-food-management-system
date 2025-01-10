import axios from 'axios';

const API_URL = 'http://localhost:9878/api/auth';  // Replace with your actual API URL

// Login request
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Signup request
const signup = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data;
};

// Get the current user data
const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  login,
  signup,
  getCurrentUser
};
