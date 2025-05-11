// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios'; // No actual API call in this unauthenticated demo version
import signupImage from '../images/loginimage.jpeg'; // Make sure this image exists in src/images/
import './SignUp.css';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080'; // Not used for demo

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Kept for UI feedback
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const { fullName, email, password, confirmPassword } = formData;

    // Basic client-side validation (still good to have for UI)
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required. (Demo)');
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long. (Demo)');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. (Demo)');
      setIsLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address. (Demo)');
        setIsLoading(false);
        return;
    }
    
    // Simulate API call delay and success for demo purposes
    // In a real app, this is where you'd make the axios.post call
    setTimeout(() => {
      setSuccess('Sign up form submitted successfully! (Demo) Redirecting to login...');
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); // Clear form
      setIsLoading(false);
      setTimeout(() => {
        navigate('/login'); // Navigate to the demo login page
      }, 2000); // Wait a bit after success message
    }, 1500); // Simulate network delay

    // --- ACTUAL SIGNUP LOGIC (Commented out for demo) ---
    /*
    try {
      // const response = await axios.post(
      //   `${API_BASE_URL}/api/user/register`,
      //   { fullName, email, password },
      //   { headers: { 'Content-Type': 'application/json' } }
      // );
      // setError('');
      // setSuccess('Registration successful! Redirecting to login...');
      // setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate('/login'); 
      // }, 2000);
    } catch (err) {
      // console.error('Registration Error:', err);
      // setSuccess('');
      // setIsLoading(false);
      // if (err.response) {
      //   setError(err.response.data.message || 'Registration failed. Please try again.');
      // } else if (err.request) {
      //   setError('Unable to connect to the server. Please ensure the backend is running.');
      // } else {
      //   setError('An unexpected error occurred: ' + err.message);
      // }
    }
    */
    // --- END OF ACTUAL SIGNUP LOGIC ---
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img 
            src={signupImage} 
            alt="Join Us Illustration" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Your Account</h1>
          <p className="text-center text-gray-600 mb-8">
            Join GIVE&GROW and start making a difference today. (Demo Form)
          </p>
          
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm text-center">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {success ? 'Redirecting...' : 'Processing...'}
                </span>
              ) : 'Sign Up '}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Login 
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;