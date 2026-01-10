const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const transactionRoutes = require('./transactionRoutes');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.use('/transactions', transactionRoutes);

module.exports = router;
