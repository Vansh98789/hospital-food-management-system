import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Analytics = () => {
  const [data, setData] = useState(null);

  // Mock data for the chart (You can replace this with data from your API)
  const mockData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Meals Assigned',
        data: [20, 25, 30, 40, 35],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Meals Delivered',
        data: [15, 20, 25, 30, 30],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  useEffect(() => {
    setData(mockData);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Food Task Analytics</h2>
          <p className="text-gray-600 mb-6">Analyze meal assignments and deliveries over time.</p>
          {data ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Meals Assigned vs Delivered</h3>
              <Line data={data} />
            </div>
          ) : (
            <p>Loading Analytics...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
