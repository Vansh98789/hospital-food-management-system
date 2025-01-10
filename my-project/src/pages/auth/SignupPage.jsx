import React, { useState } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:9878/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError('Signup failed');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/patients');  // Use navigate() instead of history.push()
    } catch (error) {
      setError('Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
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
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
