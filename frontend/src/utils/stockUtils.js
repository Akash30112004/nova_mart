/**
 * Stock Management Utility Functions
 * Centralized logic for stock status checks and messages
 * No component duplication - single source of truth
 */

/**
 * Determines if a product is out of stock
 * @param {number} stock - Product stock quantity
 * @returns {boolean} - True if stock is 0
 */
export const isOutOfStock = (stock) => {
  return stock === 0;
};

/**
 * Determines if a product has low stock
 * @param {number} stock - Product stock quantity
 * @returns {boolean} - True if stock is between 1 and 5
 */
export const isLowStock = (stock) => {
  return stock > 0 && stock <= 5;
};

/**
 * Determines if a product has normal stock
 * @param {number} stock - Product stock quantity
 * @returns {boolean} - True if stock is greater than 5
 */
export const isNormalStock = (stock) => {
  return stock > 5;
};

/**
 * Gets human-readable stock message
 * @param {number} stock - Product stock quantity
 * @returns {string} - Appropriate message based on stock level
 */
export const getStockMessage = (stock) => {
  if (isOutOfStock(stock)) {
    return 'Out of Stock';
  }
  if (isLowStock(stock)) {
    return `Only ${stock} left`;
  }
  return 'In Stock';
};

/**
 * Gets Tailwind color classes for stock status
 * @param {number} stock - Product stock quantity
 * @returns {string} - Tailwind classes for styling
 */
export const getStockColor = (stock) => {
  if (isOutOfStock(stock)) {
    return 'bg-red-100 text-red-700';
  }
  if (isLowStock(stock)) {
    return 'bg-orange-100 text-orange-700';
  }
  return 'bg-green-100 text-green-700';
};

/**
 * Gets badge background color for stock status
 * @param {number} stock - Product stock quantity
 * @returns {string} - Tailwind bg color class
 */
export const getStockBadgeColor = (stock) => {
  if (isOutOfStock(stock)) {
    return 'bg-red-50 border-red-200';
  }
  if (isLowStock(stock)) {
    return 'bg-orange-50 border-orange-200';
  }
  return 'bg-green-50 border-green-200';
};

/**
 * Gets text color for stock status
 * @param {number} stock - Product stock quantity
 * @returns {string} - Tailwind text color class
 */
export const getStockTextColor = (stock) => {
  if (isOutOfStock(stock)) {
    return 'text-red-600';
  }
  if (isLowStock(stock)) {
    return 'text-orange-600';
  }
  return 'text-green-600';
};

/**
 * Gets comprehensive stock status object
 * Useful for components that need multiple pieces of stock info
 * @param {number} stock - Product stock quantity
 * @returns {object} - { status, message, color, badge, isAvailable, textColor }
 */
export const getStockStatus = (stock) => {
  return {
    status: isOutOfStock(stock) ? 'out-of-stock' : isLowStock(stock) ? 'low-stock' : 'in-stock',
    message: getStockMessage(stock),
    color: getStockColor(stock),
    badgeColor: getStockBadgeColor(stock),
    textColor: getStockTextColor(stock),
    isAvailable: stock > 0,
    quantity: stock,
  };
};

/**
 * Validates if user can add a specific quantity to cart
 * @param {number} currentStock - Current available stock
 * @param {number} quantityToAdd - Quantity user wants to add
 * @param {number} currentQuantityInCart - Already in cart (optional)
 * @returns {boolean} - True if user can add that quantity
 */
export const canAddToCart = (currentStock, quantityToAdd = 1, currentQuantityInCart = 0) => {
  const totalWould = currentQuantityInCart + quantityToAdd;
  return totalWould <= currentStock && currentStock > 0;
};

/**
 * Gets maximum quantity user can add to cart
 * @param {number} currentStock - Current available stock
 * @param {number} currentQuantityInCart - Already in cart (optional)
 * @returns {number} - Maximum quantity allowed to add
 */
export const getMaxAddableQuantity = (currentStock, currentQuantityInCart = 0) => {
  return Math.max(0, currentStock - currentQuantityInCart);
};
