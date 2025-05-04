import React, { forwardRef } from 'react';

// SVG Icon Components
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" className="w-4 h-4">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 0-3.746 2.504 18.63 18.63 0 0 0-2.37-.306V2.43ZM12 2.43v6.186c-.824 0-1.626.043-2.368.306a11.268 11.268 0 0 0-3.746-2.504 9.755 9.755 0 0 1 6.114-3.986ZM2.428 10.538a11.196 11.196 0 0 0 3.746-2.504 18.642 18.642 0 0 0-2.361 5.618 9.796 9.796 0 0 1-1.385-3.114ZM4.425 3.65a9.735 9.735 0 0 1 4.365-.868c-.601.97-1.151 2.148-1.621 3.47a11.737 11.737 0 0 1-2.744-2.602ZM19.575 3.65a11.737 11.737 0 0 1-2.744 2.602c-.47-1.322-1.02-2.5-1.621-3.47a9.735 9.735 0 0 1 4.365.868ZM21.573 10.538a9.796 9.796 0 0 1-1.385 3.114 18.642 18.642 0 0 0-2.362-5.618 11.196 11.196 0 0 0 3.747 2.504Z" />
  </svg>
);

const ArrowForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
  </svg>
);

const Footer = ((props, ref) => {
  return (
    <footer 
    ref={ref} 
    id="contact-section"
    className="w-full bg-blue-900 text-white py-12 px-8 relative overflow-hidden"
    data-scroll-section
  >  
      {/* Multiple Airplane Path Designs for enhanced visual effect */}
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <path d="M10,90 Q40,40 90,10" stroke="white" fill="transparent" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 rotate-180">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <path d="M10,90 Q40,40 90,10" stroke="white" fill="transparent" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Contact Info Bar */}
      <div className="container mx-auto mb-8 border-b border-blue-800 pb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">  
            <PhoneIcon />
            <span>+1 (888) 456-7890</span>
          </div>
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <EmailIcon />
            <span>info@VisaEase.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <LocationIcon />
            <span>123 Global Avenue, Suite 200, New York, NY 10001</span>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Logo & Company Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-2 rounded-md">
                <PlaneIcon />
              </div>
              <span className="text-2xl font-bold">VisaEase</span>
            </div>
            <p className="text-lg">Your Global Journey Starts Here</p>
            <p className="text-lg">Trusted Visa Experts</p>
            <p className="text-sm mt-4">We've helped thousands of students and professionals achieve their international dreams since 2010. Our certified consultants provide personalized guidance for your unique situation.</p>
            
            <div className="flex space-x-4 mt-6">
              <div className="bg-blue-800 hover:bg-red-600 transition-colors p-3 rounded-full cursor-pointer">
                <GlobeIcon />
              </div>
              <div className="bg-blue-800 hover:bg-red-600 transition-colors p-3 rounded-full cursor-pointer">
                <FacebookIcon />
              </div>
              <div className="bg-blue-800 hover:bg-red-600 transition-colors p-3 rounded-full cursor-pointer">
                <InstagramIcon />
              </div>
            </div>
          </div>
          
          {/* Immigration Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Immigration</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Take IELTS</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">PTE Coaching</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Sat Coaching</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Student Visa</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Work Visa</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Business Visa</a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">About Us</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Our Team</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Our Coaching</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Our Countries</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">Testimonials</a>
              </li>
              <li className="flex items-center space-x-2 group">
                <span className="text-red-600 group-hover:translate-x-1 transition-transform"><PlaneIcon /></span>
                <a href="#" className="hover:text-gray-300">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Subscribe Section */}
          <div>
            <h3 className="text-xl font-bold mb-6">Subscribe Our Newsletter</h3>
            <p className="mb-4">Enter your email address to get latest updates and offers from us.</p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="p-3 w-full bg-white text-gray-800 rounded-l focus:outline-none"
              />
              <button className="bg-white text-red-600 p-3 rounded-r hover:bg-red-600 hover:text-white transition-colors">
                <ArrowForwardIcon />
              </button>
            </div>
            
            {/* Popular Destinations */}
            <h4 className="font-bold mt-8 mb-4">Popular Destinations</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer">USA</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer">Canada</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer">UK</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer">Australia</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer">Germany</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>Copyright © 2025 All Rights Reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-red-600">Home</a>
          <a href="#" className="hover:text-red-600">About Us</a>
          <a href="#" className="hover:text-red-600">Contact Us</a>
          <a href="#" className="hover:text-red-600">Privacy Policy</a>
          <a href="#" className="hover:text-red-600">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;