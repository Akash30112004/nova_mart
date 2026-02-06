/**
 * Cart Routes
 */

import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import validate, {
  validateCartAdd,
  validateCartUpdate,
} from '../middlewares/validate.middleware.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, validateCartAdd, validate, addToCart);
router.put(
  '/item/:productId',
  authMiddleware,
  validateCartUpdate,
  validate,
  updateCartItem
);
router.delete('/item/:productId', authMiddleware, removeCartItem);
router.delete('/', authMiddleware, clearCart);

export default router;
