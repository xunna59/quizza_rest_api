const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post(
    '/',
    body('category_id').isInt().withMessage('Category ID is required and must be an integer.'),
    body('question_text').notEmpty().withMessage('Question Text is required.'),
    body('options').isArray({ min: 2 }).withMessage('At least two options are required.'),
    body('options.*.option_text').notEmpty().withMessage('Option Text is required.'),
    body('options.*.is_correct').isBoolean().withMessage('Is Correct must be a boolean.'),
    questionController.createQuestion
);

router.get('/', questionController.fetchQuestions);

module.exports = router;
