// Type definitions for express-validator-on-validation-error
// Project: https://github.com/dyong0/express-validator-on-validation-error
// Definitions by: Lee Junyong <https://github.com/dyong0>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

///<reference types="express"/>
///<reference types="express-validator"/>

import * as express from 'express';
import * as expressValidator from 'express-validator';
import { Result } from 'express-validator/check';

declare namespace e {
    type ValidationErrorHandler = (errors: Result, req: express.Request, res: express.Response, next: express.NextFunction) => void;

    function onValidationError(validationErrorHandler: ValidationErrorHandler): express.RequestHandler
    function redirectOnValidationError(toUrl: String): express.RequestHandler
}

export = e;