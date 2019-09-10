const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
import express from "express";
import sinon from "sinon";

describe('Unit testing the index route', function() {

	var server: any;
	var fakeServer: any;
    beforeEach(function () {
		  server = require("../bin/www");
		  fakeServer = sinon.fakeServer.create(); 
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
	
	

    it('should return OK status', function() {
		return request(app)
			.get('/')
			.then(function(response: express.Response){
				expect(response.status).to.equal(200)
		})
    });

    it('should return 400 Bad request if zip or address is not set', function() {
        let url = "/closest"
      return request(app)
        .get(url)
        .then(function(response: express.Response){
			expect(response.status).to.equal(400)
			expect(JSON.parse(response.text).error).to.equal("Bad request, supply zip or address")
        })
	});
	
	it('should return 400 with wrong unit', function() {
        let url = "/closest?zip=01035&units=kl"
      return request(app)
        .get(url)
        .then(function(response: express.Response){
			expect(response.status).to.equal(400)
			expect(JSON.parse(response.text).error).to.equal("Invalid units of measurement")
        })
	});



});