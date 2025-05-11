// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserCircleIcon = () => <svg className="w-5 h-5 mr-2 inline text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>;
const MailIcon = () => <svg className="w-5 h-5 mr-2 inline text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path fillRule="evenodd" d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clipRule="evenodd"></path></svg>;
const CalendarIcon = () => <svg className="w-5 h-5 mr-2 inline text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>;

const UserDashboard = () => {
  const [user] = useState({ 
    fullName: 'Valued Visitor',
    email: 'visitor@example.com',
    createdAt: new Date().toISOString(),
  });
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setCampaigns([
        {id: 'camp1', title: "Featured Campaign Alpha", description: "Support this amazing cause that helps communities.", },
        {id: 'camp2', title: "Global Impact Initiative", description: "Join us in making a worldwide difference.", },
    ]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="user-dashboard min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="dashboard-header container mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.fullName}! (Public Dashboard View)
        </h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Platform Highlights</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center text-lg"><UserCircleIcon /> Active Donors: 5,000+</li>
            <li className="flex items-center text-sm"><MailIcon /> Campaigns Funded: 1,200+</li>
            <li className="flex items-center text-sm"><CalendarIcon /> Total Impact: $2.5M+ Raised</li>
          </ul>
          <button
            onClick={() => navigate('/about')}
            className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm"
          >
            Learn More About GIVE&GROW
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Spotlight Campaigns</h2>
          {campaigns.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-item bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-blue-600">{campaign.title}</h3>
                  <p className="text-gray-600 mt-1 mb-3 text-sm truncate">{campaign.description}</p>
                  <button
                    onClick={() => navigate(`/campaigns`)}
                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View All Campaigns
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-800">Discover Impactful Causes</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Explore our active campaigns and contribute to making a difference.
                </p>
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/campaigns')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Explore Campaigns
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;