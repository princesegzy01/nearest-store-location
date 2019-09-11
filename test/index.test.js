"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');
var sinon_1 = __importDefault(require("sinon"));
describe('Unit testing the index route', function () {
    var server;
    var fakeServer;
    beforeEach(function () {
        server = require("../bin/www");
        fakeServer = sinon_1.default.fakeServer.create();
    });
    afterEach(function () {
        server.close();
        fakeServer.restore();
    });
    function once(fn) {
        var returnValue, called = false;
        return function () {
            if (!called) {
                called = true;
                returnValue = fn.apply(this, arguments);
            }
            return returnValue;
        };
    }
    it('should return OK status', function () {
        return request(app)
            .get('/')
            .then(function (response) {
            expect(response.status).to.equal(200);
        });
    });
    it('should return 400 Bad request if zip or address is not set', function () {
        var url = "/closest";
        return request(app)
            .get(url)
            .then(function (response) {
            expect(response.status).to.equal(400);
            expect(JSON.parse(response.text).error).to.equal("Bad request, supply zip or address");
        });
    });
    it('should return 400 with wrong unit', function () {
        var url = "/closest?zip=01035&units=kl";
        return request(app)
            .get(url)
            .then(function (response) {
            expect(response.status).to.equal(400);
            expect(JSON.parse(response.text).error).to.equal("Invalid units of measurement");
        });
    });
});
