const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
// const { authenticateToken } = require('../controllers/authController');


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

router.get('/profile', authController.authenticateToken, (req, res) => {
    res.json({
        id: req.user.userId,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
    });
});



module.exports = router;