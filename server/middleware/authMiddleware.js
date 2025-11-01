import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

// Protect: JWT authentication middleware
export const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    // Use globalThis.process for ESM compatibility
  const decoded = jwt.verify(token, globalThis.process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Authorize: Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};

// For legacy usage in /auth/verify
export const authMiddleware = protect;