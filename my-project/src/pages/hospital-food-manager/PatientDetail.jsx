import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';

const PatientDetail = () => {
  const { id } = useParams();  // Get the patient ID from the URL
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch(`https://hospital-food-management-sy-git-287cc8-vanshs-projects-a0570c07.vercel.app/api/patients/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await res.json();
        setPatient(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Patient Details</h2>
          {patient && (
            <div>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Room Number:</strong> {patient.room_number}</p>
              <p><strong>Bed Number:</strong> {patient.bed_number}</p>
              <p><strong>Floor Number:</strong> {patient.floor_number}</p>
              <p><strong>Diseases:</strong> {patient.diseases}</p>
              <p><strong>Allergies:</strong> {patient.allergies}</p>
              <p><strong>Contact Info:</strong> {patient.contact_info}</p>
              <p><strong>Emergency Contact:</strong> {patient.emergency_contact}</p>
              <p><strong>Additional Info:</strong> {String(patient.additional_info) || 'No additional information available.'}</p>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
