const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { JWT_SECRET } = require('../config/config');
const UserModel = require('../models/userModel');
const userModel = new UserModel();


// This function handles creating a new user
const register = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await userModel.createUser(first_name, last_name, email, hashedPassword);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};


// This function handles User Login
const login = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation

    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid Login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Login credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = {
    register,
    login,
    authenticateToken,
};
