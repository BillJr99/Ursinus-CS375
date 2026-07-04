// routes/authRoutes.js -- maps auth URLs to controller functions.
//
// A route file answers exactly one question: "which controller function
// handles which URL and HTTP verb?"  Nothing else belongs here.

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
