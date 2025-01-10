import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddDietChart = () => {
  const [mealType, setMealType] = useState('');
  const [morningMeal, setMorningMeal] = useState('');
  const [eveningMeal, setEveningMeal] = useState('');
  const [nightMeal, setNightMeal] = useState('');
  const [morningIngredients, setMorningIngredients] = useState('');
  const [eveningIngredients, setEveningIngredients] = useState('');
  const [nightIngredients, setNightIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const { patientId } = useParams();
  const navigate = useNavigate();

  // Example: AddDietChart component
const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    const dietChart = {
      mealType,
      morningMeal,
      eveningMeal,
      nightMeal,
      morningIngredients,
      eveningIngredients,
      nightIngredients,
      instructions,
    };
  
    try {
      const res = await fetch(`https://hospital-food-management-system-nine.vercel.app/api/diet-charts/${patientId}`, {
        method: 'PUT', // Change POST to PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dietChart),
      });
  
      if (res.ok) {
        navigate(`/diet-chart-list/${patientId}`); // Navigate back to the diet chart list
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || 'Failed to update diet chart'}`);
      }
    } catch (error) {
      alert('An error occurred while updating the diet chart');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Diet Chart for Patient ID: {patientId}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="mealType">
              Meal Type
            </label>
            <input
              id="mealType"
              type="text"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              placeholder="Enter meal type (e.g., Breakfast, Lunch, Dinner)"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="morningMeal">
              Morning Meal
            </label>
            <input
              id="morningMeal"
              type="text"
              value={morningMeal}
              onChange={(e) => setMorningMeal(e.target.value)}
              placeholder="Enter morning meal details"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="morningIngredients">
              Morning Ingredients
            </label>
            <input
              id="morningIngredients"
              type="text"
              value={morningIngredients}
              onChange={(e) => setMorningIngredients(e.target.value)}
              placeholder="Enter ingredients for the morning meal"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eveningMeal">
              Evening Meal
            </label>
            <input
              id="eveningMeal"
              type="text"
              value={eveningMeal}
              onChange={(e) => setEveningMeal(e.target.value)}
              placeholder="Enter evening meal details"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="eveningIngredients">
              Evening Ingredients
            </label>
            <input
              id="eveningIngredients"
              type="text"
              value={eveningIngredients}
              onChange={(e) => setEveningIngredients(e.target.value)}
              placeholder="Enter ingredients for the evening meal"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nightMeal">
              Night Meal
            </label>
            <input
              id="nightMeal"
              type="text"
              value={nightMeal}
              onChange={(e) => setNightMeal(e.target.value)}
              placeholder="Enter night meal details"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nightIngredients">
              Night Ingredients
            </label>
            <input
              id="nightIngredients"
              type="text"
              value={nightIngredients}
              onChange={(e) => setNightIngredients(e.target.value)}
              placeholder="Enter ingredients for the night meal"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter any special instructions (e.g., low sugar, no salt)"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDietChart;
