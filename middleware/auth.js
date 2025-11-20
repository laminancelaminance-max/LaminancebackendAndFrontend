import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
    
    if(!token){
      return res.status(401).json({
        message: 'No token provided',
        error: true,
        success: false
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_Access_token);

    if(!decoded){
      return res.status(401).json({
        message: 'Invalid token or unauthorised user',
        error: true,
        success: false
      });
    }

    // Get user details including role
    const user = await UserModel.findById(decoded.id).select('role status');
    
    if(!user || user.status !== 'active'){
      return res.status(401).json({
        message: 'User not found or inactive',
        error: true,
        success: false
      });
    }

    req.userId = decoded.id;
    req.userRole = user.role;
    next();

  } catch(error){
    return res.status(500).json({
      message: 'Auth middleware error',
      error: error.message,
      success: false
    });
  }
}

// Admin-specific middleware
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if(req.userRole !== 'admin'){
        return res.status(403).json({
          message: 'Access denied. Admin role required.',
          error: true,
          success: false
        });
      }
      next();
    });
  } catch(error){
    return res.status(500).json({
      message: 'Admin auth error',
      error: error.message,
      success: false
    });
  }
}

export { auth, adminAuth };