import React, { useEffect, useRef } from 'react';
import { Globe, Shield, Clock, Users, CheckCircle, Award } from 'lucide-react';

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
  
      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.fromTo(section,
            { opacity: 0.7, y: 30 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                toggleActions: 'play none none reverse',
              },
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
            }
          );
        }
      });
    };
    loadGsap();
  }, []);
  

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
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-[#be0b32] text-white relative"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 p-6 text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Simplifying Global Mobility</h1>
          <p className="text-2xl mb-8 opacity-90">
            Streamlining visa documentation for businesses and travelers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#about" className="bg-white text-blue-700 font-bold py-3 px-8 rounded hover:bg-gray-100 transition">
              Our Solutions
            </a>
            <a href="#contact" className="border-2 border-white py-3 px-8 rounded hover:bg-white hover:text-blue-700 transition">
              Request Demo
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
              <div className="w-16 h-1 bg-blue-600 mb-6" />
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2018, our platform simplifies visa management for businesses and individuals across 30+ countries, making international travel seamless and efficient.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We combine real-time regulatory updates, AI-driven document verification, and global support to ensure fast, compliant visa processing with an industry-leading 98% approval rate.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '30+', label: 'Countries Served' },
                  { number: '150+', label: 'Visa Destinations' },
                  { number: '98%', label: 'Approval Rate' },
                  { number: '10k+', label: 'Happy Clients' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center bg-gray-100 p-6 rounded shadow">
                    <div className="text-3xl font-bold text-blue-700">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Us</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Global Coverage' },
              { icon: Shield, title: 'Secure & Compliant' },
              { icon: Clock, title: 'Time Efficiency' },
              { icon: Users, title: 'Expert Support' },
              { icon: CheckCircle, title: 'Automated Verification' },
              { icon: Award, title: 'High Success Rate' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full mx-auto mb-4">
                  <feature.icon size={28} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, officiis.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Team</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <img src={member.image} alt={member.name} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-blue-700 text-sm">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current[4] = el)}
        className="py-16 bg-blue-900 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify Visa Management?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients around the globe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-blue-700 font-bold py-3 px-8 rounded hover:bg-gray-100 transition">
              Request Demo
            </a>
            <a href="#" className="border-2 border-white py-3 px-8 rounded hover:bg-white hover:text-blue-700 transition">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
