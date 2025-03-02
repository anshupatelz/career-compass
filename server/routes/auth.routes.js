// Require express
const express = require('express');
const router = express.Router();

// Require the controller
const authController = require('../controllers/auth.controller');

// Define the routes
router.get('/logout', authController.logout);
router.get('/forgot-password', authController.forgotPassword);
router.get('/resend-verification-email', authController.resendVerificationEmail);
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

// Export the routes
module.exports = router;