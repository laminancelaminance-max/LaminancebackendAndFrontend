const { body } = require('express-validator');

const contactValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    
     body('email')
    .optional({ checkFalsy: true }) // 👈 EMAIL OPTIONAL
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
    
    body('subject')
      .trim()
      .notEmpty().withMessage('Subject is required')
      .isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
    
    body('message')
      .trim()
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 5, max: 5000 }).withMessage('Message must be between 5 and 5000 characters'),
    
    body('sendCopy')
      .optional()
      .isBoolean().withMessage('sendCopy must be a boolean value')
  ];
};

module.exports = { contactValidationRules };