const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');


// POST /users - Create a new user
router.post('/register',
    body('first_name').notEmpty().withMessage('First Name is required.'),
    body('last_name').notEmpty().withMessage('Last Name is required.'),
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    authController.register
);

router.post('/login',
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    authController.login
);











module.exports = router;