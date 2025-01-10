import axios from 'axios';

const API_URL = 'https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app/api/patients';  // Replace with your actual API URL

// Fetch all patients
const getPatients = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Add a new patient
const addPatient = async (patientData, token) => {
  const response = await axios.post(API_URL, patientData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update patient details
const updatePatient = async (id, patientData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, patientData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Delete a patient
const deletePatient = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
};
