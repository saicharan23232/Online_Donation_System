import React from 'react';
import { useNavigate } from 'react-router-dom';
import about1 from '../images/about1.jpg'; // Kept as requested
import heroImage from '../images/heroImage.jpg'; // Kept as requested

// Placeholder icons - replace with actual SVGs or an icon library for better visuals
const TransparencyIcon = () => (
  <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
  </svg>
);

const ImpactIcon = () => (
  <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.268-.25-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.268.25-1.857m0 0a5.002 5.002 0 019.5 0M12 14v6M8 7h4m0 0L8 4m4 3-4 3"></path>
  </svg>
);

const About = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/campaigns');
  };

  const valueCardsData = [
    { icon: <TransparencyIcon />, title: "Transparency", description: "We ensure every donation is tracked and its impact communicated clearly." },
    { icon: <SecurityIcon />, title: "Security", description: "Your data and donations are protected with industry-standard security measures." },
    { icon: <ImpactIcon />, title: "Impact", description: "We focus on campaigns that create real, measurable, and sustainable change." },
    { icon: <CommunityIcon />, title: "Community", description: "We foster a supportive community, bringing people together for meaningful causes." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Mission Section */}
      <section className="container mx-auto flex flex-col md:flex-row items-center gap-12 py-12 md:py-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Our Mission</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At GIVE&GROW, our mission is to empower social change by connecting passionate donors with impactful campaigns. 
            We believe in the transformative power of collective action to create a better, more equitable world for everyone.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src={about1} alt="Our Mission - diverse hands working together" className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-96" />
        </div>
      </section>

      {/* Story Section - Alternating Layout */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              GIVE&GROW was founded with a simple yet powerful vision: to make charitable giving accessible, transparent, and profoundly impactful. 
              What began as a small initiative to support local community projects has blossomed into a global platform, 
              uniting thousands of donors with a diverse array of causes that truly matter.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="Our Story - a plant growing" className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-96" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto py-12 md:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {valueCardsData.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center transform hover:-translate-y-2"
            >
              {value.icon}
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 md:py-24 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join our growing community of givers and start supporting causes that align with your passion and values. Every contribution helps.
          </p>
          <button
            className="bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={handleExploreClick}
          >
            Explore Campaigns Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;