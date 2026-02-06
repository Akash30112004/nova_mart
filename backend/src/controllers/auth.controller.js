/**
 * Authentication Controller
 * Handles user registration (signup), login, and logout
 * Generates JWT tokens for authenticated users
 */

import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, adminSecretKey } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Email already registered',
    });
  }

  // Check if admin secret key is provided and valid
  let isAdmin = false;
  if (adminSecretKey) {
    const providedSecret = String(adminSecretKey).trim();
    const envSecretRaw = process.env.ADMIN_SECRET_KEY || '';
    const envSecret = String(envSecretRaw).replace(/^"(.*)"$/, '$1').trim();

    if (providedSecret === envSecret) {
      isAdmin = true;
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin secret key',
      });
    }
  }

  // Create new user
  const user = new User({
    name,
    email,
    password,
    isAdmin,
  });

  // Save user to database
  await user.save();

  // Generate JWT token
  const token = generateToken(user._id);

  // Log signup
  logger.info(`New user registered: ${email}`);

  // Send response
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get JWT token
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Check password
  const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    logger.warn(`Failed login attempt for: ${email}`);
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Generate JWT token
  const token = generateToken(user._id);

  // Log login
  logger.info(`User logged in: ${email}`);

  // Send response
  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (frontend handles token removal)
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  logger.info(`User logged out: ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});


