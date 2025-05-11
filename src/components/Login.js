// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios'; // No login API call in unauthenticated version
import loginImage from '../images/loginimage.jpeg';
import './Login.css';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false); // Not strictly needed if no API call
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true); // Not strictly needed
    setError('');

    // For unauthenticated version, this form doesn't actually log anyone in.
    // It could navigate to dashboard or show a message.
    if (!formData.email.trim() || !formData.password) {
        setError('Email and password fields are just for show in this demo.');
        // setIsLoading(false);
        return;
    }
    
    // Simulate a successful "pretend" login for demo purposes
    alert("Login form submitted (demo only). In a real app, you'd be logged in and redirected.");
    navigate('/dashboard'); // Or /campaigns

    // Actual login logic would be here if auth was enabled:
    /*
    try {
      // const response = await axios.post(`${API_BASE_URL}/api/user/login`, formData);
      // const { token } = response.data;
      // localStorage.setItem('token', token);
      // const event = new Event('localstorage-changed'); // If using event for Navbar update
      // window.dispatchEvent(event);
      // navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed (demo).');
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2 hidden md:block">
          <img 
            src={loginImage} 
            alt="Welcome Back" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Welcome Back!</h1>
          <p className="text-center text-gray-600 mb-8">
            (This is a demo login form. Authentication is currently disabled.)
          </p>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email" id="email" name="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password" id="password" name="password" placeholder="Enter your password"
                value={formData.password} onChange={handleChange} required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-end">
              <Link to="#" className="text-sm text-blue-600 hover:text-blue-500 hover:underline">
                Forgot Password? 
              </Link>
            </div>
            <button 
              type="submit" 
              // disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {/* {isLoading ? 'Logging In...' : 'Login (Demo)'} */}
              Login 
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Sign Up 
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;