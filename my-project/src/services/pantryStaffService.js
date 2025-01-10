import axios from 'axios';

const API_URL = 'http://localhost:9878/api/pantry-staff';  // Replace with your actual API URL

// Fetch all pantry staff members
const getStaff = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Add a new staff member
const addStaff = async (staffData, token) => {
  const response = await axios.post(API_URL, staffData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update staff member details
const updateStaff = async (id, staffData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, staffData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Delete a staff member
const deleteStaff = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff
};
