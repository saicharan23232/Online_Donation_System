import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns/${campaignId}`);
        setCampaign(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load campaign details. Please try again.');
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [campaignId]);

  const handleDonateClick = () => {
    navigate(`/donate/${campaignId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
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
          <p className="text-gray-600">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-700 bg-red-100 p-4 rounded-md">{error || 'Campaign not found.'}</p>
      </div>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Campaign Header */}
      <section className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <img
            src={campaign.image || 'https://via.placeholder.com/1200x400'}
            alt={campaign.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{campaign.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{campaign.description}</p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-600">
                Raised: <span className="font-semibold text-blue-600">${campaign.raised}</span> of ${campaign.goal}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={handleDonateClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Details */}
      <section className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Details</h2>
          <p className="text-gray-600 leading-relaxed">
            {campaign.details || 'No additional details available for this campaign.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CampaignDetail;