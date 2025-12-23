const { HTTP_STATUS } = require('../config/constants');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Prisma Client Known Request Error
  if (err.code && err.code.startsWith('P')) {
    error.message = handlePrismaError(err);
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `${field} already exists`;
    error.statusCode = HTTP_STATUS.CONFLICT;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(e => e.message).join(', ');
    error.statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
  }

  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Handle Prisma errors
 */
const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      // Unique constraint violation
      const target = err.meta?.target || 'Field';
      return `${target} already exists`;
    case 'P2025':
      // Record not found
      return 'Record not found';
    case 'P2003':
      // Foreign key constraint failed
      return 'Related record not found';
    case 'P2014':
      // Invalid relation
      return 'Invalid relation data';
    default:
      return 'Database operation failed';
  }
};

/**
 * Not found handler
 */
const notFound = (req, res, next) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFound };
