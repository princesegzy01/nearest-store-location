"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var binarySearch_1 = __importDefault(require("../../utils/binarySearch"));
var expect = require("chai").expect;
describe("Unit testing binarySearch Module", function () {
    it("Should return first element and its index", function () {
        var arrayData = [17];
        var target = 8;
        var result = [17, 0];
        var response = binarySearch_1.default(arrayData, target);
        expect(response).to.deep.equal(result);
        expect(response).to.be.an("array");
    });
    it("Should return negative element for empty array", function () {
        var arrayData = [];
        var target = 8;
        var result = [-1, -1];
        var response = binarySearch_1.default(arrayData, target);
        expect(response).to.deep.equal(result);
        expect(response).to.be.an("array");
    });
    it("should return the first element and index 0", function () {
        var arrayData = [12, 13, 17, 25, 40];
        var target = 9;
        var result = [12, 0];
        var response = binarySearch_1.default(arrayData, target);
        expect(response).to.deep.equal(result);
        expect(response).to.be.an("array");
    });
    it("should return the last element and index", function () {
        var arrayData = [1, 2, 5, 8, 12, 13, 17, 25, 40];
        var target = 63;
        var result = [40, 8];
        var response = binarySearch_1.default(arrayData, target);
        expect(response).to.deep.equal(result);
        expect(response).to.be.an("array");
    });
    it("should return a valid element and index", function () {
        var arrayData = [1, 2, 5, 8, 12, 13, 17, 25, 40];
        var target = 30;
        var result = [25, 7];
        var response = binarySearch_1.default(arrayData, target);
        expect(response).to.deep.equal(result);
        expect(response).to.be.an("array");
    });
});
