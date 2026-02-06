/**
 * Order Controller
 * Handles order creation and management
 */

import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

const calculatePrices = (items) => {
  const itemsPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 500 ? 0 : 40;
  const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

// @desc   Create new order
// @route  POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No order items provided',
    });
  }

  const populatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock for ${product.name}`,
      });
    }

    populatedItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const priceSummary = calculatePrices(populatedItems);

  const order = await Order.create({
    user: req.user._id,
    items: populatedItems,
    shippingAddress,
    paymentMethod,
    ...priceSummary,
  });

  await Promise.all(
    populatedItems.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      })
    )
  );

  logger.info(`Order created: ${order._id}`);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: order,
  });
});

// @desc   Get logged in user's orders
// @route  GET /api/orders/my
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  const isOwner = order.user._id.toString() === req.user._id.toString();
  if (!isOwner && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this order',
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

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

  order.isPaid = true;
  order.paidAt = new Date();
  order.status = 'paid';
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  logger.info(`Order paid: ${updatedOrder._id}`);

  res.status(200).json({
    success: true,
    message: 'Order marked as paid',
    data: updatedOrder,
  });
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  order.isDelivered = true;
  order.deliveredAt = new Date();
  order.status = 'delivered';

  const updatedOrder = await order.save();

  logger.info(`Order delivered: ${updatedOrder._id}`);

  res.status(200).json({
    success: true,
    message: 'Order marked as delivered',
    data: updatedOrder,
  });
});
