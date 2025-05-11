// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignList.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Default campaigns to show if backend returns nothing
const fallbackCampaigns = [
  {
    id: 'default1',
    title: 'Support Children’s Education',
    description: 'Help underprivileged children access quality education and resources.',
    imageUrl: 'https://via.placeholder.com/400x200?text=Education+Support',
  },
  {
    id: 'default2',
    title: 'Disaster Relief Fund',
    description: 'Provide emergency aid to communities affected by natural disasters.',
    imageUrl: 'https://via.placeholder.com/400x200?text=Disaster+Relief',
  },
  {
    id: 'default3',
    title: 'Healthcare for All',
    description: 'Assist those in need with essential medical treatments and healthcare access.',
    imageUrl: 'https://via.placeholder.com/400x200?text=Healthcare+Support',
  },
  {
    id: 'default4',
    title: 'Feed the Hungry',
    description: 'Contribute to efforts that feed homeless and hungry families every day.',
    imageUrl: 'https://via.placeholder.com/400x200?text=Food+Donation',
  },
  {
    id: 'default5',
    title: 'Clean Water Initiative',
    description: 'Fund clean water systems for rural villages around the world.',
    imageUrl: 'https://via.placeholder.com/400x200?text=Water+Aid',
  },
];

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns`);
        const realCampaigns = response.data?.slice(0, 5);
        if (realCampaigns && realCampaigns.length > 0) {
          setCampaigns(realCampaigns);
        } else {
          setCampaigns(fallbackCampaigns);
        }
        setError('');
      } catch (err) {
        console.error(err);
        setError('Backend error. Showing default campaigns.');
        setCampaigns(fallbackCampaigns); // Fallback on error as well
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (isLoading) {
    return <p className="text-center mt-10">Loading campaigns...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Featured Campaigns</h2>
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
          >
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{campaign.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{campaign.description}</p>
            <button
              onClick={() =>
                campaign.id.startsWith('default')
                  ? alert('This is a sample campaign.')
                  : navigate(`/campaigns/${campaign.id}`)
              }
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
