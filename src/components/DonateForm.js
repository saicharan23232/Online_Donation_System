// src/components/DonateForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const DonateForm = () => {
  const { campaignId } = useParams(); // Get campaignId from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
    campaignId: campaignId || null, // Set campaignId from param
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState(''); // To display campaign title

  useEffect(() => {
    // If there's a campaignId, fetch its title for display
    if (campaignId) {
      const fetchCampaignTitle = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/campaigns/${campaignId}`);
          setCampaignTitle(response.data.title);
        } catch (err) {
          console.warn("Could not fetch campaign title for donation form:", err);
          // Optionally set an error or just proceed without title
        }
      };
      fetchCampaignTitle();
    }
    // Update formData if campaignId changes (e.g., direct navigation)
    setFormData(prev => ({ ...prev, campaignId: campaignId || null }));
  }, [campaignId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const { name, email, amount } = formData;

    if (!name.trim() || !email.trim() || !amount) {
      setError('Name, Email, and Amount are required.');
      setIsLoading(false);
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive donation amount.');
      setIsLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }

    try {
      const payload = { ...formData, amount: parseFloat(amount) };
      // Backend should handle donations without a userId if unauthenticated
      // Or assign a default/anonymous user ID on the backend
      await axios.post(`${API_BASE_URL}/api/donations`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      setSuccess('Thank you for your generous donation! Redirecting...');
      setFormData({ name: '', email: '', amount: '', message: '', campaignId: campaignId || null });
      setTimeout(() => {
        setIsLoading(false);
        navigate(campaignId ? `/campaign/${campaignId}` : '/campaigns');
      }, 3000);
    } catch (err) {
      console.error('Donation Error:', err);
      setIsLoading(false);
      setError(err.response?.data?.message || 'Failed to process the donation. Please try again.');
    }
  };

  return (
    <div className="donate-form-page bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="donate-form-container bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">Make a Donation</h1>
          {campaignId && campaignTitle && (
            <p className="text-gray-600 mt-3 text-lg">You are donating to: <span className="font-semibold">{campaignTitle}</span></p>
          )}
          {!campaignId && (
            <p className="text-gray-600 mt-3 text-lg">Support a general cause or choose a campaign later.</p>
          )}
          <p className="text-gray-500 mt-1">Your contribution can make a real difference.</p>
        </div>

        {error && <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</p>}
        {success && <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" id="name" name="name" placeholder="Enter your full name"
              value={formData.name} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email" id="email" name="email" placeholder="Enter your email"
              value={formData.email} onChange={handleChange} required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount ($)</label>
            <input
              type="number" id="amount" name="amount" placeholder="e.g., 50"
              value={formData.amount} onChange={handleChange} required min="1" step="any"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
            <textarea
              id="message" name="message" rows="4" placeholder="Write a message (optional)"
              value={formData.message} onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-yellow-500 text-gray-900 py-3 px-4 rounded-md font-semibold hover:bg-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Donate Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;