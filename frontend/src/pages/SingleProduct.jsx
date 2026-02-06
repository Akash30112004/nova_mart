import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { getStockStatus, isOutOfStock } from '../utils/stockUtils';
import { Star, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { products, getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find the product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [getProductById, id]);
  const stockStatus = product ? getStockStatus(product.stock) : null;
  const isOutStock = product ? isOutOfStock(product.stock) : false;

  if (!product && loading) {
    return (
      <div className='min-h-screen bg-white'>
        <Container className='py-16 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Loading product...</h1>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-white'>
        <Container className='py-16 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Product Not Found</h1>
          <p className='text-gray-600 mb-8'>Sorry, the product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')} variant='primary'>
            Back to Products
          </Button>
        </Container>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && (p._id || p.id) !== (product._id || product.id))
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value);
    const maxQty = product.stock;
    if (newValue > 0 && newValue <= maxQty) {
      setQuantity(newValue);
    }
  };

  return (
    <div className='bg-white'>
      {/* Breadcrumb */}
      <Container className='py-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold'
        >
          <ChevronLeft size={20} />
          Go Back
        </button>
      </Container>

      {/* Product Details Section */}
      <Container className='py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {/* Product Image */}
          <motion.div 
            className='bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-96 relative'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain p-4 transition-all ${
                isOutStock ? 'grayscale' : ''
              }`}
            />
            {isOutStock && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg'>
                <span className='text-white font-bold text-lg bg-black/50 px-4 py-2 rounded'>
                  OUT OF STOCK
                </span>
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div 
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Category Badge */}
            <div>
              <span className='inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold'>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className='text-4xl font-bold text-gray-900'>{product.name}</h1>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className='font-semibold text-gray-700'>{product.rating}</span>
              </div>
              <span className='text-gray-600'>({product.reviews} reviews)</span>
            </div>

            {/* Price Section */}
            <div className='space-y-2'>
              <div className='flex items-center gap-4'>
                <span className='text-4xl font-bold text-gray-900'>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className='text-xl text-gray-500 line-through'>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className='px-3 py-1 bg-red-100 text-red-600 rounded-full font-bold'>
                    -‌{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className='text-gray-600 text-lg leading-relaxed'>
              {product.description}
            </p>

            {/* Stock Status */}
            <div className='flex items-center gap-3'>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${stockStatus.color}`}>
                {stockStatus.message}
              </span>
              {stockStatus.isAvailable && stockStatus.quantity <= 5 && stockStatus.quantity > 0 && (
                <span className='text-xs text-orange-600 font-semibold'>Hurry! Limited stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <label className='text-gray-700 font-semibold'>Quantity:</label>
                <input
                  type='number'
                  min='1'
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  disabled={isOutStock}
                  className={`w-20 px-3 py-2 border rounded-lg text-center focus:outline-none focus:ring-2 ${
                    isOutStock
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {!isOutStock && (
                  <span className='text-sm text-gray-600'>
                    {product.stock > 0 ? `${product.stock} available` : ''}
                  </span>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isOutStock}
                variant='primary'
                size='lg'
                className={`w-full flex items-center justify-center gap-2 transition-all ${
                  isOutStock ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart size={20} />
                {isOutStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>

            {/* Additional Info */}
            <div className='border-t border-gray-200 pt-6 space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>SKU:</span>
                <span className='font-semibold'>#{product._id || product.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Category:</span>
                <span
                  className='font-semibold text-blue-600 cursor-pointer hover:underline'
                  onClick={() => navigate(`/products?category=${product.category}`)}
                >
                  {product.category}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className='bg-gray-50 py-12 border-t border-gray-200'>
          <Container>
            <motion.h2 
              className='text-3xl font-bold text-gray-900 mb-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Related Products
            </motion.h2>
            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      )}
    </div>
  );
};

export default SingleProduct;
