const onValidationError = require('./onValidationError');

/**
 *
 * @param {String} toUrl
 */
module.exports = (toUrl) => onValidationError((validationErrors, req, res) => {
    res.redirect(toUrl);
});