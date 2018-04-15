const { validationResult } = require('express-validator/check');

/**
 *
 * @param {ValidationErrorHandler} validationErrorHandler
 */
module.exports = (validationErrorHandler) => {
    return (req, res, next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            next();
            return;
        }

        validationErrorHandler(errors, req, res, next);
    };
};