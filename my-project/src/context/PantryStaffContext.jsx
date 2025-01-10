import React, { createContext, useState, useContext, useEffect } from 'react';
import pantryStaffService from '../services/pantryStaffService';
import AuthContext from './AuthContext';

const PantryStaffContext = createContext();

export const PantryStaffContextProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      pantryStaffService.getStaff(token).then(setStaff);
    }
  }, [token]);

  const addStaffMember = async (staffData) => {
    const newStaff = await pantryStaffService.addStaff(staffData, token);
    setStaff((prevStaff) => [...prevStaff, newStaff]);
  };

  const updateStaffMember = async (id, updatedData) => {
    const updatedStaff = await pantryStaffService.updateStaff(id, updatedData, token);
    setStaff((prevStaff) =>
      prevStaff.map((staffMember) => (staffMember.id === id ? updatedStaff : staffMember))
    );
  };

  const deleteStaffMember = async (id) => {
    await pantryStaffService.deleteStaff(id, token);
    setStaff((prevStaff) => prevStaff.filter((staffMember) => staffMember.id !== id));
  };

  return (
    <PantryStaffContext.Provider value={{ staff, addStaffMember, updateStaffMember, deleteStaffMember }}>
      {children}
    </PantryStaffContext.Provider>
  );
};

export default PantryStaffContext;
