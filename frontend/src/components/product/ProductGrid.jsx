import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';

const ProductGrid = ({ products = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i} 
            className='bg-gray-200 rounded-lg aspect-square animate-pulse'
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
          ></motion.div>
        ))}
      </motion.div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div 
        className='py-16 text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className='text-gray-500 text-lg'>No products found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {products.map(product => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
