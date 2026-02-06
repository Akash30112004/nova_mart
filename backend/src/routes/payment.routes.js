/**
 * Payment Routes (Razorpay)
 */

import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import validate, {
  validateRazorpayOrderCreate,
  validateRazorpayVerify,
} from '../middlewares/validate.middleware.js';
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../controllers/payment.controller.js';

const router = express.Router();

router.post(
  '/razorpay/order',
  authMiddleware,
  validateRazorpayOrderCreate,
  validate,
  createRazorpayOrder
);

router.post(
  '/razorpay/verify',
  authMiddleware,
  validateRazorpayVerify,
  validate,
  verifyRazorpayPayment
);

export default router;
