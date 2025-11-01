import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import favicon from '../assets/favicon.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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


  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <>
      <div data-scroll data-scroll-speed="-.5" className="w-full px-[5vw] py-[1.7vw] flex items-center justify-between bg-zinc-50 shadow-md">
        <h2 className='flex items-center text-[#be0b32] text-2xl font-bold logo hover:text-[#8c0826] transition-colors duration-300 group relative'>
          <img src={favicon} alt="VisaEase Logo" className="h-6 w-6 mr-2" />
          VisaEase
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
        </h2>
        
        <div className="hidden sm:flex gap-[2vw] text-[18px] font-serif font-bold links">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="contact hover:text-[#be0b32] transition-colors duration-300 group relative">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
          </Link>
          {/* Single dashboard link per role */}
          {user && user.role === 'applicant' && (
            <Link to="/applicant-dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
          {user && user.role === 'officer' && (
            <Link to="/officer-dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#be0b32] transition-colors duration-300 group relative">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be0b32] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </div>
        
        <div className="hidden sm:flex gap-4 items-center call">
          <div className="p-4 py-6 bg-[#be0b32] rounded-b-full text-zinc-100 flex items-center justify-center callLogo hover:bg-[#8c0826] transition-colors duration-300 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-bold text-gray-700">Hi, {user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-[18px] font-light tracking-tight font-mono text-[#be0b32] hover:text-[#8c0826] transition-colors duration-300"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[20px] font-light tracking-tight font-mono text-[#be0b32] hover:text-[#8c0826] transition-colors duration-300">Login</Link>
            )}
            <p className="font-mono text-[18px] font-bold hover:text-[#be0b32] transition-colors duration-300">+91 9181716151</p>
          </div>
        </div>
        
        <div className="sm:hidden text-3xl cursor-pointer hover:text-[#be0b32] transition-colors duration-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiX />}
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sideMenu sm:hidden bg-[#be0b32] h-screen w-full py-[17vw] text-[10vw] px-5 text-white font-mono shadow-inner">
          <h4 onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/about'); }}>About Us</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/services'); }}>Services</h4>
          <h4 onClick={() => { setMenuOpen(false); navigate('/contact'); }}>Contact Us</h4>
          {/* Single dashboard link per role */}
          {user && user.role === 'applicant' && (
            <h4 onClick={() => { setMenuOpen(false); navigate('/applicant-dashboard'); }}>Dashboard</h4>
          )}
          {user && user.role === 'officer' && (
            <h4 onClick={() => { setMenuOpen(false); navigate('/officer-dashboard'); }}>Dashboard</h4>
          )}
          {user && user.role === 'admin' && (
            <h4 onClick={() => { setMenuOpen(false); navigate('/admin-dashboard'); }}>Dashboard</h4>
          )}
          {user ? (
            <h4 onClick={handleLogout} className="flex items-center gap-2 link">
              <FiLogOut className="text-[8vw]" /> Logout
            </h4>
          ) : (
            <Link to="/login" className='link' onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
