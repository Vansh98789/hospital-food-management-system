import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const DashboardHome = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Hospital Food Manager Dashboard</h2>
          <p className="text-gray-600">Here you can manage patients, diet charts, and assign meal tasks to pantry staff.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
