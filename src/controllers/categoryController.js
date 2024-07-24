const { validationResult } = require('express-validator');
const CategoryModel = require('../models/categoryModel');
const categoryModel = new CategoryModel();


const createQuizCategory = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { category_name } = req.body;

    try {
        const category = await categoryModel.createCategory(category_name);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createQuizCategory,
    getAllCategories

};