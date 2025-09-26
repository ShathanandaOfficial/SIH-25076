const { validationResult } = require('express-validator');

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(error => ({
                field: error.path,
                message: error.msg,
                value: error.value
            }))
        });
    }
    
    next();
};

// Common validation rules
const { body, param, query } = require('express-validator');

const userValidation = {
    register: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('role')
            .optional()
            .isIn(['farmer', 'officer', 'admin'])
            .withMessage('Invalid role')
    ],
    login: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ]
};

const queryValidation = {
    create: [
        body('queryText')
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage('Query text must be between 10 and 1000 characters'),
        body('queryType')
            .isIn(['crop_advisory', 'pest_control', 'weather', 'fertilizer', 'general'])
            .withMessage('Invalid query type'),
        body('priority')
            .optional()
            .isIn(['low', 'medium', 'high', 'urgent'])
            .withMessage('Invalid priority level')
    ]
};

module.exports = {
    handleValidationErrors,
    userValidation,
    queryValidation
};