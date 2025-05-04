import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SideScroll from './components/SideScroll';
import Center from './components/Center';
import Level from './components/Level';
import Footer from './components/Footer';
import MarqueeBanner from './components/MarqueeBanner';

import Login from './components/Login';

import SlideSwpr from './components/SlideSwpr';
import LocomotiveScroll from 'locomotive-scroll';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import VisaInquiryForm from './components/VisaInquiryForm';
import CheckVisa from './components/CheckVisa';

const App = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const locomotiveScrollRef = useRef(null);
  
  // Initialize locomotive scroll
  useEffect(() => {
    if (!locomotiveScrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
    }
    
    // Reset and update scroll on route change
    const handleRouteChange = () => {
      if (locomotiveScrollRef.current) {
        setTimeout(() => {
          locomotiveScrollRef.current.update();
        }, 100);
      }
    };
    
    handleRouteChange();
    
    return () => {
      // Only destroy on component unmount, not on route changes
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [location.pathname]);
  
  // Scroll to footer function with improved handling
  const scrollToFooter = () => {
    // Method 1: Using the ref if available
    if (footerRef.current) {
      // For locomotive scroll
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.scrollTo(footerRef.current, {
          offset: 0,
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0]
        });
      } else {
        // Fallback to native scrolling
        footerRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Method 2: If ref isn't available, scroll to bottom of page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <Home />
          <SideScroll />
          <Level />
          <Center />
          <SlideSwpr />
          <Footer ref={footerRef} />
        </div>
      } />
      
      <Route path="/login" element={
        <>
          <MarqueeBanner />
          <Login />
        </>
      } />
      
      <Route path="/about" element={
        <div>
          <About />
          <Footer ref={footerRef} />
        </div>
      } />
      
      <Route path="/services" element={
        <div>
          <Services />
        </div>
      } />
      
      <Route path="/blog" element={
        <div>
          <Blog />
          <Footer ref={footerRef} />
        </div>
      } />
      
      <Route path="/visa-enquiry" element={
        <div>
          <VisaInquiryForm />
        </div>
      } />
      <Route path="/check-visa" element={
        <div >
          <CheckVisa />
        </div>
      } />
    </Routes>
  );
};

export default App;