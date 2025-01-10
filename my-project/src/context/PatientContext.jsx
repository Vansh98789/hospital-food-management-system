import React, { createContext, useState, useContext, useEffect } from 'react';
import patientService from '../services/patientService';
import AuthContext from './AuthContext';

const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      patientService.getPatients(token).then(setPatients);
    }
  }, [token]);

  const addPatient = async (patientData) => {
    const newPatient = await patientService.addPatient(patientData, token);
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  const updatePatient = async (id, updatedData) => {
    const updatedPatient = await patientService.updatePatient(id, updatedData, token);
    setPatients((prevPatients) =>
      prevPatients.map((patient) => (patient.id === id ? updatedPatient : patient))
    );
  };

  const deletePatient = async (id) => {
    await patientService.deletePatient(id, token);
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
