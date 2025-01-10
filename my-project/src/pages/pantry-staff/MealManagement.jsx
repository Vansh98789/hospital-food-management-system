import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const MealManagement = () => {
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState('');
  
  const handleMealSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (via API)
    alert(`Meal: ${mealName} with Ingredients: ${ingredients} added/updated!`);
    setMealName('');
    setIngredients('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Manage Meals</h2>
          <form onSubmit={handleMealSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Meal Name</label>
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Enter meal name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Ingredients</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Enter ingredients"
              ></textarea>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add/Update Meal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealManagement;
