import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Button from '../../components/Button';

const TaskAssignment = () => {
  const [patients, setPatients] = useState([]);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [mealType, setMealType] = useState('');
  const [instructions, setInstructions] = useState('');

  // Fetch patients and pantry staff data
  useEffect(() => {
    const fetchData = async () => {
      const patientsRes = await fetch('https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app//api/patients');
      const staffRes = await fetch('https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app//api/pantry-staff');
      setPatients(await patientsRes.json());
      setPantryStaff(await staffRes.json());
    };

    fetchData();
  }, []);

  // Handle form submission for task assignment
  const handleAssignTask = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!selectedPatient || !selectedStaff || !mealType) {
      alert('Please fill out all required fields');
      return;
    }

    const taskData = {
      patient_id: selectedPatient,
      meal_type: mealType,
      pantry_staff_id: selectedStaff,
      instructions,
    };

    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

      if (!token) {
        alert('You need to be logged in to assign tasks');
        return;
      }

      const res = await fetch('https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token as Bearer token
        },
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        alert('Task assigned successfully!');
      } else {
        const errorData = await res.json();
        alert(`Failed to assign task: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error while assigning task:', error);
      alert('Failed to assign task');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Assign Meal Task</h2>
          <form onSubmit={handleAssignTask} className="space-y-4">
            {/* Patient ID input */}
            <div>
              <label htmlFor="patient" className="block text-gray-700">Patient ID</label>
              <input
                type="number"
                id="patient"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Patient ID"
              />
            </div>

            {/* Pantry Staff ID input */}
            <div>
              <label htmlFor="staff" className="block text-gray-700">Pantry Staff ID</label>
              <input
                type="number"
                id="staff"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Pantry Staff ID"
              />
            </div>

            {/* Meal Type dropdown */}
            <div>
              <label htmlFor="meal" className="block text-gray-700">Meal Type</label>
              <select
                id="meal"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select meal type</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>

            {/* Instructions textarea */}
            <div>
              <label htmlFor="instructions" className="block text-gray-700">Instructions</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter meal instructions"
              />
            </div>

            <Button type="submit" className="bg-blue-500 text-white">Assign Task</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;
