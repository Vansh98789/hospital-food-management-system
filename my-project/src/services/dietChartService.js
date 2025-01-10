// /services/dietChartService.js
import axios from 'axios';
const API_URL = 'https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app/api/diet-charts';

// Fetch diet chart by patient ID
const getDietChartByPatientId = async (token, patientId) => {
  const response = await axios.get(`${API_URL}/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create a new diet chart
const createDietChart = async (dietChartData, token) => {
  const response = await axios.post(API_URL, dietChartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a diet chart
const updateDietChart = async (id, dietChartData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, dietChartData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a diet chart
const deleteDietChart = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getDietChartByPatientId,
  createDietChart,
  updateDietChart,
  deleteDietChart,
};
