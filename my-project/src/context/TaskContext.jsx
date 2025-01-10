import React, { createContext, useState, useContext, useEffect } from 'react';
import * as  taskService from '../services/taskService';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      taskService.getTasks(token).then(setTasks);
    }
  }, [token]);

  const assignTask = async (taskData) => {
    const newTask = await taskService.createTask(taskData, token);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = async (id, updatedStatus) => {
    const updatedTask = await taskService.updateTaskStatus(id, updatedStatus, token);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id, token);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, assignTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
