import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './Route/user.route.js';
import orderRoutes from './Route/orderRoutes.js';
import appointmentRoutes from './Route/appointments.js';
import contactRoutes from './Route/contactRoutes.js';

// ============ CRITICAL FIX ============
// Load environment variables FIRST with debugging
dotenv.config({ debug: true });

// Debug: Check if API key is loaded
console.log('='.repeat(60));
console.log('🚀 SERVER STARTUP - ENVIRONMENT CHECK');
console.log('='.repeat(60));
console.log('RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
console.log('ADMIN_EMAIL loaded:', !!process.env.ADMIN_EMAIL);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

if (process.env.RESEND_API_KEY) {
    console.log('✅ API Key Details:');
    console.log('   Length:', process.env.RESEND_API_KEY.length);
    console.log('   First 10 chars:', process.env.RESEND_API_KEY.substring(0, 10));
    console.log('   Starts with "re_":', process.env.RESEND_API_KEY.startsWith('re_'));
} else {
    console.error('❌ CRITICAL ERROR: RESEND_API_KEY not found in environment!');
    console.log('Available environment variables:');
    Object.keys(process.env).forEach(key => {
        if (key.includes('RESEND') || key.includes('EMAIL') || key.includes('API')) {
            console.log(`   ${key}: ${process.env[key]}`);
        }
    });
}
console.log('='.repeat(60));
// ============ END CRITICAL FIX ============

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Appointment Scheduler API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Cabinet Order Management API',
        version: '1.0.0',
        server: `Server is running on port ${process.env.PORT || 5000}`,
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/orders', orderRoutes); // Cabinet orders routes
app.use('/api/appointments', appointmentRoutes); // Appointment routes
app.use('/api/contact', contactRoutes); // Contact routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found: ' + req.originalUrl
  });
});

// Connect DB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📧 Contact routes: /api/contact`);
      console.log(`👤 Admin panel: /api/contact/admin/*`);
      console.log(`🔑 API Key Status: ${process.env.RESEND_API_KEY ? '✅ LOADED' : '❌ MISSING'}`);
      console.log('='.repeat(50));
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });

export default app;