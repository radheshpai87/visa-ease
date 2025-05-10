import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes - Change the base path to /api/auth for Vercel deployment
app.use('/api/auth', authRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Validate MongoDB URI
    if (!mongoURI) {
      console.error('MongoDB URI is not defined in environment variables');
      process.exit(1);
    }

    // Check if password placeholder needs to be replaced
    if (mongoURI.includes('<db_password>')) {
      console.error('Please replace <db_password> in your MongoDB URI with your actual password');
      process.exit(1);
    }

    // Connect with improved options
    await mongoose.connect(mongoURI, {
      // These options are no longer needed in newer Mongoose versions but kept for compatibility
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return error;
  }
};

// Basic route for testing
app.get('/api', (req, res) => {
  res.send('VisaEase Authentication API is running');
});

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  // In development, start the server normally
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
}

// For production on Vercel, export the app with DB connection handling
connectDB();
export default app;
