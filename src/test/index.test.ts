import sinon from "sinon";
import request from "supertest";
const app = require("../app");
const expect = require("chai").expect;

describe("Unit testing the index route", () => {
	let server: any;
	let fakeServer: any;
	beforeEach(() => {
		server = require("../bin/www");
		fakeServer = sinon.fakeServer.create();
	});
	afterEach(() => {
		server.close();
		fakeServer.restore();
	});

	it("should return OK status", () => {
		return request(app)
			.get("/")
			.then((response: any) => {
				expect(response.status).to.equal(200);
			});
	});

	it("should return 400 Bad request if zip or address is not set", () => {
		const url = "/closest";
		return request(app)
			.get(url)
			.then((response: any) => {
				expect(response.status).to.equal(400);
				expect(JSON.parse(response.text).error).to.equal(
					"Bad request, supply zip or address",
				);
			});
	});

	it("should return 400 with wrong unit", () => {
		const url = "/closest?zip=01035&units=kl";
		return request(app)
			.get(url)
			.then((response: any) => {
				expect(response.status).to.equal(400);
				expect(JSON.parse(response.text).error).to.equal(
					"Invalid units of measurement",
				);
			});
	});
});
