import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import heroImage from '../images/heroImage.jpg'; // Corrected to lowercase
import campaignPlaceholder1 from '../images/campaignPlaceholder1.jpeg';
import campaignPlaceholder2 from '../images/campaignPlaceholder2.jpeg';
import campaignPlaceholder3 from '../images/campaignPlaceholder3.jpeg';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const Home = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns`);
        setCampaigns(response.data.slice(0, 3)); // Get top 3 campaigns
        setLoading(false);
      } catch (err) {
        setError('Failed to load campaigns. Please try again.');
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleDonateClick = () => {
    navigate('/campaigns');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Together, We Can Make a Difference</h1>
          <p className="text-lg sm:text-xl mb-6">
            Join GIVE&GROW to support meaningful causes and create lasting impact.
          </p>
          <button
            onClick={handleDonateClick}
            className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
          >
            Donate Now
          </button>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Featured Campaigns
        </h2>
        {loading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600">Loading campaigns...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-700 bg-red-100 p-4 rounded-md">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const placeholderImages = [campaignPlaceholder1, campaignPlaceholder2, campaignPlaceholder3];
              const progressPercentage = (campaign.raised / campaign.goal) * 100;
              return (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <img
                    src={campaign.image || placeholderImages[index % 3]}
                    alt={campaign.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">
                    Raised: <span className="font-semibold text-blue-600">${campaign.raised}</span> of ${campaign.goal}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Involved?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Your support can change lives. Start exploring campaigns today!
          </p>
          <button
            onClick={handleDonateClick}
            className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
          >
            Explore Campaigns
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;