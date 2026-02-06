import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useProducts } from '../context/ProductContext';
import { Plus } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Toys',
    'Food'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+/i.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid image URL (http/https)';
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    setError(null);

    try {
      // Create new product object
      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.imageUrl,
        stock: parseInt(formData.stock)
      };

      // Use ProductContext to add product
      const result = await addProduct(newProduct);

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          imageUrl: '',
          stock: ''
        });

        // Reset success message after 2 seconds
        setTimeout(() => {
          setSuccess(false);
          navigate('/products');
        }, 2000);
      } else {
        setError(result.error || 'Failed to add product. Please try again.');
      }
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white min-h-screen py-12'>
      <Container>
        <div className='max-w-2xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='bg-blue-100 p-2 rounded-lg'>
                <Plus size={24} className='text-blue-600' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900'>Add New Product</h1>
            </div>
            <p className='text-gray-600'>Fill in the details below to add a new product to NovaMart</p>
          </div>

          {/* Form Card */}
          <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6'>
            {/* Success Message */}
            {success && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                <p className='text-green-700 font-semibold'>✓ Product added successfully! Redirecting...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-red-700 text-sm'>{error}</p>
              </div>
            )}

            {/* Product Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Product Name */}
              <div>
                <label htmlFor='name' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Product Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='e.g., Wireless Headphones'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {formErrors.name && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Description *
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder='Detailed product description (at least 10 characters)'
                  rows='4'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition resize-none ${
                    formErrors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {formErrors.description && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.description}</p>
                )}
              </div>

              {/* Price and Category Row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Price */}
                <div>
                  <label htmlFor='price' className='block text-sm font-semibold text-gray-700 mb-2'>
                    Price (₹) *
                  </label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder='0.00'
                    step='0.01'
                    min='0'
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      formErrors.price
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {formErrors.price && (
                    <p className='text-red-500 text-sm mt-1'>{formErrors.price}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor='category' className='block text-sm font-semibold text-gray-700 mb-2'>
                    Category *
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition ${
                      formErrors.category
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  >
                    <option value=''>Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className='text-red-500 text-sm mt-1'>{formErrors.category}</p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor='imageUrl' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Image URL *
                </label>
                <input
                  type='text'
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder='https://example.com/image.jpg'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.imageUrl
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {formErrors.imageUrl && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.imageUrl}</p>
                )}
                <p className='text-gray-500 text-xs mt-1'>Supported formats: jpg, png, gif, webp</p>

                {/* Image Preview */}
                {formData.imageUrl && !formErrors.imageUrl && (
                  <div className='mt-4 rounded-lg overflow-hidden border border-gray-200'>
                    <img
                      src={formData.imageUrl}
                      alt='Preview'
                      className='w-full h-48 object-cover'
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Stock */}
              <div>
                <label htmlFor='stock' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Stock Quantity *
                </label>
                <input
                  type='number'
                  id='stock'
                  name='stock'
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder='0'
                  min='0'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.stock
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {formErrors.stock && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.stock}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className='flex gap-4 pt-4'>
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='flex-1'
                  disabled={loading}
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </Button>
                <Button
                  type='button'
                  variant='secondary'
                  size='lg'
                  className='flex-1'
                  onClick={() => navigate('/products')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
            <h3 className='font-semibold text-blue-900 mb-2'>Note:</h3>
            <p className='text-blue-800 text-sm'>
              Products created here are stored locally in your browser using localStorage. They will be visible in the products listing and can be added to cart. This is a frontend demo - in production, products would be stored in a database.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddProduct;
