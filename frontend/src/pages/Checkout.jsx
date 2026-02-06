import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import PaymentMethod from '../components/checkout/PaymentMethod';
import { CheckCircle, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'motion/react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment Method, 3: Payment Details, 4: Confirmation
  const [paymentMethod, setPaymentMethod] = useState(''); // 'cod', 'upi', 'card'
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Calculate totals
  const subtotal = cartItem.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  // Validation functions
  const validateShipping = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    // Step 1: Validate shipping info
    if (step === 1) {
      const newErrors = validateShipping();
      if (Object.keys(newErrors).length === 0) {
        setStep(2);
      } else {
        setErrors(newErrors);
      }
    }
    // Step 2: Validate payment method selection
    else if (step === 2) {
      if (!paymentMethod) {
        setErrors({ paymentMethod: 'Please select a payment method' });
      } else {
        setErrors({});
        setStep(3);
      }
    }
  };

  const handlePlaceOrder = async () => {
    // Step 3: Validate payment details only for card payment
    if (paymentMethod === 'card') {
      const newErrors = validatePayment();
      if (Object.keys(newErrors).length === 0) {
        setErrors({});
      } else {
        setErrors(newErrors);
        return;
      }
    }

    try {
      const orderItems = cartItem.map((item) => ({
        product: item.id,
        quantity: item.quantity || 1,
      }));

      const orderPayload = {
        items: orderItems,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod,
      };

      const orderResponse = await api.post('/api/orders', orderPayload);
      const order = orderResponse.data.data || orderResponse.data;

      if (paymentMethod === 'card' || paymentMethod === 'upi') {
        const paymentResponse = await api.post('/api/payments/razorpay/order', {
          orderId: order._id,
        });
        setPaymentInfo(paymentResponse.data.data || paymentResponse.data);
      }

      await clearCart();
      setOrderPlaced(true);
      setStep(4);
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to place order';
      toast.error(message);
    }
  };

  const handleNewOrder = () => {
    navigate('/products');
  };

  if (cartItem.length === 0 && !orderPlaced) {
    return (
      <div className='bg-white min-h-screen'>
        <Container className='py-16 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>Your cart is empty</h1>
          <p className='text-gray-600 mb-8'>Add items to your cart before proceeding to checkout.</p>
          <Button onClick={() => navigate('/products')} variant='primary'>
            Continue Shopping
          </Button>
        </Container>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className='bg-white min-h-screen'>
        <Container className='py-16'>
          <motion.div 
            className='max-w-2xl mx-auto text-center space-y-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                delay: 0.2
              }}
            >
              <CheckCircle size={80} className='text-green-600 mx-auto' />
            </motion.div>
            <motion.h1 
              className='text-4xl font-bold text-gray-900'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Order Confirmed!
            </motion.h1>
            <motion.p 
              className='text-gray-600 text-lg'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Thank you for your order. Your order has been successfully placed and is being processed.
            </motion.p>

            {/* Order Details */}
            <motion.div 
              className='bg-gray-50 p-8 rounded-lg text-left space-y-4 mt-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Order Details</h2>
              <div className='space-y-3 border-b border-gray-200 pb-6'>
                {cartItem.map((item, index) => (
                  <div key={index} className='flex justify-between'>
                    <span className='text-gray-700'>
                      {item.name} x {item.quantity || 1}
                    </span>
                    <span className='font-semibold'>
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal:</span>
                  <span className='font-semibold'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tax (10%):</span>
                  <span className='font-semibold'>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping:</span>
                  <span className='font-semibold'>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className='flex justify-between text-lg font-bold text-blue-600'>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Shipping Details */}
            <motion.div 
              className='bg-blue-50 p-6 rounded-lg text-left space-y-2 mt-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className='font-bold text-gray-900'>Shipping Address</h3>
              <p className='text-gray-700'>
                {formData.firstName} {formData.lastName}
              </p>
              <p className='text-gray-700'>{formData.address}</p>
              <p className='text-gray-700'>
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <p className='text-gray-700'>{formData.country}</p>
            </motion.div>

            {paymentInfo && (
              <motion.div 
                className='bg-yellow-50 p-6 rounded-lg text-left space-y-2 mt-8'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <h3 className='font-bold text-gray-900'>Payment Initiated</h3>
                <p className='text-gray-700'>Razorpay Order ID: {paymentInfo.razorpayOrderId}</p>
                <p className='text-gray-700'>Amount: {(paymentInfo.amount / 100).toFixed(2)} {paymentInfo.currency}</p>
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div 
              className='flex flex-col sm:flex-row gap-4 mt-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={handleNewOrder}
                variant='primary'
                size='lg'
                className='flex-1'
              >
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
        className='bg-linear-to-r from-blue-600 to-blue-800 text-white py-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <h1 className='text-4xl font-bold'>Checkout</h1>
        </Container>
      </motion.div>

      <Container className='py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Form */}
          <div className='lg:col-span-2'>
            {/* Step Indicator */}
            <motion.div 
              className='mb-8 flex justify-between items-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {[1, 2, 3, 4].map(s => (
                <div key={s} className='flex items-center'>
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    animate={{
                      scale: step === s ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {s}
                  </motion.div>
                  {s < 4 && (
                    <motion.div
                      className={`flex-1 h-1 mx-4 ${
                        step > s ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > s ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                </div>
              ))}
              <motion.span 
                className='font-semibold text-gray-700 ml-4'
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && 'Shipping'}
                {step === 2 && 'Payment Method'}
                {step === 3 && 'Payment Details'}
                {step === 4 && 'Confirmation'}
              </motion.span>
            </motion.div>

            <AnimatePresence mode='wait'>
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div 
                className='space-y-6'
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className='text-2xl font-bold text-gray-900'>Shipping Information</h2>

                {/* Name */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder='John'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.firstName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder='Doe'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.lastName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='john@example.com'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder='+1 (555) 000-0000'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder='123 Main Street'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.address
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      City
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder='New York'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.city
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      State
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder='NY'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.state
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state}</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      ZIP Code
                    </label>
                    <input
                      type='text'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder='10001'
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.zipCode
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.zipCode && <p className='text-red-500 text-sm mt-1'>{errors.zipCode}</p>}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Country
                  </label>
                  <input
                    type='text'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder='United States'
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.country
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {errors.country && <p className='text-red-500 text-sm mt-1'>{errors.country}</p>}
                </div>

                {/* Next Button */}
                <Button
                  onClick={handleNextStep}
                  variant='primary'
                  size='lg'
                  className='w-full flex items-center justify-center gap-2'
                >
                  Continue to Payment Method
                  <ChevronRight size={20} />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment Method Selection */}
            {step === 2 && (
              <motion.div 
                className='space-y-6'
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />

                {/* Navigation Buttons */}
                <div className='flex gap-4'>
                  <Button
                    onClick={() => setStep(1)}
                    variant='secondary'
                    size='lg'
                    className='flex-1'
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    variant='primary'
                    size='lg'
                    className='flex-1 flex items-center justify-center gap-2'
                    disabled={!paymentMethod}
                  >
                    Continue
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Details (Conditional based on payment method) */}
            {step === 3 && (
              <motion.div 
                className='space-y-6'
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {/* COD Payment - Show confirmation message */}
                {paymentMethod === 'cod' && (
                  <div className='space-y-6'>
                    <div className='bg-green-50 border border-green-200 rounded-lg p-8'>
                      <h2 className='text-2xl font-bold text-gray-900 mb-4'>Cash on Delivery</h2>
                      <p className='text-gray-700 text-lg leading-relaxed'>
                        You will pay in cash when your order is delivered. Our delivery partner will collect the payment at your doorstep.
                      </p>
                      <ul className='mt-6 space-y-3 text-gray-700'>
                        <li className='flex items-start gap-3'>
                          <span className='text-green-600 font-bold mt-1'>✓</span>
                          <span>No online payment required</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='text-green-600 font-bold mt-1'>✓</span>
                          <span>Safe and secure delivery</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='text-green-600 font-bold mt-1'>✓</span>
                          <span>You can inspect the product before paying</span>
                        </li>
                      </ul>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex gap-4'>
                      <Button
                        onClick={() => setStep(2)}
                        variant='secondary'
                        size='lg'
                        className='flex-1'
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        variant='primary'
                        size='lg'
                        className='flex-1 flex items-center justify-center gap-2'
                      >
                        Place Order
                        <CheckCircle size={20} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* UPI Payment - Razorpay flow */}
                {paymentMethod === 'upi' && (
                  <div className='space-y-6'>
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-8 text-center'>
                      <h2 className='text-2xl font-bold text-gray-900 mb-4'>UPI Payment</h2>
                      <p className='text-gray-700 text-lg mb-6'>
                        Proceed to pay securely using your UPI app. We'll create a Razorpay order for this payment.
                      </p>
                      <div className='bg-white rounded-lg p-6 border border-blue-200 mb-6'>
                        <p className='text-gray-600 text-sm'>
                          You will be redirected to complete the payment in your UPI app after the order is created.
                        </p>
                      </div>
                      <p className='text-gray-500 text-sm mb-6'>
                        Test mode keys are supported. For live payments, add your Razorpay live keys in the backend.
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex gap-4'>
                      <Button
                        onClick={() => setStep(2)}
                        variant='secondary'
                        size='lg'
                        className='flex-1'
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        variant='primary'
                        size='lg'
                        className='flex-1'
                      >
                        Proceed to Pay
                      </Button>
                    </div>
                  </div>
                )}

                {/* Card Payment - Show debit card form */}
                {paymentMethod === 'card' && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-bold text-gray-900'>Payment Information</h2>

                    {/* Cardholder Name */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Cardholder Name
                      </label>
                      <input
                        type='text'
                        name='cardName'
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder='John Doe'
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.cardName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.cardName && <p className='text-red-500 text-sm mt-1'>{errors.cardName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Card Number
                      </label>
                      <input
                        type='text'
                        name='cardNumber'
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder='1234 5678 9012 3456'
                        maxLength='19'
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.cardNumber
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.cardNumber && <p className='text-red-500 text-sm mt-1'>{errors.cardNumber}</p>}
                    </div>

                    {/* Expiry & CVV */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Expiry Date
                        </label>
                        <input
                          type='text'
                          name='expiryDate'
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder='MM/YY'
                          maxLength='5'
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.expiryDate
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        />
                        {errors.expiryDate && <p className='text-red-500 text-sm mt-1'>{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          CVV
                        </label>
                        <input
                          type='text'
                          name='cvv'
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder='123'
                          maxLength='3'
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.cvv
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        />
                        {errors.cvv && <p className='text-red-500 text-sm mt-1'>{errors.cvv}</p>}
                      </div>
                    </div>

                    {/* Back & Place Order Buttons */}
                    <div className='flex gap-4'>
                      <Button
                        onClick={() => setStep(2)}
                        variant='secondary'
                        size='lg'
                        className='flex-1'
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        variant='primary'
                        size='lg'
                        className='flex-1 flex items-center justify-center gap-2'
                      >
                        Place Order
                        <CheckCircle size={20} />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div 
            className='lg:col-span-1'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4 space-y-4'>
              <h2 className='text-2xl font-bold text-gray-900'>Order Summary</h2>

              {/* Cart Items */}
              <div className='space-y-3 max-h-64 overflow-y-auto'>
                {cartItem.map((item, index) => (
                  <div key={index} className='flex justify-between text-sm'>
                    <span className='text-gray-700'>
                      {item.name} x {item.quantity || 1}
                    </span>
                    <span className='font-semibold'>
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className='border-gray-200' />

              {/* Totals */}
              <div className='space-y-3 border-b border-gray-200 pb-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-semibold'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Tax (10%)</span>
                  <span className='font-semibold'>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
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

              {/* Total */}
              <div className='flex justify-between items-center text-lg font-bold'>
                <span>Total:</span>
                <span className='text-2xl text-blue-600'>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
