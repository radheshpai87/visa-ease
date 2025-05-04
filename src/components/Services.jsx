import React from "react";
import { FaMapMarkerAlt, FaSuitcase, FaStamp, FaBus } from "react-icons/fa";

const Services = () => {
    const visaCards = [
        {
          icon: <FaMapMarkerAlt className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Student Visa",
          description: "We guide students to get smooth and fast student visa approvals worldwide.",
        },
        {
          icon: <FaSuitcase className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Tourist Visa",
          description: "Plan your holidays stress-free. We help you get tourist visas easily.",
        },
        {
          icon: <FaStamp className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Business Visa",
          description: "Need to travel for work? We streamline your business visa application process.",
        },
        {
          icon: <FaBus className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Work Permit",
          description: "Your path to overseas employment starts here. Hassle-free work visa help.",
        },
        {
          icon: <FaMapMarkerAlt className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Family Visa",
          description: "Reunite with your loved ones through our family visa assistance programs.",
        },
        {
          icon: <FaSuitcase className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Residence Visa",
          description: "Planning long-term settlement? Our experts help with permanent residence visas.",
        },
        {
          icon: <FaStamp className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Medical Visa",
          description: "Travel for healthcare made easy with our fast-track medical visa support.",
        },
        {
          icon: <FaBus className="text-white text-2xl group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Official Visa",
          description: "We provide tailored solutions for diplomats and officials traveling abroad.",
        }
      ];
      

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 pt-28 relative z-50" data-scroll data-scroll-section>
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-[#be0b32] font-extrabold tracking-wide uppercase text-4xl mb-2">
          Our Services
        </h2>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#051440] leading-tight">
          Explore Visa Types <br />
          <span className="bg-gradient-to-r from-[#be0b32] to-[#8a0e24] text-transparent bg-clip-text">
            Tailored for You
          </span>
        </h2>
        <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
          Our team offers expert guidance in multiple visa categories. From students to travelers and professionals—our services ensure smooth processing and fast approvals.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visaCards.map((card, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl p-8 bg-white text-gray-800 shadow-md transition-all duration-300"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#be0b32] translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"></div>

            {/* Card Content */}
            <div className="relative z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-[#be0b32] group-hover:bg-white transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#051440] group-hover:text-white transition-all duration-300">
                {card.title}
              </h3>
              <p className="text-sm mb-4 group-hover:text-white transition-all duration-300">
                {card.description}
              </p>
              <button className="font-semibold text-[#be0b32] group-hover:text-white transition-all duration-300">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-12 text-gray-700 text-[16px]">
        Need personalized assistance?{" "}
        <span className="text-[#be0b32] font-bold cursor-pointer hover:underline">
          Contact Our Experts
        </span>
      </div>
    </div>
  );
};

export default Services;
