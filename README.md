# express-validator-on-validation-error

It's a middleware that handles validation errors.
An [express.js]( https://github.com/visionmedia/express ) middleware for
[express-validator]( https://github.com/ctavan/express-validator ).

- [Installation](#installation)
- [Usage](#usage)
- [Lisence](#lisence)

## Installation
```
npm install express-validator-on-validation-error
```

## Usage
```javascript
const { param, query, body } = require('express-validator/check');
const { onValidationError, redirectOnValidationError } = require('express-validator-on-validation-error');

app.get('/validate', [
    query('testInt').isInt(),

    // Set validation error handler
    // It must be after all validators from express-validator
    onValidationError((validationErrors, req, res, next) => {
        res.sendStatus(400);
    })
], (req, res) => {
    res.sendStatus(200);
});

app.get('/passToNextRequestHandler', [
    query('testInt').isInt(),

    // Call next() to pass the request to the next request handler
    onValidationError((validationErrors, req, res, next) => {
        // process for validationErrors
        res.locals = {
            valuePassed: req.query.testInt
        };

        // pass this request to the next request handler
        next();
    })
], (req, res) => {
    res.status(200).send(res.locals.valuePassed);
});

app.get('/redirectOnValidationError', [
    query('testInt').isInt(),

    // Redirect to Google on validation error for finding a solution :)
    redirectOnValidationError('https://google.com')
], (req, res) => {
    res.sendStatus(200);
});
```

## License
MIT License