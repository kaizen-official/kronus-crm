const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../config/constants');
const validate = require('../middleware/validate');
const { updateProfileValidation, idValidation, registerValidation } = require('../utils/validationRules');

// User profile routes (accessible by authenticated users)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidation, validate, updateProfile);

// User management routes (accessible by Admin and Manager)
router.get('/stats', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER), getUserStats);
router.get('/', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER), getUsers);
router.get('/:id', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER), idValidation, validate, getUserById);

// Admin-only routes
router.post('/', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), registerValidation, validate, createUser);
router.put('/:id', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), idValidation, validate, updateUser);
router.delete('/:id', protect, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), idValidation, validate, deleteUser);

module.exports = router;
