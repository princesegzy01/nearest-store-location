"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var distanceCalculator_1 = __importDefault(require("../../utils/distanceCalculator"));
var expect = require("chai").expect;
describe("Unit testing distance calculator Module", function () {
    it("Should return Latitude 1 error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default("0.3466", 0.25748, -0.567643, 0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Latitude 1 must be a number");
    });
    it("Should return Longitude 1 error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, "0.3466", -0.567643, 0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Longitude 1 must be a number");
    });
    it("Should return Latitude 2 error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, "0.3466", 0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Latitude 2 must be a number");
    });
    it("Should return Longitude 2 error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, 0.25455, "0.3466", "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Longitude 2 must be a number");
    });
    it("Should return unit type error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, 0.25455, 0.3466, 2);
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Unit must be of a type string");
    });
    it("Should return unit value error", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, 0.25455, 0.3466, "kl");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Unit must be either mi or km");
    });
    it("Should return 0 for same cordinates", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, 0.25748, -0.567643, "km");
        expect(response).to.be.a("number");
        expect(response).to.equal(0);
    });
    it("Should return a valid distance", function () {
        // @ts-ignore
        var response = distanceCalculator_1.default(0.25748, -0.567643, 0.25455, 0.3466, "km");
        expect(response).to.be.a("number");
    });
});
