import binarySearch from "../../utils/binarySearch";
const expect = require("chai").expect;

describe("Unit testing binarySearch Module", () => {
	it("Should return first element and its index", () => {
		const arrayData: number[] = [17];
		const target: number = 8;
		const result: Number[] = [17, 0];
		const response = binarySearch(arrayData, target);

		expect(response).to.deep.equal(result);
		expect(response).to.be.an("array");
	});

	it("Should return negative element for empty array", () => {
		const arrayData: number[] = [];
		const target: number = 8;
		const result: Number[] = [-1, -1];
		const response = binarySearch(arrayData, target);

		expect(response).to.deep.equal(result);
		expect(response).to.be.an("array");
	});

	it("should return the first element and index 0", () => {
		const arrayData: number[] = [12, 13, 17, 25, 40];
		const target: number = 9;
		const result: Number[] = [12, 0];
		const response = binarySearch(arrayData, target);

		expect(response).to.deep.equal(result);
		expect(response).to.be.an("array");
	});

	it("should return the last element and index", () => {
		const arrayData: number[] = [1, 2, 5, 8, 12, 13, 17, 25, 40];
		const target: number = 63;
		const result: Number[] = [40, 8];
		const response = binarySearch(arrayData, target);

		expect(response).to.deep.equal(result);
		expect(response).to.be.an("array");
	});

	it("should return a valid element and index", () => {
		const arrayData: number[] = [1, 2, 5, 8, 12, 13, 17, 25, 40];
		const target: number = 30;
		const result: Number[] = [25, 7];
		const response = binarySearch(arrayData, target);

		expect(response).to.deep.equal(result);
		expect(response).to.be.an("array");
	});
});
