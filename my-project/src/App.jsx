import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { PatientContextProvider } from './context/PatientContext';
import { DietChartContextProvider } from './context/DietChartContext';
import { TaskContextProvider } from './context/TaskContext';
import { PantryStaffContextProvider } from './context/PantryStaffContext';
import AppRouter from './AppRouter'; // Import AppRouter to manage page routes
import './index.css'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an async operation like fetching user data or setting up local storage
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Router>  {/* Ensure the Router is the highest provider */}
      <AuthContextProvider> {/* Wrap AuthContextProvider inside Router */}
        <PatientContextProvider>
          <DietChartContextProvider>
            <TaskContextProvider>
              <PantryStaffContextProvider>
                {loading ? (
                  <div className="h-screen flex justify-center items-center">
                    <div className="spinner">Loading...</div>
                  </div>
                ) : (
                  <AppRouter />
                )}
              </PantryStaffContextProvider>
            </TaskContextProvider>
          </DietChartContextProvider>
        </PatientContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
