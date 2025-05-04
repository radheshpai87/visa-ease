import React, { useState } from 'react';

const CheckVisa = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Email sent to preview document process");
    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#f6f8fc] flex items-center justify-center">
      {/* Base dot grid pattern with increased visibility */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#be0b32 1.5px, transparent 1.5px), radial-gradient(#be0b32 1.5px, transparent 1.5px)',
             backgroundSize: '25px 25px',
             backgroundPosition: '0 0, 12.5px 12.5px',
             opacity: 0.18
           }}
      />

      {/* Background Pattern Elements with increased density */}
      <div className="absolute inset-0">
        {/* Top Left Section */}
        <div className="absolute top-[10%] left-[15%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="25" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[5%] left-[25%]">
          <svg className="w-16 h-16 opacity-15 rotate-12" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Top Right Section */}
        <div className="absolute top-[15%] right-[20%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[8%] right-[30%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Upper Middle Section */}
        <div className="absolute top-[25%] left-[40%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[20%] right-[35%]">
          <svg className="w-12 h-12 opacity-15 -rotate-15" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Left Section */}
        <div className="absolute top-[40%] left-[8%]">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="#be0b32" strokeWidth="1" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[50%] left-[20%]">
          <svg className="w-16 h-16 opacity-15 rotate-90" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Center Section */}
        <div className="absolute top-[45%] left-[35%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Middle Right Section */}
        <div className="absolute top-[45%] right-[12%]">
          <svg className="w-16 h-16 opacity-15 -rotate-45" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute top-[55%] right-[25%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="25" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Bottom Left Section */}
        <div className="absolute bottom-[15%] left-[20%]">
          <svg className="w-10 h-10 opacity-15 rotate-45" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute bottom-[25%] left-[10%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Bottom Right Section */}
        <div className="absolute bottom-[25%] right-[18%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute bottom-[15%] right-[30%]">
          <svg className="w-14 h-14 opacity-15 rotate-180" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Additional Elements */}
        <div className="absolute top-[35%] left-[60%]">
          <svg className="w-16 h-16" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute bottom-[40%] right-[40%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="25" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-2xl px-6 z-10">
        <h2 className="text-4xl font-bold text-[#051440] text-center mb-3">Check Your Visa Status</h2>
        <p className="text-gray-600 text-center text-lg mb-10">Enter your credentials to verify your application</p>
        
        <div className="bg-white/95 backdrop-blur-xl p-10 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-2">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 text-lg border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your password"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#be0b32] text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-[#8a0e24] transition duration-300 mt-4"
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