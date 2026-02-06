import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/common/Button';
import { Search, Zap, Truck, ShieldCheck, Package, Star, TrendingUp, Award } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading } = useProducts();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24'>
        <Container>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* Left Content */}
            <motion.div 
              className='space-y-6'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h1 
                className='text-4xl md:text-5xl font-bold leading-tight'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Welcome to <span className='text-blue-200'>NovaMart</span>
              </motion.h1>
              <motion.p 
                className='text-lg text-blue-100'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Discover the latest electronics and tech gadgets at unbeatable prices. Your one-stop shop for quality products.
              </motion.p>

              {/* Search Bar */}
              <motion.form 
                onSubmit={handleSearch} 
                className='flex gap-2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <Button
                  type='submit'
                  variant='secondary'
                  size='md'
                  className='flex items-center gap-2'
                >
                  <Search size={18} />
                  Search
                </Button>
              </motion.form>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  onClick={() => navigate('/products')}
                  variant='outline'
                  size='lg'
                  className='text-white border-white hover:bg-white hover:text-blue-600'
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Enhanced Visual Section */}
            <motion.div 
              className='hidden md:flex items-center justify-center relative'
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            >
              {/* Main Card */}
              <motion.div 
                className='w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-2xl relative overflow-hidden'
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Glow */}
                <div className='absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse'></div>
                
                {/* Center Lightning Icon */}
                <motion.div 
                  className='relative z-10'
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div className='bg-white/20 p-8 rounded-full backdrop-blur-md border-2 border-white/40 shadow-lg'>
                    <Zap size={80} className='text-white drop-shadow-lg' />
                  </div>
                </motion.div>

                {/* Floating Icons - Top Right */}
                <motion.div 
                  className='absolute top-6 right-6 bg-white/90 p-3 rounded-full shadow-lg'
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Star size={24} className='text-yellow-500' />
                </motion.div>

                {/* Floating Icons - Top Left */}
                <motion.div 
                  className='absolute top-6 left-6 bg-white/90 p-3 rounded-full shadow-lg'
                  animate={{ 
                    y: [0, -10, 0],
                    x: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Package size={24} className='text-blue-600' />
                </motion.div>

                {/* Floating Icons - Bottom Left */}
                <motion.div 
                  className='absolute bottom-6 left-6 bg-white/90 p-3 rounded-full shadow-lg'
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 2.8, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <TrendingUp size={24} className='text-green-500' />
                </motion.div>

                {/* Floating Icons - Bottom Right */}
                <motion.div 
                  className='absolute bottom-6 right-6 bg-white/90 p-3 rounded-full shadow-lg'
                  animate={{ 
                    y: [0, 12, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3.2, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Award size={24} className='text-purple-600' />
                </motion.div>

                {/* Stats Badge - Top */}
                <motion.div 
                  className='absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ⚡ 1000+ Products
                </motion.div>

                {/* Stats Badge - Bottom */}
                <motion.div 
                  className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ✓ Trusted by 10K+
                </motion.div>

                {/* Decorative Circles */}
                <div className='absolute top-1/4 left-0 w-20 h-20 bg-white/10 rounded-full blur-xl'></div>
                <div className='absolute bottom-1/4 right-0 w-24 h-24 bg-blue-300/10 rounded-full blur-xl'></div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className='py-12 bg-gray-50 border-b border-gray-200'>
        <Container>
          <motion.div 
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {/* Feature 1 */}
            <motion.div 
              className='flex gap-4 text-center md:text-left'
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex-shrink-0'>
                <motion.div 
                  className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white'
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Truck size={24} />
                </motion.div>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Free Shipping</h3>
                <p className='text-gray-600'>On orders over $50. Fast delivery right to your door.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className='flex gap-4 text-center md:text-left'
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex-shrink-0'>
                <motion.div 
                  className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white'
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ShieldCheck size={24} />
                </motion.div>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Secure Checkout</h3>
                <p className='text-gray-600'>Safe and encrypted payment processing for peace of mind.</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className='flex gap-4 text-center md:text-left'
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex-shrink-0'>
                <motion.div 
                  className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white'
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap size={24} />
                </motion.div>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Quality Products</h3>
                <p className='text-gray-600'>Curated selection of top-rated electronics and accessories.</p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className='py-16'>
        <Container>
          <motion.div 
            className='mb-10'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Featured Products</h2>
            <p className='text-gray-600'>Check out our best-selling items and latest arrivals.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductGrid products={featuredProducts} isLoading={loading} />
          </motion.div>

          {/* View All Button */}
          <motion.div 
            className='flex justify-center mt-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={() => navigate('/products')}
              variant='primary'
              size='lg'
            >
              View All Products
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Promotional Banner */}
      <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12'>
        <Container className='text-center space-y-4'>
          <motion.h2 
            className='text-3xl font-bold'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Special Offer!
          </motion.h2>
          <motion.p 
            className='text-blue-100 text-lg'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get up to 50% off on selected items. Limited time only!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={() => navigate('/products')}
              variant='secondary'
              size='md'
            >
              Shop Deals
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
