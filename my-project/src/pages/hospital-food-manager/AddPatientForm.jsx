import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
const AddPatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    room_number: '',
    bed_number: '',
    floor_number: '',
    diseases: '',
    allergies: '',
    contact_info: '',
    emergency_contact: '',
    additional_info: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('https://hospital-food-management-system-nine.vercel.app/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token for authorization
        },
        body: JSON.stringify(patientData),
      });

      if (!res.ok) {
        throw new Error('Failed to add patient');
      }

      // Redirect to the patient list page after successful addition
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              placeholder="Patient Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="room_number"
              value={patientData.room_number}
              onChange={handleChange}
              placeholder="Room Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="bed_number"
              value={patientData.bed_number}
              onChange={handleChange}
              placeholder="Bed Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="floor_number"
              value={patientData.floor_number}
              onChange={handleChange}
              placeholder="Floor Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="diseases"
              value={patientData.diseases}
              onChange={handleChange}
              placeholder="Diseases"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="allergies"
              value={patientData.allergies}
              onChange={handleChange}
              placeholder="Allergies"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="contact_info"
              value={patientData.contact_info}
              onChange={handleChange}
              placeholder="Contact Information"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="emergency_contact"
              value={patientData.emergency_contact}
              onChange={handleChange}
              placeholder="Emergency Contact"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="additional_info"
              value={patientData.additional_info}
              onChange={handleChange}
              placeholder="Additional Information"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;
