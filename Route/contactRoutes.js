  // import express from 'express';
  // import {
  //   submitContact,
  //   getAllContacts,
  //   getContactById,
  //   updateContactStatus,
  //   deleteContact,
  //   getContactStats
  // } from '../controller/contactController.js';

  // const router = express.Router();

  // // Public routes
  // router.post('/submit', submitContact);

  // // Admin routes (protected - add authentication middleware as needed)
  // router.get('/admin/all', getAllContacts);
  // router.get('/admin/stats', getContactStats);
  // router.get('/admin/:id', getContactById);
  // router.put('/admin/:id/status', updateContactStatus);
  // router.delete('/admin/:id', deleteContact);

  // export default router;



  import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
  sendAppointment,
  testEmail,
  resendConfirmationEmail,
  testIP  // Add this new route
} from '../controller/contactController.js';

const router = express.Router();

// Rate limiting middleware for US IPs
const rateLimitMiddleware = (req, res, next) => {
  // Skip rate limiting for admin routes
  if (req.path.includes('/admin/')) {
    return next();
  }
  
  // Simple rate limiting based on IP
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // Store in memory (in production, use Redis or similar)
  if (!global.rateLimit) {
    global.rateLimit = {};
  }
  
  if (!global.rateLimit[ip]) {
    global.rateLimit[ip] = {
      count: 1,
      firstRequest: now,
      lastRequest: now
    };
  } else {
    const timeDiff = now - global.rateLimit[ip].firstRequest;
    
    // Reset if more than 1 hour has passed
    if (timeDiff > 60 * 60 * 1000) {
      global.rateLimit[ip] = {
        count: 1,
        firstRequest: now,
        lastRequest: now
      };
    } else {
      // Allow 5 requests per hour
      if (global.rateLimit[ip].count >= 5) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.'
        });
      }
      global.rateLimit[ip].count++;
      global.rateLimit[ip].lastRequest = now;
    }
  }
  
  next();
};

// Public routes
router.post('/submit', rateLimitMiddleware, submitContact);
router.get('/test-ip', testIP); // Add IP test route

// Admin routes (protected - add authentication middleware as needed)
router.get('/admin/all', getAllContacts);
router.get('/admin/stats', getContactStats);
router.get('/admin/:id', getContactById);
router.put('/admin/:id/status', updateContactStatus);
router.delete('/admin/:id', deleteContact);

// Email routes
router.post('/appointment', sendAppointment);
router.post('/test-email', testEmail);
router.post('/resend-confirmation/:id', resendConfirmationEmail);

export default router;