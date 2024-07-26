const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const answerController = require('../controllers/answerController');
const authController = require('../controllers/authController');


router.post(
    '/submit',
    body('user_id').isInt().withMessage('User ID is required and must be an integer.'),
    body('question_id').isInt().withMessage('Question ID is required and must be an integer.'),
    body('option_id').isInt().withMessage('Option ID is required and must be an integer.'),
    authController.authenticateToken, answerController.submitAnswer
);

router.get('/:user_id', authController.authenticateToken, answerController.fetchUserAnswers);

module.exports = router;
