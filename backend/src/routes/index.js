const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const transactionRoutes = require('./transactionRoutes');

// Profile routes
router.get('/profiles', authController.getProfiles);
router.post('/profiles', authController.createProfile);

router.use('/transactions', transactionRoutes);

module.exports = router;
