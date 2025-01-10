import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
            <h1 className="text-4xl font-extrabold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
