// Import validationResult from express-validator to handle validation results
const { validationResult } = require('express-validator');

// Import the AnswerModel and QuestionModel classes from their respective files
const AnswerModel = require('../models/answerModel');
const QuestionModel = require('../models/questionModel');

// Instantiate the models to use their methods
const answerModel = new AnswerModel();
const questionModel = new QuestionModel();

// Function to handle submitting an answer
const submitAnswer = async (req, res, next) => {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    // Extract user_id, question_id, and option_id from the request body
    const { user_id, question_id, option_id } = req.body;

    try {
        // Validate if the question ID is valid
        const question = await questionModel.fetchQuestionById(question_id);
        if (!question) {
            return res.status(400).json({ success: false, message: 'Invalid question ID.' });
        }

        // Validate if the option ID is valid and matches the question ID
        const option = await questionModel.fetchOptionById(option_id);
        if (!option || option.question_id !== question_id) {
            return res.status(400).json({ success: false, message: 'Invalid option ID for the given question.' });
        }

        // Create a new user answer and send the response with the created answer
        const userAnswer = await answerModel.createUserAnswer(user_id, question_id, option_id);
        res.status(201).json(userAnswer);
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
};

// Function to handle fetching all answers for a specific user
const fetchUserAnswers = async (req, res, next) => {
    // Extract user_id from the request parameters
    const { user_id } = req.params;

    try {
        // Fetch user answers using the user_id
        const userAnswers = await answerModel.fetchUserAnswers(user_id);
        // Send the response with the fetched user answers
        res.json(userAnswers);
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
};

// Export the functions to be used in routes
module.exports = {
    submitAnswer,
    fetchUserAnswers,
};
