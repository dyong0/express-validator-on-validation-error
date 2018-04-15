const express = require('express');
const request = require('supertest');
const {expect} = require('chai');

const { param, query, body } = require('express-validator/check');
const onValidationError = require('../lib/onValidationError');

describe('onValidationError', () => {
    let app;
    beforeEach(() => {
        app = express();

        app.get('/validate', [
            query('testInt').isInt(),
            onValidationError((validationErrors, req, res, next) => {
                res.sendStatus(400);
            })
        ], (req, res) => {
            res.sendStatus(200);
        });

        app.get('/indrectEcho', [
            query('testInt').isInt(),
            onValidationError((validationErrors, req, res, next) => {
                res.locals = {
                    valuePassed : req.query.testInt
                };
                next();
            })
        ], (req, res) => {
            res.status(200).send(res.locals.valuePassed);
        });
    });

    it('bypasses to the next middleware for no validation error', async () => {
        await request(app).get('/validate?testInt=1').expect(200);
    });

    it('handles validation errors', async () => {
        await request(app).get('/validate?testInt=foo').expect(400);
    });

    it('allows to pass the request to the next middleware for validation error', async () => {
        const repsonse = await request(app).get('/indrectEcho?testInt=checkIt');

        expect(repsonse.statusCode).to.eq(200);
        expect(repsonse.text).to.eq('checkIt');
    });
})