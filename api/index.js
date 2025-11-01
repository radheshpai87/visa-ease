import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import authRoutes from '../server/routes/auth.js';
import applicationRoutes from '../server/routes/applicationRoutes.js';
import documentRoutes from '../server/routes/documentRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';
import reviewRoutes from '../server/routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://visa-ease-sandy.vercel.app', /\.vercel\.app$/]
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection for Serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    // Parse and add database name if not present
    let connectionString = mongoURI;
    if (!connectionString.includes('mongodb.net/') || connectionString.match(/mongodb\.net\/\?/)) {
      connectionString = connectionString.replace(
        /mongodb\.net\/(\?)?/,
        'mongodb.net/visa_management?'
      );
    }

    // Add connection options for serverless
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    await mongoose.connect(connectionString, options);

    isConnected = true;
    console.log('MongoDB Connected for Serverless Function');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

// Health check routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Visa Management API is running',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok',
    mongodb: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Visa Types route (simple implementation)
app.get('/api/visa-types', async (req, res) => {
  try {
    const VisaType = (await import('../server/models/VisaType.js')).default;
    const visaTypes = await VisaType.find();
    res.json(visaTypes);
  } catch (error) {
    console.error('Error fetching visa types:', error);
    res.status(500).json({ message: 'Error fetching visa types', error: error.message });
  }
});

// Officer routes
app.get('/api/officer/applications', async (req, res) => {
  try {
    const { protect, authorize } = await import('../server/middleware/authMiddleware.js');
    const { getAssignedApplications } = await import('../server/controllers/officerController.js');
    
    // Apply middleware and controller
    await protect(req, res, async () => {
      await authorize('officer')(req, res, async () => {
        await getAssignedApplications(req, res);
      });
    });
  } catch (error) {
    console.error('Error in officer applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/officer/statistics', async (req, res) => {
  try {
    const { protect, authorize } = await import('../server/middleware/authMiddleware.js');
    const { getOfficerStats } = await import('../server/controllers/officerController.js');
    
    await protect(req, res, async () => {
      await authorize('officer')(req, res, async () => {
        await getOfficerStats(req, res);
      });
    });
  } catch (error) {
    console.error('Error in officer statistics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Applicant routes
app.get('/api/applicant/statistics', async (req, res) => {
  try {
    const { protect, authorize } = await import('../server/middleware/authMiddleware.js');
    const { getApplicantStats } = await import('../server/controllers/applicantController.js');
    
    await protect(req, res, async () => {
      await authorize('applicant')(req, res, async () => {
        await getApplicantStats(req, res);
      });
    });
  } catch (error) {
    console.error('Error in applicant statistics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/applicant/applications', async (req, res) => {
  try {
    const { protect, authorize } = await import('../server/middleware/authMiddleware.js');
    const { getMyApplications } = await import('../server/controllers/applicantController.js');
    
    await protect(req, res, async () => {
      await authorize('applicant')(req, res, async () => {
        await getMyApplications(req, res);
      });
    });
  } catch (error) {
    console.error('Error in applicant applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Serverless function handler
export default async function handler(req, res) {
  try {
    // Connect to MongoDB before handling request
    await connectDB();
    
    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      message: 'Serverless function error',
      error: error.message 
    });
  }
}
