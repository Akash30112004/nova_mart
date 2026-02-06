import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const Cart = () => {
  const { cartItem, updateCartItem, deleteItem } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  // Calculate totals
  const subtotal = cartItem.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 0) return;
    updateCartItem(item.id, newQuantity);
  };

  if (cartItem.length === 0) {
    return (
      <div className='bg-white min-h-screen'>
        <Container className='py-16'>
          <motion.div 
            className='flex flex-col items-center justify-center text-center space-y-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
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
              <ShoppingBag size={80} className='text-gray-300' />
            </motion.div>
            <motion.h1 
              className='text-4xl font-bold text-gray-900'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Cart is Empty
            </motion.h1>
            <motion.p 
              className='text-gray-600 text-lg max-w-md'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Looks like you haven't added any products yet. Start shopping to fill your cart!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => navigate('/products')}
                variant='primary'
                size='lg'
                className='flex items-center gap-2'
              >
                <ArrowLeft size={20} />
                Continue Shopping
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen'>
      {/* Header */}
      <motion.div 
        className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <motion.h1 
            className='text-4xl font-bold'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Shopping Cart
          </motion.h1>
          <motion.p 
            className='text-blue-100 mt-2'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            You have {cartItem.length} item{cartItem.length !== 1 ? 's' : ''} in your cart
          </motion.p>
        </Container>
      </motion.div>

      <Container className='py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <motion.div 
            className='lg:col-span-2 space-y-4'
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
            {cartItem.map((item, index) => (
              <motion.div
                key={index}
                className='border border-gray-200 rounded-lg p-4 md:p-6 bg-white hover:shadow-md transition-shadow'
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className='flex gap-4'>
                  {/* Product Image */}
                  <div className='flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Product Details */}
                  <div className='flex-grow'>
                    <h3
                      className='font-semibold text-lg text-gray-900 cursor-pointer hover:text-blue-600'
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    <p className='text-gray-600 text-sm'>{item.category}</p>
                    <p className='text-blue-600 font-bold text-lg mt-2'>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center border border-gray-300 rounded-lg'>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, (item.quantity || 1) - 1)
                        }
                        className='px-3 py-1 text-gray-600 hover:text-gray-900 font-semibold'
                      >
                        −
                      </button>
                      <span className='px-4 py-1 border-l border-r border-gray-300 font-semibold'>
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, (item.quantity || 1) + 1)
                        }
                        className='px-3 py-1 text-gray-600 hover:text-gray-900 font-semibold'
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Button */}
                    <motion.button
                      onClick={() => deleteItem(item.id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      aria-label='Delete item'
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Item Total */}
                <div className='mt-4 pt-4 border-t border-gray-200 flex justify-between items-center'>
                  <span className='text-gray-600'>Subtotal:</span>
                  <span className='font-bold text-lg'>
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className='lg:col-span-1'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4 space-y-4'>
              <h2 className='text-2xl font-bold text-gray-900'>Order Summary</h2>

              {/* Summary Details */}
              <div className='space-y-3 border-b border-gray-200 pb-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-semibold'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax (10%)</span>
                  <span className='font-semibold'>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='font-semibold'>
                    {shippingCost === 0 ? (
                      <span className='text-green-600'>FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shippingCost > 0 && (
                <p className='text-sm text-blue-600 bg-blue-50 p-3 rounded'>
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              {/* Total */}
              <div className='flex justify-between items-center text-lg font-bold'>
                <span>Total:</span>
                <span className='text-2xl text-blue-600'>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className='space-y-2'>
                <input
                  type='text'
                  placeholder='Enter promo code'
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors'>
                  Apply Code
                </button>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                variant='primary'
                size='lg'
                className='w-full'
              >
                Proceed to Checkout
              </Button>

              {/* Continue Shopping */}
              <Button
                onClick={() => navigate('/products')}
                variant='secondary'
                size='lg'
                className='w-full'
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
