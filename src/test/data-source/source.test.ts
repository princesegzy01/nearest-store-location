import dataSource from "../../data-source/source";
const expect = require("chai").expect;

describe("Unit testing datasource Module", () => {

	it("Should return an array", async () => {

		const response = await dataSource();
        expect(response).to.not.be.empty;
        expect(response).to.be.an("array");
        
	});
})