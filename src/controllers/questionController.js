// Import validationResult from express-validator to handle validation results
const { validationResult } = require('express-validator');

// Import the QuestionModel class from its file
const QuestionModel = require('../models/questionModel');

// Instantiate the QuestionModel to use its methods
const questionModel = new QuestionModel();

// Function to handle creating a new question along with its options
const createQuestion = async (req, res, next) => {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        // Return a response with validation errors
        return res.status(400).json({ success: false, message: errorMessage });
    }

    // Extract category_id, question_text, and options from the request body
    const { category_id, question_text, options } = req.body;

    try {
        // Create a new question and get the question object
        const question = await questionModel.createQuestion(category_id, question_text);

        // Map over the options array to create promises for each option
        const optionPromises = options.map(option =>
            questionModel.createOption(question.id, option.option_text, option.is_correct)
        );

        // Wait for all option creation promises to resolve
        const optionResults = await Promise.all(optionPromises);

        // Send a response with the created question and its options
        res.status(201).json({ ...question, options: optionResults });
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
};

// Function to handle fetching all questions
const fetchQuestions = async (req, res, next) => {
    try {
        // Fetch all questions from the database
        const questions = await questionModel.fetchQuestions();
        // Send the fetched questions as a response
        res.json(questions);
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
};

// Function to handle deleting a question by its ID
const deleteQuestion = async (req, res, next) => {
    // Extract question ID from the request parameters
    const { id } = req.params;

    try {
        // Delete the question by its ID
        const result = await questionModel.deleteQuestionById(id);
        // Send a response with the result of the deletion
        res.status(200).json(result);
    } catch (error) {
        // Pass any errors to the next middleware
        next(error);
    }
};

// Export the functions to be used in routes
module.exports = {
    createQuestion,
    fetchQuestions,
    deleteQuestion
};
