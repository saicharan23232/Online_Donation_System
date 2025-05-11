// src/pages/PaymentPage.js
import React, { useEffect, useState } from 'react';
import './PaymentPage.css'; // Import the CSS file

// import { useNavigate } from 'react-router-dom'; // Not strictly needed if no navigation from here

const CreditCardIcon = () => <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
const HistoryIcon = () => <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

const PaymentPage = () => {
  // const navigate = useNavigate(); // Keep if you add links
  const [donationHistory, setDonationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setDonationHistory([
      {id: 'don_sample1', date: '2023-10-28', campaignTitle: 'Community Health Drive', amount: 75.00, status: 'Example'},
      {id: 'don_sample2', date: '2023-10-25', campaignTitle: 'Literacy Program Funding', amount: 30.00, status: 'Example'},
    ]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="payment-page bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Donation Information</h1>
        <p className="text-center text-gray-600 mb-10">
          We use secure payment processors for all transactions. When you're ready to make a personalized impact, creating an account allows you to track your donations and manage payment methods easily.
        </p>

        <section className="mb-12 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-4 border-b pb-4">
            <CreditCardIcon />
            <h2 className="text-2xl font-semibold text-gray-700">Our Secure Payment Process</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            GIVE&GROW is committed to ensuring your donation process is safe and secure. We partner with industry-leading payment gateways like Stripe and PayPal to handle all financial transactions. 
            This means your sensitive card details are encrypted and processed directly by these trusted providers, and are never stored on our servers.
          </p>
          <p className="text-gray-600 mt-3 leading-relaxed">
            You can confidently make contributions using major credit/debit cards or via your PayPal account, knowing your information is protected by robust security measures.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-6 border-b pb-4">
            <HistoryIcon />
            <h2 className="text-2xl font-semibold text-gray-700">Recent Platform Donations (Examples)</h2>
          </div>
          {donationHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donationHistory.map(donation => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{donation.campaignTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${parseFloat(donation.amount).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
             <p className="text-gray-500 text-center py-4">No example donations to display currently.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default PaymentPage;