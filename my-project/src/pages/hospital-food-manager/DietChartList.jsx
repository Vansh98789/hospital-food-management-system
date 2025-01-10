import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const DietChartList = () => {
  const [dietCharts, setDietCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(''); // Add state for patient ID
  const navigate = useNavigate();

  // Fetch diet charts when patientId changes
  useEffect(() => {
    if (!patientId) return; // Don't fetch if no patientId is set

    const fetchDietCharts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch(`https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app/api/diet-charts/${patientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch diet charts');
        }

        const data = await res.json();
        setDietCharts(data); // Assuming diet charts are returned as an array
        setLoading(false);
      } catch (error) {
        setError('Failed to load diet charts');
        setLoading(false);
      }
    };

    fetchDietCharts();
  }, [patientId, navigate]);

  // Handle the Add Diet Chart action
  const handleAddDietChart = () => {
    if (!patientId) {
      alert('Please enter a patient ID first');
      return;
    }
    navigate(`/add-diet-chart/${patientId}`); // Navigate to the Add Diet Chart page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Diet Chart List</h2>

          {/* Input for patient ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="patientId">
              Patient ID
            </label>
            <input
              id="patientId"
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button to Add Diet Chart */}
          <button
            onClick={handleAddDietChart}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Diet Chart
          </button>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-500">{error}</div> 
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Patient ID</th>
                  <th className="p-4 text-left">Meal Type</th>
                  <th className="p-4 text-left">Morning Meal</th>
                  <th className="p-4 text-left">Evening Meal</th>
                  <th className="p-4 text-left">Night Meal</th>
                </tr>
              </thead>
              <tbody>
                {dietCharts.map((chart) => (
                  <tr key={chart.id} className="border-b">
                    <td className="p-4">{chart.patient_id}</td>
                    <td className="p-4">{chart.meal_type}</td>
                    <td className="p-4">{chart.morning_meal}</td>
                    <td className="p-4">{chart.evening_meal}</td>
                    <td className="p-4">{chart.night_meal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietChartList;
