/**
 * Logger Utility
 * Simple logging utility with color-coded output
 * Supports INFO, WARN, ERROR, DEBUG levels
 */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
};

const logger = {
  info: (message, data = '') => {
    console.log(`${colors.green}[INFO]${colors.reset} ${message}`, data);
  },
  warn: (message, data = '') => {
    console.log(`${colors.yellow}[WARN]${colors.reset} ${message}`, data);
  },
  error: (message, data = '') => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`, data);
  },
  debug: (message, data = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.blue}[DEBUG]${colors.reset} ${message}`, data);
    }
  },
};

export default logger;
