import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardHome from './pages/hospital-food-manager/DashboardHome';
import PatientList from './pages/hospital-food-manager/PatientList';
import DietChartList from './pages/hospital-food-manager/DietChartList';
import AddDietChart from './pages/hospital-food-manager/AddDietChart';
import TaskAssignment from './pages/hospital-food-manager/TaskAssignment';
import Analytics from './pages/hospital-food-manager/Analytics';
import TaskList from './pages/pantry-staff/TaskList';
import TaskStatusUpdate from './pages/pantry-staff/TaskStatusUpdate';
import MealManagement from './pages/pantry-staff/MealManagement';
import NotFoundPage from './pages/NotFoundPage';
import AddPatientForm from './pages/hospital-food-manager/AddPatientForm';
import PatientDetail from './pages/hospital-food-manager/PatientDetail'; // Import the PatientDetail page

function AppRouter() {
  const { token } = useContext(AuthContext); // Check if the token is available for authentication

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes - Hospital Food Manager */}
      <Route
        path="/"
        element={token ? <DashboardHome /> : <Navigate to="/login" />}
      />
      <Route
        path="/patients"
        element={token ? <PatientList /> : <Navigate to="/login" />}
      />
       <Route
        path="/diet-charts"
        element={token ? <DietChartList /> : <Navigate to="/login" />}
      /> 
        <Route
        path="/diet-charts/:patientId"
        element={token ? <DietChartList /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-diet-chart/:patientId"
        element={token ? <AddDietChart/> : <Navigate to="/login" />}
      />
      <Route
        path="/assign-task"
        element={token ? <TaskAssignment /> : <Navigate to="/login" />}
      />
      <Route
        path="/analytics"
        element={token ? <Analytics /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-patient"
        element={token ? <AddPatientForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/patients/:id"
        element={token ? <PatientDetail /> : <Navigate to="/login" />} 
      />

      {/* Protected Routes - Pantry Staff */}
      <Route
        path="/pantry-tasks"
        element={token ? <TaskList /> : <Navigate to="/login" />}
      />
      <Route
        path="/task-status-update/:taskId"
        element={token ? <TaskStatusUpdate /> : <Navigate to="/login" />}
      />
      <Route
        path="/meal-management"
        element={token ? <MealManagement /> : <Navigate to="/login" />}
      />

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
