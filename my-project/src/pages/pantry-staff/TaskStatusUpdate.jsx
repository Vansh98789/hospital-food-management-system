import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import * as taskService  from '../../services/taskService'; // Service to handle API calls

const TaskStatusUpdate = () => {
  const { taskId } = useParams(); // Get task ID from URL params
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    const fetchTask = async () => {
      const response = await taskService.getTaskById(taskId);
      setTask(response.data);
      setStatus(response.data.task_status);
    };
    fetchTask();
  }, [taskId]);

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, { task_status: status });
      alert('Task status updated successfully');
      setTask(updatedTask.data);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task status.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Update Task Status</h2>
          
          {task ? (
            <form onSubmit={handleStatusChange} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Task ID</label>
                <input type="text" value={task.id} disabled className="mt-2 p-2 border rounded w-full" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Current Status</label>
                <input type="text" value={task.task_status} disabled className="mt-2 p-2 border rounded w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 p-2 border rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
              
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Status</button>
            </form>
          ) : (
            <p>Loading Task...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskStatusUpdate;
