// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Removed useNavigate as it's not used
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const commonLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeLinkClasses = "bg-indigo-900 text-white"; // Example active state
  const inactiveLinkClasses = "text-gray-300 hover:bg-indigo-700 hover:text-white";

  const mobileCommonLinkClasses = "block px-3 py-2 rounded-md text-base font-medium";
  const mobileActiveLinkClasses = "bg-indigo-700 text-white";
  const mobileInactiveLinkClasses = "text-gray-300 hover:bg-indigo-600 hover:text-white";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide transform hover:scale-105 transition-transform duration-300"
              onClick={closeMenu}
            >
              GIVE&GROW
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" end className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Home</NavLink>
            <NavLink to="/campaigns" className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Campaigns</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Dashboard</NavLink>
            <NavLink to="/payment" className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Payment</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Contact</NavLink>
            <NavLink
              to="/login"
              className={`${commonLinkClasses} bg-yellow-500 hover:bg-yellow-400 text-gray-900`}
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800">
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `${mobileCommonLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}>Home</NavLink>
          <NavLink to="/campaigns" onClick={closeMenu} className={({ isActive }) => `${mobileCommonLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}>Campaigns</NavLink>
          <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => `${mobileCommonLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}>Dashboard</NavLink>
          <NavLink to="/payment" onClick={closeMenu} className={({ isActive }) => `${mobileCommonLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}>Payment</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `${mobileCommonLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}>Contact</NavLink>
          <NavLink to="/login" onClick={closeMenu} className={`${mobileCommonLinkClasses} bg-yellow-500 hover:bg-yellow-400 text-gray-900`}>Login</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;