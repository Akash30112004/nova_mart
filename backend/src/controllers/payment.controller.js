/**
 * Payment Controller (Razorpay)
 * Handles order creation and payment verification
 */

import crypto from 'crypto';
import Razorpay from 'razorpay';
import Order from '../models/Order.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

// @desc   Create Razorpay order
// @route  POST /api/payments/razorpay/order
// @access Private
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  const isOwner = order.user.toString() === req.user._id.toString();
  if (!isOwner && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to pay for this order',
    });
  }

  if (order.isPaid) {
    return res.status(400).json({
      success: false,
      message: 'Order is already paid',
    });
  }

  const razorpay = getRazorpayClient();
  const currency = process.env.RAZORPAY_CURRENCY || 'INR';
  const amount = Math.round(order.totalPrice * 100);

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency,
    receipt: `order_${order._id}`,
    notes: {
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
    },
  });

  logger.info(`Razorpay order created: ${razorpayOrder.id}`);

  res.status(201).json({
    success: true,
    message: 'Razorpay order created',
    data: {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order._id,
    },
  });
});

// @desc   Verify Razorpay payment
// @route  POST /api/payments/razorpay/verify
// @access Private
export const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const {
    orderId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  const isOwner = order.user.toString() === req.user._id.toString();
  if (!isOwner && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this order',
    });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return res.status(500).json({
      success: false,
      message: 'Razorpay secret not configured',
    });
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(payload)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment signature',
    });
  }

  order.isPaid = true;
  order.paidAt = new Date();
  order.status = 'paid';
  order.paymentResult = {
    id: razorpay_payment_id,
    status: 'captured',
    update_time: new Date().toISOString(),
    email_address: req.user.email,
  };

  const updatedOrder = await order.save();

  logger.info(`Razorpay payment verified: ${updatedOrder._id}`);

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    data: updatedOrder,
  });
});
