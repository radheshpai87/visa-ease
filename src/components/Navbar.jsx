import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = ({ scrollToFooter }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".logo", {
      y: -50,
      opacity: 1,
      duration: 1
    }, "hey")
    .from(".callLogo", {
      y: 50,
      opacity: 1,
      duration: 1
    }, "hey");
    
    gsap.from(".links a,.contact", {
      y: -80,
      opacity: 1,
      duration: 1,
      stagger: 0.3
    }, "=0.1");
    
    gsap.from(".call", {
      x: 220,
      opacity: 1,
      duration: 1
    }, "=-0.3");
  });

  useEffect(() => {
    if (menuOpen) {
      gsap.from(".sideMenu h4,.link", {
        x: -100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, [menuOpen]);

  // Improved contact click handler
  const handleContactClick = () => {
    setMenuOpen(false);
    
    if (location.pathname === '/') {
      // If we're already on the home page, just scroll
      scrollToFooter();
    } else {
      // Navigate to home and then scroll
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToFooter();
      }, 300); // Longer timeout to ensure navigation completes
    }
  };

  return (
    <>
      <div data-scroll data-scroll-speed="-.5" className="w-full px-[5vw] py-[1.7vw] flex items-center justify-between bg-zinc-50 shadow-md">
        <h2 className='text-[#be0b32] text-2xl font-bold logo'>VisaEase</h2>
        
        <div className="hidden sm:flex gap-[2vw] text-[18px] font-serif font-bold links">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <button 
            onClick={scrollToFooter}
            className="contact"
          >
            Contact Us
          </button>
        </div>
        
        <div className="hidden sm:flex gap-4 items-center call">
          <div className="p-4 py-6 bg-[#be0b32] rounded-b-full text-zinc-100 flex items-center justify-center callLogo">
            {/* Phone icon - can be replaced with an actual SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <Link to="/login" className="text-[20px] font-light tracking-tight font-mono text-[#be0b32]">Login</Link>
            <p className="font-mono text-[18px] font-bold">+91 9181716151</p>
          </div>
        </div>
        
        <div className="sm:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sideMenu sm:hidden bg-[#be0b32] h-screen w-full py-[17vw] text-[10vw] px-5 text-white font-mono shadow-inner">
          <h4 onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/about'); }}>About Us</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/services'); }}>Services</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/blog'); }}>Blog</h4>
          <h4 onClick={handleContactClick}>Contact Us</h4>
          <Link to="/login" className='link' onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;