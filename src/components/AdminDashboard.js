// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [admin] = useState({
    fullName: "Platform Administrator",
    email: "admin@giveandgrow.com",
    role: "viewer"
  });
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setCampaigns([
      { id: 'c1', title: 'Global Education Fund', description: 'Overview of funding for education projects.' },
      { id: 'c2', title: 'Environmental Protection Initiative', description: 'Status of environmental campaigns.' },
    ]);
    setDonations([
      { id: 'd1', donorName: 'Public Donor A', amount: 100, campaignTitle: 'Global Education Fund', createdAt: new Date().toISOString() },
      { id: 'd2', donorName: 'Public Donor B', amount: 50, campaignTitle: 'Environmental Protection Initiative', createdAt: new Date().toISOString() },
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
    <div className="admin-dashboard min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="dashboard-header container mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Platform Overview (Public Admin View)</h1>
        <p className="text-gray-600">This is a public demonstration of platform statistics. Full administrative capabilities are restricted.</p>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Platform Information</h2>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Viewing As:</strong> {admin.fullName} ({admin.role})</li>
            <li><strong>Contact:</strong> {admin.email}</li>
            <li className="mt-4 pt-4 border-t"><strong>Total Campaigns:</strong> {campaigns.length} (Featured)</li>
            <li><strong>Total Sample Donations:</strong> {donations.length}</li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Featured Campaign Overviews</h2>
          {campaigns.length > 0 ? (
            <ul className="space-y-4">
              {campaigns.map((campaign) => (
                <li key={campaign.id} className="campaign-item bg-gray-50 p-4 rounded-md shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-600">{campaign.title}</h3>
                  <p className="text-gray-600 mt-1">{campaign.description}</p>
                  <button
                    onClick={() => navigate(`/campaigns`)}
                    className="mt-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Public Campaigns
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No campaign overviews available.</p>
          )}
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Recent Public Donations (Sample)</h2>
          {donations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{donation.donorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">${donation.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{donation.campaignTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No public donation samples available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;