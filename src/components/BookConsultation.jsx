import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BookConsultation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    visaCategory: '',
    questions: '',
    howDidYouHear: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Consultation booking request submitted successfully! We will contact you shortly to confirm your appointment.');
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      consultationType: '',
      preferredDate: '',
      preferredTime: '',
      visaCategory: '',
      questions: '',
      howDidYouHear: '',
      agreeToTerms: false
    });
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-blue-900 flex items-center justify-center px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white hover:text-gray-200 transition-colors font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
      >
        <FaArrowLeft /> Back to Home
      </button>
      
      {/* Base dot grid pattern */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, transparent 1.5px)',
             backgroundSize: '25px 25px',
             backgroundPosition: '0 0, 12.5px 12.5px',
             opacity: 0.1
           }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Top Left Pattern */}
        <div className="absolute top-[5%] left-[10%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Top Right Pattern */}
        <div className="absolute top-[15%] right-[10%]">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Bottom Left Pattern */}
        <div className="absolute bottom-[10%] left-[15%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Bottom Right Pattern */}
        <div className="absolute bottom-[20%] right-[12%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute top-[40%] left-[5%]">
          <svg className="w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute bottom-[35%] right-[8%]">
          <svg className="w-16 h-16 opacity-10 rotate-45" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>
      </div>

      {/* Curved lines */}
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

      {/* Main Content */}
      <div className="relative w-full max-w-4xl px-6 z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-3">Book a Consultation</h2>
        <p className="text-gray-200 text-center text-lg mb-10">Schedule a personalized consultation with our visa experts</p>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Personal Information */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="consultationType" className="block text-sm font-medium text-gray-700 mb-1">Consultation Type*</label>
              <select
                id="consultationType"
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Consultation Type</option>
                <option value="Online">Online (Video Call)</option>
                <option value="In-Person">In-Person</option>
                <option value="Phone">Phone Call</option>
              </select>
            </div>

            {/* Appointment Details */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date*</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time*</label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Time Slot</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
              </select>
            </div>

            <div>
              <label htmlFor="visaCategory" className="block text-sm font-medium text-gray-700 mb-1">Visa Category*</label>
              <select
                id="visaCategory"
                name="visaCategory"
                value={formData.visaCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Visa Category</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Business Visa">Business Visa</option>
                <option value="Family Visa">Family Visa</option>
                <option value="Permanent Residency">Permanent Residency</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
              <select
                id="howDidYouHear"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select an option</option>
                <option value="Google">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend/Family</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2">
              <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">Questions or Special Requirements</label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Please share any specific questions or requirements you have for the consultation"
              />
            </div>

            <div className="md:col-span-2 flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to be contacted regarding my consultation request and understand that I can reschedule or cancel with at least 24 hours notice*
              </label>
            </div>

            <button 
              type="submit" 
              className="md:col-span-2 bg-red-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 mt-4"
            >
              Book Consultation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;