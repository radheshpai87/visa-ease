import React from 'react';
import { FaMapMarkerAlt, FaSuitcase, FaStamp, FaBus } from "react-icons/fa";

const Level = () => {
    const visaCards = [
        {
          icon: <FaMapMarkerAlt className="text-white text-2xl z-10 group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Student Visa",
          description: "A visa is a conditional permission provided by a region to a foreigner to entry.",
        },
        {
          icon: <FaSuitcase className="text-white text-2xl z-10 group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Tourists Visa",
          description: "A visa is a conditional permission provided by a region to a foreigner to entry.",
        },
        {
          icon: <FaStamp className="text-white text-2xl z-10 group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Business Visa",
          description: "A visa is a conditional permission provided by a region to a foreigner to entry.",
        },
        {
          icon: <FaBus className="text-white text-2xl z-10 group-hover:text-[#be0b32] transition-colors duration-300" />,
          title: "Working Visa",
          description: "A visa is a conditional permission provided by a region to a foreigner to entry.",
        }
      ];


  return (
    <div className="bg-[#f6f8fc] w-full px-6 py-16">
      {/* Section Header */}
      {/* Section Header */}
        <div className="text-center mb-16 px-4">
        <p className="text-[#be0b32] font-bold uppercase tracking-widest text-sm mb-2">
            How We Help Clients
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#051440] leading-tight">
            Level with Great Visa <br />
            <span className="bg-gradient-to-r from-[#be0b32] to-[#8a0e24] text-transparent bg-clip-text">
            Serving Policies
            </span>
        </h2>
        <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            Our skilled team is here to help you navigate immigration smoothly. We offer reliable and
            experienced immigration consultants who are committed to your success.
        </p>
        </div>


      {/* Visa Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto">
        {visaCards.map((card, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl p-8 bg-white text-gray-800 shadow-md transition-all duration-300"
          >
            {/* Red Overlay */}
            <div className="absolute inset-0 bg-[#be0b32] translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-[#be0b32] group-hover:bg-white transition-all duration-300">
                {/* Modify icon color on hover */}
                <div className="group-hover:text-red-500">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#051440] group-hover:text-white transition-all duration-300">{card.title}</h3>
              <p className="text-sm mb-4 group-hover:text-white transition-all duration-300">{card.description}</p>
              <button className="font-semibold text-[#be0b32] group-hover:text-white transition-all duration-300">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Callout */}
      <div className="text-center mt-12 text-gray-700 text-[16px]">
        Need visa & immigration consultation?{" "}
        <span className="text-[#be0b32] font-bold cursor-pointer">Contact Now</span>
      </div>
    </div>
  );
};

export default Level;
