// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Register route
router.post('/register', registerUser); // /api/users/register

// Login route
router.post('/login', loginUser); // /api/users/login

module.exports = router;
