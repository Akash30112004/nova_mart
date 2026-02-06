import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import { LogOut, LogIn, UserPlus, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Container from './Container';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItem } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
    setOpenNav(false);
    navigate('/');
  };

  return (
    <nav className='bg-white shadow-lg sticky top-0 z-40'>
      <Container className='py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='flex-shrink-0'>
            <motion.h1 
              className='text-2xl md:text-3xl font-bold'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className='text-blue-600'>Nova</span>
              <span className='text-gray-900'>Mart</span>
            </motion.h1>
          </Link>

          {/* Desktop Menu */}
          <ul className='hidden md:flex gap-8 items-center'>
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-semibold transition-colors ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Cart and Auth */}
          <div className='flex items-center gap-3'>
            {/* Cart Button */}
            <Link to='/cart' className='relative flex-shrink-0'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoCartOutline className='h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors' />
              </motion.div>
              {cartItem.length > 0 && (
                <motion.span 
                  className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cartItem.length}
                </motion.span>
              )}
            </Link>

            {/* Auth Section - Desktop */}
            <div className='hidden md:flex items-center gap-3'>
              {isAuthenticated ? (
                <div className='relative'>
                  <button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors'
                  >
                    <span className='font-semibold'>{user?.name}</span>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                  {openUserMenu && (
                    <motion.div 
                      className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className='px-4 py-2 text-gray-700 text-sm border-b'>
                        <p className='font-semibold'>{user?.name}</p>
                        <p className='text-gray-500 break-all'>{user?.email}</p>
                      </div>
                      {user?.isAdmin && (
                        <Link
                          to='/admin/add-product'
                          className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors'
                          onClick={() => setOpenUserMenu(false)}
                        >
                          <Lock size={16} />
                          <span>Add Product</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className='w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Link
                    to='/login'
                    className='flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors'
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to='/signup'
                    className='flex items-center gap-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition-colors'
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden flex-shrink-0 text-gray-700'
              onClick={toggleNav}
              aria-label='Toggle menu'
            >
              {openNav ? (
                <HiMenuAlt3 className='h-6 w-6' />
              ) : (
                <HiMenuAlt1 className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {openNav && (
          <motion.div 
            className='md:hidden mt-4 space-y-3 pb-4'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className='space-y-2'>
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block font-semibold py-2 px-3 rounded transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setOpenNav(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Auth Section */}
            <div className='border-t pt-3 space-y-2'>
              {isAuthenticated ? (
                <>
                  <div className='px-3 py-2 bg-blue-50 rounded text-sm'>
                    <p className='font-semibold text-blue-600'>{user?.name}</p>
                    <p className='text-gray-500 text-xs break-all'>{user?.email}</p>
                  </div>
                  {user?.isAdmin && (
                    <Link
                      to='/admin/add-product'
                      className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors'
                      onClick={() => setOpenNav(false)}
                    >
                      <Lock size={18} />
                      <span>Add Product</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors'
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors'
                    onClick={() => setOpenNav(false)}
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to='/signup'
                    className='flex items-center gap-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors'
                    onClick={() => setOpenNav(false)}
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};

export default Navbar;
