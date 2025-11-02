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
import officerRoutes from '../server/routes/officerRoutes.js';
import applicantRoutes from '../server/routes/applicantRoutes.js';
import paymentRoutes from '../server/routes/paymentRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://visaeasehub.vercel.app', /\.vercel\.app$/]
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
  res.json({ message: 'API is running', timestamp: new Date().toISOString() });
});

app.get('/api/health', async (req, res) => {
  try {
    const User = (await import('../server/models/User.js')).default;
    const userCount = await User.countDocuments();
    
    res.json({ 
      status: 'healthy', 
      database: isConnected ? 'connected' : 'disconnected',
      users: userCount,
      hasJWTSecret: !!process.env.JWT_SECRET,
      hasMongoURI: !!process.env.MONGODB_URI,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.json({ 
      status: 'healthy', 
      database: isConnected ? 'connected' : 'disconnected',
      error: error.message,
      hasJWTSecret: !!process.env.JWT_SECRET,
      hasMongoURI: !!process.env.MONGODB_URI,
      timestamp: new Date().toISOString() 
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/officer', officerRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/payment', paymentRoutes);

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

// Error handling middleware - MUST have 4 parameters for Express to recognize it
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Handle 404
app.use((req, res, next) => {
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
