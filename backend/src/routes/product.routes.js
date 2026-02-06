/**
 * Product Routes
 */

import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import validate, {
  validateProductCreate,
  validateProductUpdate,
} from '../middlewares/validate.middleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validateProductCreate,
  validate,
  createProduct
);
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validateProductUpdate,
  validate,
  updateProduct
);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;
