/**
 * JWT Token Generation Utility
 * Creates JWT tokens with user ID
 * Used in login and signup endpoints
 */

import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
  return token;
};

export default generateToken;
