/**
 * Authentication Routes
 * Defines signup, login, and logout endpoints
 * Includes validation and authentication middleware
 */

import express from 'express';
import {
  signup,
  login,
  getCurrentUser,
  logout,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validate, {
  validateSignup,
  validateLogin,
} from '../middlewares/validate.middleware.js';

const router = express.Router();

/**
 * POST /api/auth/signup
 * Register a new user
 * Body: { name, email, password }
 */
router.post('/signup', validateSignup, validate, signup);

/**
 * POST /api/auth/login
 * Login user and get JWT token
 * Body: { email, password }
 */
router.post('/login', validateLogin, validate, login);

/**
 * GET /api/auth/me
 * Get current user profile (protected)
 * Headers: { Authorization: "Bearer <token>" }
 */
router.get('/me', authMiddleware, getCurrentUser);

/**
 * POST /api/auth/logout
 * Logout user (protected)
 * Headers: { Authorization: "Bearer <token>" }
 */
router.post('/logout', authMiddleware, logout);

export default router;
