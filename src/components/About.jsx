import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Clock, Users, CheckCircle, Award } from 'react-feather';

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
  </svg>
);

const About = () => {
  const sectionsRef = useRef([]);
  
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '50K+', label: 'Happy Clients' },
    { number: '180+', label: 'Countries Covered' },
    { number: '98%', label: 'Success Rate' }
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', position: 'CEO & Founder', image: 'https://i.pinimg.com/736x/e4/f1/5b/e4f15b975046fec4c08352eb0ca3870a.jpg' },
    { name: 'Michael Chen', position: 'CTO', image: 'https://i.pinimg.com/736x/ab/45/e5/ab45e55c0296e98eb437fa29f53acb70.jpg' },
    { name: 'Aisha Patel', position: 'Operations Director', image: 'https://i.pinimg.com/736x/22/e8/63/22e86384a84e506597b61f1613204c16.jpg' },
    { name: 'David Rodriguez', position: 'Customer Success', image: 'https://i.pinimg.com/736x/ec/d6/a8/ecd6a894e5511f7a45c89a6e098780d2.jpg' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#051440] to-[#be0b32] text-white relative overflow-hidden"
      >
        {/* Background Pattern Elements */}
        <div className="absolute inset-0">
          {/* Top Left Planes */}
          <div className="absolute top-[10%] left-[15%] rotate-[-45deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute top-[15%] left-[25%] rotate-[15deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Top Right Planes */}
          <div className="absolute top-[12%] right-[15%] rotate-[45deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute top-[20%] right-[25%] rotate-[-15deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Middle Left Planes */}
          <div className="absolute top-[40%] left-[5%] rotate-[30deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute top-[45%] left-[20%] rotate-[-30deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Middle Right Planes */}
          <div className="absolute top-[45%] right-[8%] rotate-[120deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute top-[50%] right-[18%] rotate-[150deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Bottom Left Planes */}
          <div className="absolute bottom-[15%] left-[15%] rotate-[210deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute bottom-[25%] left-[25%] rotate-[195deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Bottom Right Planes */}
          <div className="absolute bottom-[20%] right-[18%] rotate-[150deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute bottom-[30%] right-[28%] rotate-[165deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Center Area Planes */}
          <div className="absolute top-[35%] left-[40%] rotate-[45deg] opacity-15">
            <PlaneIcon />
          </div>
          <div className="absolute bottom-[35%] right-[40%] rotate-[225deg] opacity-15">
            <PlaneIcon />
          </div>

          {/* Decorative circles - Enhanced */}
          {/* Top Left Group */}
          <div className="absolute top-[10%] left-[15%]">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Top Right Group */}
          <div className="absolute top-[15%] right-[20%]">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="20" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Middle Left Group */}
          <div className="absolute top-[45%] left-[8%]">
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="28" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Middle Right Group */}
          <div className="absolute top-[40%] right-[12%]">
            <svg className="w-28 h-28" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Bottom Left Group */}
          <div className="absolute bottom-[20%] left-[18%]">
            <svg className="w-20 h-20" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="20" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Bottom Right Group */}
          <div className="absolute bottom-[20%] right-[10%]">
            <svg className="w-40 h-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Center Top Group */}
          <div className="absolute top-[25%] left-[40%]">
            <svg className="w-16 h-16" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="25" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="15" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>

          {/* Center Bottom Group */}
          <div className="absolute bottom-[30%] left-[60%]">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
              <circle cx="50" cy="50" r="20" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-15"/>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 p-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About VisaEase
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Your Trusted Partner in Global Mobility
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#be0b32] to-[#8a0e24] text-transparent bg-clip-text">
                  Our Story
                </span>
              </h2>
              <div className="w-20 h-1 bg-[#be0b32] mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Since 2010, VisaEase has been at the forefront of immigration consulting, helping thousands of individuals and businesses navigate the complex world of global mobility. Our commitment to excellence and customer satisfaction has made us a trusted name in the industry.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                  >
                    <div className="text-3xl font-bold text-[#be0b32]">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/about-img-1-1.jpg"
                alt="About Us"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 md:w-[200px] w-[150px] h-[150px] md:h-[200px] rounded-full bg-[#be0b32] flex items-center justify-center text-white text-center p-4">
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#be0b32] to-[#8a0e24] text-transparent bg-clip-text">
              Meet Our Team
            </span>
          </h2>
          <p className="text-gray-600 mb-12 text-lg">Expert professionals dedicated to your success</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-[#be0b32] font-medium">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="py-16 bg-[#051440] text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you achieve your global mobility goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#be0b32] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-[#8c0826]"
            >
              Get Started
            </motion.a>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-white hover:text-[#051440]"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
