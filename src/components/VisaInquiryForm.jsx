import React, { useState } from "react";

const VisaInquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    residence: "",
    visaType: "",
    destination: "",
    travelDate: "",
    purpose: "",
    comments: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-[#f6f8fc] flex items-center justify-center">
      {/* Base dot grid pattern with increased density */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#be0b32 1.5px, transparent 1.5px), radial-gradient(#be0b32 1.5px, transparent 1.5px)',
             backgroundSize: '20px 20px',
             backgroundPosition: '0 0, 10px 10px',
             opacity: 0.18
           }}
      />

      {/* Background Pattern Elements with increased density */}
      <div className="absolute inset-0">
        {/* Top Left Section */}
        <div className="absolute top-[5%] left-[10%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="25" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[15%] left-[25%]">
          <svg className="w-16 h-16 opacity-15 rotate-12" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Top Center */}
        <div className="absolute top-[8%] left-[45%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Top Right Section */}
        <div className="absolute top-[12%] right-[15%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[20%] right-[35%]">
          <svg className="w-16 h-16 opacity-15 -rotate-15" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Left Section */}
        <div className="absolute top-[40%] left-[5%]">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="#be0b32" strokeWidth="1" fill="none" className="opacity-10"/>
          </svg>
        </div>

        <div className="absolute top-[35%] left-[20%]">
          <svg className="w-16 h-16 opacity-15 rotate-90" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Middle Right Section */}
        <div className="absolute top-[45%] right-[8%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute top-[38%] right-[25%]">
          <svg className="w-16 h-16 opacity-15 -rotate-45" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Bottom Left Section */}
        <div className="absolute bottom-[15%] left-[15%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute bottom-[25%] left-[35%]">
          <svg className="w-16 h-16 opacity-15 rotate-180" viewBox="0 0 24 24" fill="#be0b32">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        {/* Bottom Right Section */}
        <div className="absolute bottom-[20%] right-[18%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="30" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        {/* Additional Elements for density */}
        <div className="absolute top-[60%] left-[50%]">
          <svg className="w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>

        <div className="absolute bottom-[40%] right-[40%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
            <circle cx="50" cy="50" r="25" stroke="#be0b32" strokeWidth="1.5" fill="none" className="opacity-15"/>
          </svg>
        </div>
      </div>

      {/* Main Content with compact layout */}
      <div className="relative w-full max-w-4xl px-6 z-10">
        <h2 className="text-4xl font-bold text-[#051440] text-center mb-2">Visa Inquiry Form</h2>
        <p className="text-gray-600 text-center text-lg mb-6">Fill in your details to submit a visa inquiry</p>
        
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Your nationality"
              />
            </div>

            <div>
              <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
              >
                <option value="">Select Visa Type</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Business Visa">Business Visa</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Family Visa">Family Visa</option>
                <option value="Medical Visa">Medical Visa</option>
                <option value="Official Visa">Official Visa</option>
              </select>
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Enter destination country"
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose of Travel</label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 text-base border border-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                placeholder="Describe your travel purpose"
              />
            </div>

            <div className="col-span-2 flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className="w-4 h-4 text-[#be0b32] border-red-900 rounded focus:ring-[#be0b32]"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I agree to be contacted regarding my visa inquiry
              </label>
            </div>

            <button 
              type="submit" 
              className="col-span-2 bg-[#be0b32] text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-[#8a0e24] transition duration-300 mt-4"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisaInquiryForm;
