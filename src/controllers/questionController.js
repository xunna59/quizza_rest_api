const { validationResult } = require('express-validator');
const QuestionModel = require('../models/questionModel');
const questionModel = new QuestionModel();

const createQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }

    const { category_id, question_text, options } = req.body;

    try {
        const question = await questionModel.createQuestion(category_id, question_text);

        const optionsPromises = options.map(option =>
            questionModel.createOption(question.id, option.option_text, option.is_correct)
        );

        await Promise.all(optionsPromises);

        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
};

const fetchQuestions = async (req, res, next) => {
    try {
        const questions = await questionModel.fetchQuestions();
        res.json(questions);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuestion,
    fetchQuestions,
};
