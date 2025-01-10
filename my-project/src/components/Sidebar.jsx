import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        {/* Hospital Food Manager Dashboard Links */}
        <li><Link to="/patients" className="block py-2 hover:bg-gray-700 px-2 rounded">Patient List</Link></li>
        <li><Link to="/diet-charts" className="block py-2 hover:bg-gray-700 px-2 rounded">Diet Charts</Link></li>
        <li><Link to="/assign-task" className="block py-2 hover:bg-gray-700 px-2 rounded">Assign Tasks</Link></li>

        {/* Pantry Staff Management Links */}
        <li><Link to="/pantry-tasks" className="block py-2 hover:bg-gray-700 px-2 rounded">Pantry Tasks</Link></li>
        <li><Link to="/task-status-update/:taskId" className="block py-2 hover:bg-gray-700 px-2 rounded">Task Status Update</Link></li>
        <li><Link to="/meal-management" className="block py-2 hover:bg-gray-700 px-2 rounded">Meal Management</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
