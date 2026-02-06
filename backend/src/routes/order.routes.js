/**
 * Order Routes
 */

import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import validate, {
  validateOrderCreate,
} from '../middlewares/validate.middleware.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', authMiddleware, validateOrderCreate, validate, createOrder);
router.get('/my', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id/pay', authMiddleware, updateOrderToPaid);
router.put('/:id/deliver', authMiddleware, adminMiddleware, updateOrderToDelivered);

export default router;
