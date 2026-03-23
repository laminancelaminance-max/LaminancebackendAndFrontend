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
  sendAppointment,
  testEmail,
  testIP
} from '../controller/contactController.js';

const router = express.Router();

// Simple Rate Limiter
const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!global.rateLimit) {
    global.rateLimit = {};
  }

  if (!global.rateLimit[ip]) {
    global.rateLimit[ip] = {
      count: 1,
      firstRequest: now
    };
  } else {
    const diff = now - global.rateLimit[ip].firstRequest;

    if (diff > 60 * 60 * 1000) {
      global.rateLimit[ip] = {
        count: 1,
        firstRequest: now
      };
    } else {
      if (global.rateLimit[ip].count >= 5) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Try again later."
        });
      }
      global.rateLimit[ip].count++;
    }
  }

  next();
};

// Contact form
router.post('/submit', rateLimitMiddleware, submitContact);

// Appointment booking
router.post('/appointment', sendAppointment);

// Test email
router.post('/test-email', testEmail);

// Debug route
router.get('/test-ip', testIP);

export default router;