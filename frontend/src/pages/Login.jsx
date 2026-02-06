import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const result = await login(formData.email, formData.password);

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
              <div className='bg-blue-100 p-3 rounded-full'>
                <LogIn size={32} className='text-blue-600' />
              </div>
            </motion.div>
            <motion.h1 
              className='text-3xl font-bold text-gray-900 mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className='text-gray-600'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Log in to your NovaMart account
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-5'>
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
                      : 'border-gray-300 focus:ring-blue-500'
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
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {formErrors.password && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type='submit'
                variant='primary'
                size='lg'
                className='w-full'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <p className='text-sm text-blue-900 font-semibold mb-2'>Demo Account:</p>
              <p className='text-sm text-blue-800'>Email: demo@example.com</p>
              <p className='text-sm text-blue-800'>Password: demo123</p>
            </div>

            {/* Sign Up Link */}
            <div className='text-center'>
              <p className='text-gray-600 text-sm'>
                Don't have an account?{' '}
                <Link to='/signup' className='text-blue-600 hover:text-blue-700 font-semibold'>
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;
