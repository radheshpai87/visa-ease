import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CheckVisa = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Status check request submitted. Results will be sent to your email.");
    setEmail('');
    setApplicationNumber('');
    setPassportNumber('');
    setDateOfBirth('');
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-blue-900 flex items-center justify-center">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white hover:text-gray-200 transition-colors font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
      >
        <FaArrowLeft /> Back to Home
      </button>
      
      {/* Base dot grid pattern with increased visibility */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, transparent 1.5px)',
             backgroundSize: '25px 25px',
             backgroundPosition: '0 0, 12.5px 12.5px',
             opacity: 0.1
           }}
      />

      {/* Background Pattern Elements with increased density */}
      <div className="absolute inset-0">
        {/* Top Left Section */}
        <div className="absolute top-[10%] left-[15%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[5%] left-[25%]">
          <svg className="w-16 h-16 opacity-10 rotate-12" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Top Right Section */}
        <div className="absolute top-[15%] right-[20%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[8%] right-[30%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Upper Middle Section */}
        <div className="absolute top-[25%] left-[40%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[20%] right-[35%]">
          <svg className="w-12 h-12 opacity-10 -rotate-15" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Left Section */}
        <div className="absolute top-[40%] left-[8%]">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="#ffffff" strokeWidth="1" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[50%] left-[20%]">
          <svg className="w-16 h-16 opacity-10 rotate-90" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Center Section */}
        <div className="absolute top-[45%] left-[35%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Middle Right Section */}
        <div className="absolute top-[45%] right-[12%]">
          <svg className="w-16 h-16 opacity-10 -rotate-45" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute top-[55%] right-[25%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Bottom Left Section */}
        <div className="absolute bottom-[15%] left-[20%]">
          <svg className="w-10 h-10 opacity-10 rotate-45" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute bottom-[25%] left-[10%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Bottom Right Section */}
        <div className="absolute bottom-[25%] right-[18%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute bottom-[15%] right-[30%]">
          <svg className="w-14 h-14 opacity-10 rotate-180" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Additional Elements */}
        <div className="absolute top-[35%] left-[60%]">
          <svg className="w-16 h-16" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute bottom-[40%] right-[40%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>
      </div>
      
      {/* Curved lines from Login component */}
      {[0, 1, 2].map((_, idx) => (
        <div
          key={idx}
          className={`absolute w-64 h-64 opacity-5 ${
            idx === 0 ? 'bottom-0 left-0' : idx === 1 ? 'top-0 right-0 rotate-180' : 'top-1/4 left-1/4 rotate-45'
          }`}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,90 Q40,40 90,10" stroke="white" fill="transparent" strokeWidth="2" />
          </svg>
        </div>
      ))}

      {/* Main content - keeping structure but updating fields */}
      <div className="relative w-full max-w-2xl px-6 z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-3">Check Your Visa Status</h2>
        <p className="text-gray-200 text-center text-lg mb-10">Enter your application details to verify your visa status</p>
        
        <div className="bg-white rounded-xl shadow-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="applicationNumber" className="block text-base font-medium text-gray-700 mb-2">Application Number</label>
              <input
                id="applicationNumber"
                type="text"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your visa application number"
              />
            </div>
            <div>
              <label htmlFor="passportNumber" className="block text-base font-medium text-gray-700 mb-2">Passport Number</label>
              <input
                id="passportNumber"
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your passport number"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-base font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email to receive results"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-red-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 mt-4"
            >
              Check Visa Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckVisa;