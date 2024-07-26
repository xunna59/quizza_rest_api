// Import necessary modules and functions
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router(); // Create a new router instance
const questionController = require('../controllers/questionController'); // Import the question controller
const authController = require('../controllers/authController'); // Import the authentication controller

// Route to create a new question
router.post(
    '/',
    // Validate and sanitize request body
    body('category_id').isInt().withMessage('Category ID is required and must be an integer.'),
    body('question_text').notEmpty().withMessage('Question Text is required.'),
    body('options').isArray({ min: 2 }).withMessage('At least two options are required.'),
    body('options.*.option_text').notEmpty().withMessage('Option Text is required.'),
    body('options.*.is_correct').isBoolean().withMessage('Is Correct must be a boolean.'),
    // Authenticate the request
    authController.authenticateToken,
    // Call the controller method to handle question creation
    questionController.createQuestion
);

// Route to fetch all questions
router.get('/',
    // Authenticate the request
    authController.authenticateToken,
    // Call the controller method to fetch questions
    questionController.fetchQuestions
);

// Route to delete a specific question by its ID
router.delete('/:id',
    // Validate and sanitize the question ID parameter
    param('id').isInt().withMessage('Question ID must be an integer.'),
    // Call the controller method to handle question deletion
    questionController.deleteQuestion
);

// Export the router to be used in other parts of the application
module.exports = router;
