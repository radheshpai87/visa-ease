import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from "react-icons/gi";
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Home = () => {
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

  return (
    <div className='w-full bg-gradient-to-b from-zinc-200 to-zinc-100 min-h-screen md:py-28 md:px-16 py-8 px-5 flex md:flex-row flex-col gap-8 relative overflow-hidden justify-between'>
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-20" />
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-100 rounded-full opacity-20" />
      </div>

      <div className='font-bold flex gap-5 flex-col sm:mt-0 mt-7 md:w-1/2'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex gap-3 font-bold items-center font-serif'
        >
          <GiCommercialAirplane className='text-[#be0b32] text-2xl animate-bounce'/>
          <p className='text-[#be0b32]'>TRUSTED IMMIGRATION PARTNER</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-5xl md:text-6xl font-serif tracking-tighter'
        >
          <h1 className='bg-gradient-to-r from-[#be0b32] to-[#ff1f4d] text-transparent bg-clip-text'>
            Our simple approach to
          </h1>
          <h1>immigration process</h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='font-light text-gray-700 text-lg'
        >
          We are trusted immigration consultants who can handle your case and our professional registered agents will assist you with your visa application.
        </motion.p>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 my-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#be0b32]">{stat.number}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className='mt-6 flex sm:flex-row flex-col gap-5'>
          <Link to="/visa-enquiry">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='relative p-4 bg-[#be0b32] text-white text-lg rounded-2xl w-[89vw] md:w-fit shadow-lg transition-all duration-300 hover:bg-[#8c0826] hover:shadow-xl'
            >
              <span>Get Started</span>
            </motion.button>
          </Link>   
          <Link>       
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='relative p-4 bg-[#be0b32] text-white text-lg rounded-2xl w-[89vw] md:w-fit shadow-lg transition-all duration-300 hover:bg-[#8c0826] hover:shadow-xl'
            >
              <span>Book A Consultation</span>
            </motion.button>
          </Link>
        </div>

        <div className='mt-4'>
          <Link to="/check-visa">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-4 bg-[#be0b32] text-white text-lg rounded-2xl w-[89vw] sm:px-[2vw] md:w-[352px] shadow-lg transition-all duration-300 hover:bg-[#8c0826] hover:shadow-xl"
            >
              <span>Check Visa</span>
            </motion.button>
          </Link>
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 mt-8"
        >
          {[1, 2, 3].map((badge) => (
            <div key={badge} className="bg-white p-3 rounded-full shadow-md">
              <GiCommercialAirplane className="text-[#be0b32] text-xl" />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className='md:w-[650px] md:h-[600px] relative flex items-center justify-center bottom-3'
      >
        <div className='relative'>
          <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-blue-100 rounded-full opacity-20 blur-2xl" />
          <img 
            src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/hero-country-circle-img.png" 
            className='circle md:w-[580px] md:h-[580px] h-[400px] w-[400px] hover:opacity-90 transition-opacity duration-300' 
            draggable="false"
            alt="Countries circle"
          />
          <motion.img 
            src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/hero-image.jpg" 
            className='rounded-full w-[290px] h-[290px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[370px] md:h-[370px] hover:scale-105 transition-transform duration-300 shadow-2xl' 
            draggable="false"
            alt="Hero image"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
