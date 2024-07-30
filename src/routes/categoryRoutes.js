const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');


router.get('/', categoryController.getAllCategories);

router.post('/',
    body('category_name').notEmpty().withMessage('Category Name is required.'),

   categoryController.createQuizCategory
);

router.delete('/:category_id',
    param('category_id').isInt().withMessage('Category ID must be an integer.'),
    categoryController.deleteCategory
);


module.exports = router;
