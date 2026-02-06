import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { Star, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { isOutOfStock } from '../../utils/stockUtils';
import { motion } from 'motion/react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { deleteProduct } = useProducts();
  const isOutStock = isOutOfStock(product.stock);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleViewDetails = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;

    const result = await deleteProduct(product._id || product.id);
    if (!result?.success) {
      window.alert(result?.error || 'Failed to delete product');
    }
  };

  return (
    <motion.div 
      className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      {/* Image Container */}
      <div className='relative overflow-hidden bg-gray-100 aspect-square'>
        <motion.img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover ${
            isOutStock ? 'grayscale' : ''
          }`}
          onClick={handleViewDetails}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <motion.div 
            className='absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold'
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            -{discount}%
          </motion.div>
        )}

        {/* Stock Status Overlay */}
        {isOutStock && (
          <motion.div 
            className='absolute inset-0 bg-black/20 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className='text-white font-bold text-lg bg-black/50 px-4 py-2 rounded'>Out of Stock</span>
          </motion.div>
        )}
      </div>

      {/* Content Container */}
      <div className='p-4 flex flex-col flex-grow'>
        {/* Category */}
        <p className='text-xs text-gray-500 uppercase tracking-wider mb-2'>
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className='text-base font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors'>
          {product.name}
        </h3>

        {/* Rating */}
        <div className='flex items-center gap-2 mb-3'>
          <div className='flex items-center gap-1'>
            <Star size={14} className='fill-yellow-400 text-yellow-400' />
            <span className='text-sm font-semibold text-gray-700'>{product.rating}</span>
          </div>
          <span className='text-xs text-gray-500'>({product.reviews} reviews)</span>
        </div>

        {/* Price Section */}
        <div className='flex items-center gap-2 mb-4'>
          <span className='text-lg font-bold text-gray-900'>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className='text-sm text-gray-500 line-through'>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <motion.div 
          className='flex gap-2 mt-auto flex-wrap'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={handleViewDetails}
            className='flex-1 py-2 px-3 bg-gray-100 text-gray-800 rounded font-semibold text-sm hover:bg-gray-200 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
          <motion.button
            onClick={handleAddToCart}
            disabled={isOutStock}
            className={`flex-1 py-2 px-3 rounded font-semibold text-sm flex items-center justify-center gap-1 transition-colors ${
              isOutStock
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            whileHover={!isOutStock ? { scale: 1.05 } : {}}
            whileTap={!isOutStock ? { scale: 0.95 } : {}}
          >
            <IoCartOutline size={16} />
            {isOutStock ? 'Out of Stock' : 'Add'}
          </motion.button>
          {user?.isAdmin && (
            <motion.button
              onClick={handleDelete}
              className='py-2 px-3 rounded font-semibold text-sm flex items-center justify-center gap-1 bg-red-600 text-white hover:bg-red-700 transition-colors'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={16} />
              Delete
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
