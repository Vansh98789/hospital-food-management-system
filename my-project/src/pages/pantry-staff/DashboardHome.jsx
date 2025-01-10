import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Pantry Staff Dashboard</h2>
          <p className="text-gray-600 mb-6">Welcome to the pantry staff dashboard. Here you can view and manage your assigned meal tasks.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Task List */}
            <Link to="/pantry-staff/task-list" className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">View Assigned Tasks</h3>
              <p>Manage the tasks assigned to you.</p>
            </Link>

            {/* Task Status */}
            <Link to="/pantry-staff/task-status" className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Update Task Status</h3>
              <p>Update the status of the tasks assigned to you.</p>
            </Link>

            {/* Meal Management (optional) */}
            <Link to="/pantry-staff/meal-management" className="bg-yellow-500 text-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Meal Management</h3>
              <p>Add or edit meals and ingredients.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
