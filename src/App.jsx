import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SideScroll from './components/SideScroll';
import Center from './components/Center';
import Level from './components/Level';
import Footer from './components/Footer';
import MarqueeBanner from './components/MarqueeBanner';
import Contact from './components/Contact';
import Login from './components/Login';
import SlideSwpr from './components/SlideSwpr';
import LocomotiveScroll from 'locomotive-scroll';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import VisaInquiryForm from './components/VisaInquiryForm';
import CheckVisa from './components/CheckVisa';
import BookConsultation from './components/BookConsultation';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import ApplicationDetails from './components/ApplicationDetails';
import VisaApplicationForm from './components/VisaApplicationForm';
import AdminRegister from './components/AdminRegister';
import AdminAuth from './components/AdminAuth';
import Profile from './components/Profile';
import ApplicationHistory from './components/ApplicationHistory';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import RefundPolicy from './components/RefundPolicy';
import ShippingPolicy from './components/ShippingPolicy';

const App = () => {
  const footerRef = useRef(null);
  const location = useLocation();
  const locomotiveScrollRef = useRef(null);
  
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer && !locomotiveScrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
      });
    }

    const handleRouteChange = () => {
      if (
        locomotiveScrollRef.current &&
        typeof locomotiveScrollRef.current.update === 'function'
      ) {
        setTimeout(() => {
          locomotiveScrollRef.current.update();
        }, 100);
      }
    };

    handleRouteChange();

    return () => {
      if (
        locomotiveScrollRef.current &&
        typeof locomotiveScrollRef.current.destroy === 'function'
      ) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [location.pathname]);
  
  const scrollToFooter = () => {
    if (footerRef.current) {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.scrollTo(footerRef.current, {
          offset: 0,
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0]
        });
      } else {
        footerRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
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

      {/* Admin portal - login and register */}
      <Route path="/admin" element={<AdminAuth />} />

      {/* Admin registration - legacy route (backward compatibility) */}
      <Route path="/admin-secret-register" element={
        <>
          <MarqueeBanner />
          <AdminRegister />
        </>
      } />

      {/* Main dashboard route: role-based rendering */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Applicant dashboard */}
      <Route path="/applicant-dashboard" element={
        <ProtectedRoute allowedRoles={['applicant']}>
          <ApplicantDashboard />
        </ProtectedRoute>
      } />

      {/* Officer dashboard */}
      <Route path="/officer-dashboard" element={
        <ProtectedRoute allowedRoles={['officer']}>
          <OfficerDashboard />
        </ProtectedRoute>
      } />

      {/* Admin dashboard */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Visa application form (applicant) */}
      <Route path="/apply" element={
        <ProtectedRoute allowedRoles={['applicant']}>
          <VisaApplicationForm />
        </ProtectedRoute>
      } />

      {/* Application details (all roles) */}
      <Route path="/applications/:id" element={
        <ProtectedRoute>
          <ApplicationDetails />
        </ProtectedRoute>
      } />

      {/* Profile page (all authenticated users) */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Application History page (all authenticated users) */}
      <Route path="/application-history" element={
        <ProtectedRoute>
          <ApplicationHistory />
        </ProtectedRoute>
      } />

      {/* Existing routes */}
      <Route path="/about" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <About />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/services" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <Services />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/blog" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <Blog />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/visa-enquiry" element={<VisaInquiryForm />} />
      <Route path="/check-visa" element={<CheckVisa />} />
      <Route path="/book-consultation" element={<BookConsultation />} />
      <Route path="/contact" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <Contact />
          <Footer ref={footerRef} />
        </div>
      } />
      
      {/* Policy Pages */}
      <Route path="/privacy-policy" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <PrivacyPolicy />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/terms-conditions" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <TermsConditions />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/refund-policy" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <RefundPolicy />
          <Footer ref={footerRef} />
        </div>
      } />
      <Route path="/shipping-policy" element={
        <div data-scroll-container>
          <Navbar scrollToFooter={scrollToFooter} />
          <ShippingPolicy />
          <Footer ref={footerRef} />
        </div>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
