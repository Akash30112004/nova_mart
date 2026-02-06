/**
 * MongoDB Connection Configuration
 * Connects to MongoDB using Mongoose
 * Handles connection events and errors
 */

import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    logger.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB Disconnected');
});

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB Error:', error.message);
});

export default connectDB;
