import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiCommercialAirplane } from "react-icons/gi";
import { FaCheckCircle, FaShieldAlt, FaClock, FaGlobe, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (user.role === 'officer') {
        navigate('/officer-dashboard', { replace: true });
      } else if (user.role === 'applicant') {
        navigate('/applicant-dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    // Rotate circle animation
    gsap.to(".circle", {
      rotate: 360,
      duration: 25,
      repeat: -1,
      ease: "linear"
    });

    // Float animation for statistics
    gsap.to(".stat-card", {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.2
    });
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "50K+", label: "Happy Clients" },
    { number: "180+", label: "Countries Covered" },
    { number: "98%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: <FaCheckCircle className="text-4xl text-[#be0b32]" />,
      title: "Expert Guidance",
      description: "Professional immigration consultants with years of experience handling complex visa applications."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-[#be0b32]" />,
      title: "Secure Process",
      description: "Your documents and personal information are protected with industry-standard security measures."
    },
    {
      icon: <FaClock className="text-4xl text-[#be0b32]" />,
      title: "Fast Processing",
      description: "Streamlined application process to get your visa approved quickly and efficiently."
    },
    {
      icon: <FaGlobe className="text-4xl text-[#be0b32]" />,
      title: "Global Coverage",
      description: "Visa services for over 180 countries worldwide with dedicated support for each destination."
    }
  ];

  const faqs = [
    {
      question: "How long does the visa application process take?",
      answer: "Processing times vary by visa type and country. Tourist visas typically take 5-15 business days, while work and study visas may take 4-12 weeks. We provide real-time updates throughout the process."
    },
    {
      question: "What documents do I need for my visa application?",
      answer: "Required documents vary by visa type but typically include a valid passport, passport-size photos, proof of accommodation, travel itinerary, financial statements, and purpose-specific documents. Our team will provide a complete checklist based on your destination."
    },
    {
      question: "Can you help if my visa application is rejected?",
      answer: "Yes! We offer visa rejection assistance services. Our experts will review your case, identify the reasons for rejection, and help you reapply with a stronger application. We have a high success rate with reapplications."
    },
    {
      question: "Do you provide services for all countries?",
      answer: "We provide visa services for over 180 countries worldwide. Our network of immigration experts specializes in various regions including North America, Europe, Asia, Australia, and the Middle East."
    },
    {
      question: "How can I track my visa application status?",
      answer: "Once you submit your application through our platform, you'll receive a unique tracking ID. You can log in to your dashboard anytime to check real-time status updates, receive notifications, and communicate with your assigned visa officer."
    },
    {
      question: "What are your service fees?",
      answer: "Our fees vary depending on the visa type, destination country, and processing speed. We offer transparent pricing with no hidden charges. Contact us for a detailed quote tailored to your specific requirements."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className='w-full bg-gradient-to-b from-zinc-200 to-zinc-100 min-h-screen md:py-28 md:px-16 py-8 px-5 flex md:flex-row flex-col gap-8 relative overflow-hidden justify-between'>
        {/* Enhanced Background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-pink-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Decorative lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#be0b32" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Floating shapes */}
          <div className="absolute top-32 right-32 w-12 h-12 border-4 border-red-200 rounded-lg rotate-45 opacity-40 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-32 left-32 w-16 h-16 border-4 border-blue-200 rounded-full opacity-40 animate-bounce" />
        </div>

        <div className='font-bold flex gap-5 flex-col sm:mt-0 mt-7 md:w-1/2 z-10'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex gap-3 font-bold items-center font-serif'
          >
            <GiCommercialAirplane className='text-[#be0b32] text-2xl animate-bounce'/>
            <p className='text-[#be0b32] tracking-wide'>TRUSTED IMMIGRATION PARTNER</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='text-5xl md:text-6xl font-serif tracking-tighter'
          >
            <h1 className='bg-gradient-to-r from-[#be0b32] via-[#ff1f4d] to-[#be0b32] text-transparent bg-clip-text animate-gradient'>
              Our simple approach to
            </h1>
            <h1 className='mt-2'>immigration process</h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='font-light text-gray-700 text-lg leading-relaxed'
          >
            We are trusted immigration consultants who can handle your case and our professional registered agents will assist you with your visa application.
          </motion.p>

          {/* Statistics Section - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 my-8"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-[#be0b32] group cursor-pointer"
              >
                <h3 className="text-3xl font-bold text-[#be0b32] group-hover:scale-110 transition-transform duration-300">{stat.number}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Single CTA Button - More prominent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className='mt-6'
          >
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(190, 11, 50, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className='relative p-5 bg-gradient-to-r from-[#be0b32] to-[#8c0826] text-white text-xl rounded-2xl w-full md:w-[400px] shadow-2xl transition-all duration-300 overflow-hidden group'
              >
                <span className='relative z-10 font-semibold flex items-center justify-center gap-3'>
                  <GiCommercialAirplane className='text-2xl group-hover:translate-x-2 transition-transform duration-300' />
                  Start Your Journey
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-[#8c0826] to-[#be0b32] opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative badge elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-6 mt-8 items-center"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((badge) => (
                <div key={badge} className="bg-gradient-to-br from-[#be0b32] to-[#8c0826] p-3 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <GiCommercialAirplane className="text-white text-xl" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-800">180+ Countries</p>
              <p className="text-xs text-gray-600">Worldwide Coverage</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className='md:w-[650px] md:h-[600px] relative flex items-center justify-center bottom-3'
        >
          <div className='relative'>
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-purple-200 to-blue-200 rounded-full opacity-30 blur-3xl animate-pulse" />
            
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#be0b32] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 rounded-full border-2 border-[#be0b32] opacity-10 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            
            <img 
              src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/hero-country-circle-img.png" 
              className='circle md:w-[580px] md:h-[580px] h-[400px] w-[400px] hover:opacity-90 transition-opacity duration-300 drop-shadow-2xl' 
              draggable="false"
              alt="Countries circle"
            />
            <motion.img 
              src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/hero-image.jpg" 
              className='rounded-full w-[290px] h-[290px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[370px] md:h-[370px] hover:scale-105 transition-transform duration-300 shadow-2xl border-4 border-white' 
              draggable="false"
              alt="Hero image"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            {/* Floating decorative elements around the image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 right-10 bg-white p-3 rounded-full shadow-xl"
            >
              <FaCheckCircle className="text-green-500 text-2xl" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-10 bg-white p-3 rounded-full shadow-xl"
            >
              <FaGlobe className="text-[#be0b32] text-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-20 px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-[#be0b32]">Our Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive visa solutions with a focus on excellence, security, and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-5 md:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="text-[#be0b32]">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our visa services and application process.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <FaMinus className="text-[#be0b32] text-xl" />
                    ) : (
                      <FaPlus className="text-[#be0b32] text-xl" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA at the end of FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center bg-gradient-to-r from-[#be0b32] to-[#8c0826] rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/90 mb-6">
              Our expert team is ready to help you with your visa application journey.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#be0b32] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
