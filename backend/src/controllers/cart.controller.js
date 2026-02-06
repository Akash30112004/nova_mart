/**
 * Cart Controller
 * Handles cart operations
 */

import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
import asyncHandler from '../utils/asyncHandler.js';

const buildCartResponse = (cart) => {
  const items = cart?.items || [];
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    itemsCount,
    subtotal,
  };
};

// @desc   Get current user's cart
// @route  GET /api/cart
// @access Private
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  res.status(200).json({
    success: true,
    data: buildCartResponse(cart),
  });
});

// @desc   Add item to cart
// @route  POST /api/cart
// @access Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Not enough stock available',
    });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + Number(quantity);

    if (product.stock < newQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Stock limit reached',
      });
    }

    existingItem.quantity = newQuantity;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: Number(quantity),
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: buildCartResponse(cart),
  });
});

// @desc   Update cart item quantity
// @route  PUT /api/cart/item/:productId
// @access Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found',
    });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  if (quantity > product.stock) {
    return res.status(400).json({
      success: false,
      message: 'Stock limit reached',
    });
  }

  const item = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found in cart',
    });
  }

  if (Number(quantity) === 0) {
    cart.items = cart.items.filter(
      (cartItem) => cartItem.product.toString() !== productId
    );
  } else {
    item.quantity = Number(quantity);
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: buildCartResponse(cart),
  });
});

// @desc   Remove item from cart
// @route  DELETE /api/cart/item/:productId
// @access Private
export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: 'Cart not found',
    });
  }

  cart.items = cart.items.filter(
    (cartItem) => cartItem.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: buildCartResponse(cart),
  });
});

// @desc   Clear cart
// @route  DELETE /api/cart
// @access Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: buildCartResponse(null),
    });
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    data: buildCartResponse(cart),
  });
});
