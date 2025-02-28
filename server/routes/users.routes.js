// Require express
const express = require('express');
const router = express.Router();

// Require the controller
const usersController = require('../controllers/users.controller');

// Define the routes
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

// Export the routes
module.exports = router;