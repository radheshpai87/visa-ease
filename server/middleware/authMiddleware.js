import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

// Protect: JWT authentication middleware
export const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    console.log('No token found in request');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not found in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    const decoded = jwt.verify(token, jwtSecret);
    console.log('Token verified for user:', decoded.userId, 'role:', decoded.role);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Authorize: Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Checking authorization for roles:', roles, 'user role:', req.user?.role);
    
    if (!req.user || !roles.includes(req.user.role)) {
      console.log('Authorization failed - user role not authorized');
      return res.status(403).json({ message: 'User role not authorized' });
    }
    
    console.log('Authorization successful for role:', req.user.role);
    next();
  };
};

// For legacy usage in /auth/verify
export const authMiddleware = protect;