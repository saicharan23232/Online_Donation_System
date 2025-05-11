import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('All fields are required.');
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
      // Simulate an API call (replace with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess('Your message has been sent successfully! Redirecting...');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 3000);
    } catch (err) {
      setError('Failed to send your message. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="container mx-auto text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          We’d love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          {error && (
            <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</p>
          )}
          {success && (
            <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">{success}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Other Ways to Reach Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Email</h3>
            <p className="text-gray-600">support@giveandgrow.org</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Address</h3>
            <p className="text-gray-600">123 Charity Lane, Suite 100, Hope City, HC 12345</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;