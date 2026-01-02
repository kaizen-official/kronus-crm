const express = require('express');
const router = express.Router();
const {
  // register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/security');
const validate = require('../middleware/validate');
const {
  // registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require('../utils/validationRules');

// Public routes with rate limiting
// router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/forgot-password', authLimiter, forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password/:token', authLimiter, resetPasswordValidation, validate, resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);
router.post('/logout', protect, logout);

module.exports = router;
