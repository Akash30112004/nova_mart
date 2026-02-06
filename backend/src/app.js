/**
 * Express Application Configuration
 * Sets up all middleware, routes, and error handling
 * Core Express app setup
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import errorHandler from './middlewares/error.middleware.js';
import logger from './utils/logger.js';

const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request logging
app.use(morgan('dev'));

// Rate limiting (prevent brute force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// ROUTES (Will be added in Phase 2+)
// ============================================

// Auth Routes (Phase 2)
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

// Product Routes (Phase 3)
import productRoutes from './routes/product.routes.js';
app.use('/api/products', productRoutes);

// Order Routes (Phase 4)
import orderRoutes from './routes/order.routes.js';
app.use('/api/orders', orderRoutes);

// Cart Routes (Phase 4)
import cartRoutes from './routes/cart.routes.js';
app.use('/api/cart', cartRoutes);

// Payment Routes (Phase 5)
import paymentRoutes from './routes/payment.routes.js';
app.use('/api/payments', paymentRoutes);

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use(errorHandler);

export default app;
