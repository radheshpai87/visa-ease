import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component helps track page views for single-page applications
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views whenever the route changes
    const trackPageView = () => {
      // Check if the Vercel Analytics object is available
      if (window.va) {
        window.va.track('pageview');
      }
    };

    // Track the initial page view
    trackPageView();
  }, [location]);

  return null; // This component doesn't render anything
}

// Helper function to track custom events
export function trackEvent(eventName, eventData = {}) {
  if (window.va) {
    window.va.track(eventName, eventData);
  }
}

export default Analytics;