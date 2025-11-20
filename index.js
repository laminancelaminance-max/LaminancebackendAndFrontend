import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './Route/user.route.js';
import orderRoutes from './Route/orderRoutes.js';
import appointmentRoutes from './Route/appointments.js'; // ADD THIS LINE

dotenv.config();

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
app.use('/api/appointments', appointmentRoutes); // ADD THIS LINE - Appointment routes

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
      console.log('📅 Appointment routes: /api/appointments');
      console.log('='.repeat(50));
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });

export default app;