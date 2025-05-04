import React, { useState, useRef} from 'react';
import { FaPlane } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const SlideSwpr = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const totalSlides = 9; // Total number of testimonials
  const slidesPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4
  };
  
  // Calculate the number of pagination dots needed
  const maxSlidesPerView = Math.max(...Object.values(slidesPerView));
  const totalDots = Math.ceil(totalSlides / maxSlidesPerView);
  
  // Testimonial data
  const testimonials = [
    { id: 1, name: 'Ronald Richards', position: 'Finance Manager', image: 'https://i.pinimg.com/736x/a8/73/f3/a873f3f357e4fe348fb8100ce31d62be.jpg', text: "We've seen measurable improvements in productivity and couldn't be happier with the results" },
    { id: 2, name: 'Oliver Spaltn', position: 'CEO At D.B.A Pvt. Ltd', image: 'https://i.pinimg.com/736x/9c/d7/56/9cd75635b887066bc67eb4d205bdc678.jpg', text: "Their team's expertise and commitment to quality helped us improve efficiency across the board" },
    { id: 3, name: 'Sarah Johnson', position: 'HR Director', image: 'https://i.pinimg.com/736x/82/19/e9/8219e955fd50a0eb26959d17f4b173c7.jpg', text: "The immigration process was seamless thanks to their expert guidance and support" },
    { id: 4, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pinimg.com/736x/d7/92/7a/d7927a18b015c8c0a4ee40d7344f1010.jpg', text: "Their attention to detail saved us countless hours and potential complications" },
    { id: 5, name: 'Priya Sharma', position: 'Marketing Lead', image: 'https://i.pinimg.com/736x/d8/79/70/d87970e4884626ce5c55bf6db1a34a5e.jpg', text: "From visa applications to work permits, they handled everything professionally" },
    { id: 6, name: 'David Wilson', position: 'IT Consultant', image: 'https://i.pinimg.com/736x/f5/b5/0d/f5b50deff13e3efee1d5ac379988455f.jpg', text: "Working with their team was the best decision we made for our international expansion" },
    { id: 7, name: 'Emma Rodriguez', position: 'Project Manager', image: 'https://i.pinimg.com/736x/f5/b5/0d/f5b50deff13e3efee1d5ac379988455f.jpg', text: "They simplified complex immigration procedures and made our transition smooth" },
    { id: 8, name: 'James Taylor', position: 'Research Lead', image: 'https://i.pinimg.com/736x/b4/3a/89/b43a892e3f68c50a5b7ce996aa41a1af.jpg', text: "Their consultants provided valuable insights that expedited our visa approval process" },
    { id: 9, name: 'Lisa Wang', position: 'Financial Analyst', image: 'https://i.pinimg.com/736x/ac/7e/03/ac7e03044fb7469b99a3190165ffb1c2.jpg', text: "Quick responses and expert knowledge made all the difference in our case" }
  ];

  // Handle dot click to change slide
  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // Calculate the slide index based on dot index and slidesPerView
      const currentSlidesPerView = getCurrentSlidesPerView();
      const slideIndex = index * currentSlidesPerView;
      swiperRef.current.swiper.slideTo(slideIndex);
    }
  };
  
  // Get current slidesPerView based on screen width
  const getCurrentSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1280) return slidesPerView.large;
      if (width >= 1024) return slidesPerView.desktop;
      if (width >= 640) return slidesPerView.tablet;
      return slidesPerView.mobile;
    }
    return slidesPerView.desktop; // Default
  };
  
  // Calculate the active dot index based on slide index
  const getActiveDotIndex = (slideIndex) => {
    const currentSlidesPerView = getCurrentSlidesPerView();
    return Math.floor(slideIndex / currentSlidesPerView) % totalDots;
  };

  return (
    <div data-scroll data-scroll-speed="-.2" className="w-full bg-[#f6f8fc] min-h-screen md:py-25 md:px-20 py-12 px-5 overflow-hidden">
      {/* Header section */}
      <div className="mb-20">
        <div className="flex gap-4 items-center mb-8">
          {/* Icon with smooth hover scale effect */}
          <FaPlane className="text-red-700 text-4xl transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-800" />
          <p className="text-red-700 uppercase tracking-wider text-xl font-semibold">
            Clients Testimonials
          </p>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-navy-900 leading-snug ">
          What customers are saying about VisaEase
        </h2>
        <div className="mt-6 max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg sm:text-xl font-medium tracking-wide">
            We provide skilled staff to help you get the most out of your immigration. Our qualified and dependable Immigration Consultants can assist you in navigating the process seamlessly.
          </p>
        </div>

      {/* Optional: Add a subtle background section */}
        <div className="mt-10 p-8 bg-gray-50 rounded-xl shadow-lg mx-6 md:mx-0">
          <p className="text-center text-gray-600 text-lg italic">
            "Our clients' satisfaction is our top priority. Here's what they have to say about working with us."
          </p>
        </div>
      </div>



          {/* Testimonials Slider */}
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination]}
            slidesPerView={slidesPerView.mobile}
            spaceBetween={20}
            onSlideChange={(swiper) => setActiveIndex(getActiveDotIndex(swiper.realIndex))}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: slidesPerView.tablet,
              },
              1024: {
                slidesPerView: slidesPerView.desktop,
              },
              1280: {
                slidesPerView: slidesPerView.large,
              }
            }}
            loop={true}
            className="mySwiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-gray-50 p-8 rounded-lg h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{item.name}</h3>
                      <p className="text-gray-500">{item.position}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-red-700 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-700">{item.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalDots }).map((_, dotIndex) => (
              <div 
                key={dotIndex} 
                onClick={() => handleDotClick(dotIndex)}
                className={`cursor-pointer transition-all duration-300 rounded-full ${
                  activeIndex === dotIndex ? 'bg-red-700 w-8 h-2' : 'bg-gray-300 w-2 h-2'
                }`}
              />
            ))}
          </div>
    </div>
  );
};

export default SlideSwpr;