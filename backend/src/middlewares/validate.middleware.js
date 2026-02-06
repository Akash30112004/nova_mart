/**
 * Input Validation Middleware
 * Uses express-validator to validate request data
 * Creates reusable validation chains
 */

import { body, validationResult } from 'express-validator';

// Validation middleware that checks for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

// Signup validation rules
export const validateSignup = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('adminSecretKey')
    .optional()
    .isString()
    .withMessage('Admin secret key must be a string'),
];

// Login validation rules
export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Product create validation rules
export const validateProductCreate = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Product name must be between 2 and 120 characters'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 60 })
    .withMessage('Category must be between 2 and 60 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

// Product update validation rules
export const validateProductUpdate = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 120 })
    .withMessage('Product name must be between 2 and 120 characters'),

  body('category')
    .optional()
    .isLength({ min: 2, max: 60 })
    .withMessage('Category must be between 2 and 60 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),

  body('reviews')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Reviews must be a non-negative integer'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

// Cart validation rules
export const validateCartAdd = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Product ID must be a valid Mongo ID'),

  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
];

export const validateCartUpdate = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 0 })
    .withMessage('Quantity must be 0 or greater'),
];

// Order validation rules
export const validateOrderCreate = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order items are required'),

  body('items.*.product')
    .notEmpty()
    .withMessage('Product ID is required for each item')
    .isMongoId()
    .withMessage('Product ID must be a valid Mongo ID'),

  body('items.*.quantity')
    .notEmpty()
    .withMessage('Quantity is required for each item')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('shippingAddress.fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters'),

  body('shippingAddress.phone')
    .notEmpty()
    .withMessage('Phone is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('Phone must be between 6 and 20 characters'),

  body('shippingAddress.address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Address must be between 5 and 200 characters'),

  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('City must be between 2 and 80 characters'),

  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('State must be between 2 and 80 characters'),

  body('shippingAddress.postalCode')
    .notEmpty()
    .withMessage('Postal code is required')
    .isLength({ min: 3, max: 12 })
    .withMessage('Postal code must be between 3 and 12 characters'),

  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('Country must be between 2 and 80 characters'),

  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isLength({ min: 2, max: 40 })
    .withMessage('Payment method must be between 2 and 40 characters'),
];

// Razorpay payment validation rules
export const validateRazorpayOrderCreate = [
  body('orderId')
    .notEmpty()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Order ID must be a valid Mongo ID'),
];

export const validateRazorpayVerify = [
  body('orderId')
    .notEmpty()
    .withMessage('Order ID is required')
    .isMongoId()
    .withMessage('Order ID must be a valid Mongo ID'),
  body('razorpay_order_id')
    .notEmpty()
    .withMessage('Razorpay order ID is required'),
  body('razorpay_payment_id')
    .notEmpty()
    .withMessage('Razorpay payment ID is required'),
  body('razorpay_signature')
    .notEmpty()
    .withMessage('Razorpay signature is required'),
];

export default validate;

