import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Import HashRouter
import { Analytics } from '@vercel/analytics/react'; // Import Vercel Analytics
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter> {/* Wrap App with HashRouter for routing */}
      <App />
      <Analytics /> {/* Add the Vercel Analytics component */}
    </HashRouter>
  </StrictMode>
);
