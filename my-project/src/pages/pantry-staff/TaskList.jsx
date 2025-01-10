import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import * as  taskService  from '../../services/taskService'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await taskService.getTasks(token); // Fetch tasks using the service
        setTasks(response); // Set tasks in state
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Assigned Meal Tasks</h2>
          <p className="text-gray-600 mb-6">Here is a list of the tasks assigned to you.</p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Task ID</th>
                  <th className="px-4 py-2 border">Patient</th>
                  <th className="px-4 py-2 border">Meal Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-4 py-2 border">{task.id}</td>
                      <td className="px-4 py-2 border">{task.patient_name}</td>
                      <td className="px-4 py-2 border">{task.meal_type}</td>
                      <td className="px-4 py-2 border">{task.task_status}</td>
                      <td className="px-4 py-2 border">
                        <Link to={`/pantry-staff/task-status/${task.id}`} className="text-blue-500">
                          Update Status
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 border text-center">No tasks assigned.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
