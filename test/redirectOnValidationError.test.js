const express = require('express');
const request = require('supertest');
const {expect} = require('chai');

const { param, query, body } = require('express-validator/check');
const redirectOnValidationError = require('../lib/redirectOnValidationError');

describe('redirectOnValidationError', () => {
    let app;
    beforeEach(() => {
        app = express();

        app.get('/from', [
            query('testInt').isInt(),
            redirectOnValidationError('/to')
        ], (req, res) => {
            res.sendStatus(200);
        });
    });

    it('bypasses to the next middleware for no validation errors', async () => {
        await request(app).get('/from?testInt=1').expect(200);
    });

    it('redirects on validation error', async () => {
        const response = await request(app).get('/from?testInt=foo');

        expect(response.headers.location).to.eq('/to');
    });
})