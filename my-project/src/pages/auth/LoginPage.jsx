import React, { useState } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For handling loading state
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    // Set loading state while waiting for the API response
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://hospital-food-management-system-nine.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // Include cookies or authentication tokens
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'Invalid credentials');
        return;
      }

      const data = await res.json();
      // Assuming the response contains a token or user data
      localStorage.setItem('token', data.token);
      navigate('/patients');  // Navigate to the dashboard on successful login
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);  // Stop loading state when done
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');  // Navigate to the SignUp page when clicked
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Show loading text while waiting for response */}
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {/* Sign Up button */}
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={handleSignUpRedirect}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
