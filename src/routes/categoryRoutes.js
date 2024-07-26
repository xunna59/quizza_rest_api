const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');


router.get('/', authController.authenticateToken, categoryController.getAllCategories);

router.post('/',
    body('category_name').notEmpty().withMessage('Category Name is required.'),

    authController.authenticateToken, categoryController.createQuizCategory
);


module.exports = router;