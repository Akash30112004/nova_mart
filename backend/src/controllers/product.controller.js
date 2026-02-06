/**
 * Product Controller
 * Handles product CRUD and listing
 */

import Product from '../models/Product.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

// @desc   Get products with filters and pagination
// @route  GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword,
    category,
    minPrice,
    maxPrice,
    rating,
    inStock,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  const filter = {};

  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: 'i' };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }

  if (inStock === 'true') {
    filter.stock = { $gt: 0 };
  }

  const sortMap = {
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 },
  };

  const sortOption = sortMap[sort] || { createdAt: -1 };

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.min(Math.max(Number(limit), 1), 100);
  const skip = (pageNumber - 1) * limitNumber;

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort(sortOption).skip(skip).limit(limitNumber),
  ]);

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      pages: Math.ceil(total / limitNumber),
    },
  });
});

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc   Create product
// @route  POST /api/products
// @access Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    price,
    originalPrice,
    image,
    description,
    rating,
    reviews,
    stock,
    isFeatured,
  } = req.body;

  const product = await Product.create({
    name,
    category,
    price,
    originalPrice,
    image,
    description,
    rating,
    reviews,
    stock,
    isFeatured,
    createdBy: req.user._id,
  });

  logger.info(`Product created: ${product.name}`);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  const fields = [
    'name',
    'category',
    'price',
    'originalPrice',
    'image',
    'description',
    'rating',
    'reviews',
    'stock',
    'isFeatured',
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  const updatedProduct = await product.save();

  logger.info(`Product updated: ${updatedProduct.name}`);

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  await product.deleteOne();

  logger.warn(`Product deleted: ${product.name}`);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
