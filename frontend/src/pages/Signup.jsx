import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error, setError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',
    adminSecretKey: ''
  });
  const [formErrors, setFormErrors] = useState({});

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
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.accountType === 'admin' && !formData.adminSecretKey.trim()) {
      newErrors.adminSecretKey = 'Admin secret key is required for admin signup';
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
    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.accountType === 'admin' ? formData.adminSecretKey : null
    );

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className='bg-white min-h-screen flex items-center'>
      <Container className='py-12'>
        <motion.div 
          className='max-w-md mx-auto'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className='text-center mb-8'>
            <motion.div 
              className='flex justify-center mb-4'
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <div className='bg-green-100 p-3 rounded-full'>
                <UserPlus size={32} className='text-green-600' />
              </div>
            </motion.div>
            <motion.h1 
              className='text-3xl font-bold text-gray-900 mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Create Account
            </motion.h1>
            <motion.p 
              className='text-gray-600'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Join NovaMart today
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div 
            className='bg-white border border-gray-200 rounded-lg shadow-sm p-8 space-y-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            {/* Global Error */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-red-700 text-sm'>{error}</p>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className='space-y-5'>
              {/* Account Type Field */}
              <div>
                <label htmlFor='accountType' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Account Type
                </label>
                <select
                  id='accountType'
                  name='accountType'
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                >
                  <option value='customer'>Customer</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>

              {/* Admin Secret Key Field (conditional) */}
              {formData.accountType === 'admin' && (
                <div>
                  <label htmlFor='adminSecretKey' className='block text-sm font-semibold text-gray-700 mb-2'>
                    Admin Secret Key
                  </label>
                  <input
                    type='password'
                    id='adminSecretKey'
                    name='adminSecretKey'
                    value={formData.adminSecretKey}
                    onChange={handleInputChange}
                    placeholder='Enter admin secret key'
                    className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      formErrors.adminSecretKey
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                  />
                  {formErrors.adminSecretKey && (
                    <p className='text-red-500 text-sm mt-1'>{formErrors.adminSecretKey}</p>
                  )}
                  <p className='text-blue-500 text-xs mt-1'>🔐 Required for admin account creation</p>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor='name' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='John Doe'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {formErrors.name && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='you@example.com'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {formErrors.email && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='••••••••'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {formErrors.password && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
                )}
                <p className='text-gray-500 text-xs mt-1'>Minimum 6 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 mb-2'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder='••••••••'
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                    formErrors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                {formErrors.confirmPassword && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.confirmPassword}</p>
                )}
              </div>

              {/* Signup Button */}
              <Button
                type='submit'
                variant='primary'
                size='lg'
                className='w-full'
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            {/* Terms & Conditions */}
            <div className='text-center text-xs text-gray-500'>
              <p>By signing up, you agree to our Terms & Conditions</p>
            </div>

            {/* Login Link */}
            <div className='text-center'>
              <p className='text-gray-600 text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='text-green-600 hover:text-green-700 font-semibold'>
                  Log in here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Signup;




