import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Check if .env file exists, if not, provide clear instructions
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const envPath = path.join(__dirname, '..', '.env');

    if (!fs.existsSync(envPath)) {
      console.error('\x1b[33m%s\x1b[0m', '⚠️ No .env file found!');
      console.error('\x1b[36m%s\x1b[0m', '1. Rename .env.example to .env');
      console.error('\x1b[36m%s\x1b[0m', '2. Add your MongoDB connection string and JWT secret');
      console.error('\x1b[36m%s\x1b[0m', 'Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
      process.exit(1);
    }

    // Validate MongoDB URI
    if (!mongoURI) {
      console.error('\x1b[31m%s\x1b[0m', '❌ MongoDB URI is not defined in environment variables!');
      console.error('\x1b[36m%s\x1b[0m', 'Please check your .env file and add your MongoDB connection string');
      process.exit(1);
    }

    // Check if MongoDB URI is still a placeholder
    if (mongoURI.includes('<username>') || mongoURI.includes('<password>')) {
      console.error('\x1b[31m%s\x1b[0m', '❌ Please replace placeholders in your MongoDB URI!');
      console.error('\x1b[36m%s\x1b[0m', 'Update your .env file with your actual MongoDB credentials');
      process.exit(1);
    }

    // Connect with improved options
    await mongoose.connect(mongoURI, {
      // These options are no longer needed in newer Mongoose versions but kept for compatibility
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log('\x1b[32m%s\x1b[0m', '✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ MongoDB connection error:', error);
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
      console.log('\x1b[32m%s\x1b[0m', `✅ Server running on port ${PORT}`);
      console.log('\x1b[36m%s\x1b[0m', `📝 API available at: http://localhost:${PORT}/api`);
    });
  }).catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to connect to MongoDB:', err);
  });
}

// For production on Vercel, export the app with DB connection handling
connectDB();
export default app;
