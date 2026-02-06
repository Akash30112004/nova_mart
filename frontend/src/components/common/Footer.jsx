import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Container from './Container';
import { motion } from 'motion/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-gray-300 mt-12'>
      {/* Main Footer Content */}
      <Container className='py-12'>
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {/* Brand Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Link to='/' className='inline-block mb-4'>
              <h2 className='text-2xl font-bold'>
                <span className='text-blue-500'>Nova</span>
                <span className='text-white'>Mart</span>
              </h2>
            </Link>
            <p className='text-sm text-gray-400 mb-3'>
              Powering Your World with the Best in Electronics.
            </p>
            <p className='text-sm text-gray-400'>
              📍 123 Electronics St, Tech City, NY 10001
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className='text-lg font-semibold text-white mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link to='/' className='hover:text-blue-400 transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/products' className='hover:text-blue-400 transition-colors'>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/about' className='hover:text-blue-400 transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='hover:text-blue-400 transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className='text-lg font-semibold text-white mb-4'>Support</h3>
            <ul className='space-y-2 text-sm'>
              <li className='hover:text-blue-400 transition-colors cursor-pointer'>
                Shipping & Returns
              </li>
              <li className='hover:text-blue-400 transition-colors cursor-pointer'>
                FAQs
              </li>
              <li className='hover:text-blue-400 transition-colors cursor-pointer'>
                Order Tracking
              </li>
              <li className='hover:text-blue-400 transition-colors cursor-pointer'>
                Privacy Policy
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className='text-lg font-semibold text-white mb-4'>Newsletter</h3>
            <p className='text-sm text-gray-400 mb-4'>
              Subscribe for exclusive deals and updates.
            </p>
            <form className='flex flex-col gap-2'>
              <input
                type='email'
                placeholder='Your email'
                className='px-4 py-2 bg-gray-800 text-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition-colors'
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>
      </Container>

      {/* Social Links */}
      <Container className='py-6 border-t border-gray-700'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-400'>
            &copy; {currentYear} <span className='text-blue-500'>NovaMart</span>. All rights reserved.
          </p>
          <div className='flex gap-4'>
            <a
              href='#'
              className='text-gray-400 hover:text-blue-400 transition-colors'
              aria-label='Facebook'
            >
              <FaFacebook size={20} />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-blue-400 transition-colors'
              aria-label='Instagram'
            >
              <FaInstagram size={20} />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-blue-400 transition-colors'
              aria-label='Twitter'
            >
              <FaTwitter size={20} />
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-blue-400 transition-colors'
              aria-label='LinkedIn'
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
