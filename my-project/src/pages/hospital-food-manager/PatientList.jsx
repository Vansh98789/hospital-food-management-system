import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch('https://hospital-food-management-system-nine.vercel.app/api/patients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            navigate('/login');
          }
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to load patients');
        setLoading(false);
      }
    };

    fetchPatients();
  }, [navigate]);

  const handleAddPatient = () => {
    navigate('/add-patient'); // Navigate to the "Add New Patient" page
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Patient List</h2>
          <button
            onClick={handleAddPatient}
            className="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add New Patient
          </button>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Room</th>
                  <th className="p-4 text-left">Bed</th>
                  <th className="p-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b">
                    <td className="p-4">{patient.id}</td>
                    <td className="p-4">{patient.name}</td>
                    <td className="p-4">{patient.room_number}</td>
                    <td className="p-4">{patient.bed_number}</td>
                    <td className="p-4">
                      <a href={`/patients/${patient.id}`} className="text-blue-500">View Details</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
