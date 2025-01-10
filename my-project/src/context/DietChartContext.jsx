// /context/DietChartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import dietChartService from '../services/dietChartService';
import AuthContext from './AuthContext';

const DietChartContext = createContext();

export const DietChartContextProvider = ({ children, patientId }) => {
  const [dietCharts, setDietCharts] = useState([]);
  const { token } = useContext(AuthContext);

  // Fetch diet charts when token or patientId changes
  useEffect(() => {
    if (token && patientId) {
      dietChartService.getDietChartByPatientId(token, patientId).then(setDietCharts); // Fetch for specific patient
    }
  }, [token, patientId]);

  const createDietChart = async (dietChartData) => {
    const newDietChart = await dietChartService.createDietChart(dietChartData, token);
    setDietCharts((prevDietCharts) => [...prevDietCharts, newDietChart]);
  };

  const updateDietChart = async (id, updatedData) => {
    const updatedDietChart = await dietChartService.updateDietChart(id, updatedData, token);
    setDietCharts((prevDietCharts) =>
      prevDietCharts.map((dietChart) => (dietChart.id === id ? updatedDietChart : dietChart))
    );
  };

  const deleteDietChart = async (id) => {
    await dietChartService.deleteDietChart(id, token);
    setDietCharts((prevDietCharts) => prevDietCharts.filter((dietChart) => dietChart.id !== id));
  };

  return (
    <DietChartContext.Provider value={{ dietCharts, createDietChart, updateDietChart, deleteDietChart }}>
      {children}
    </DietChartContext.Provider>
  );
};

export default DietChartContext;
