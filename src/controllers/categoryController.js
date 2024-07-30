const { validationResult } = require('express-validator');
const CategoryModel = require('../models/categoryModel');
const categoryModel = new CategoryModel();

// Function to create Quiz Category
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
};// Function to handle fetch all Quiz categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

// Function to delete a Quiz Category
const deleteCategory = async (req, res, next) => {
    const { category_id } = req.params;

    try {
        const category = await categoryModel.deleteCategory(category_id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Export the functions to be used in routes

module.exports = {
    createQuizCategory,
    getAllCategories,
    deleteCategory

};
