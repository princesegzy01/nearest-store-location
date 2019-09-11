import distanceCalculator from "../../utils/distanceCalculator";
const expect = require("chai").expect;

describe("Unit testing distance calculator Module", () => {

	it("Should return Latitude 1 error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator("0.3466",0.25748,-0.567643,0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Latitude 1 must be a number");
    });
    
    it("Should return Longitude 1 error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,"0.3466",-0.567643,0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Longitude 1 must be a number");
    });

    it("Should return Latitude 2 error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,"0.3466",0.25455, "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Latitude 2 must be a number");
    });
    
    it("Should return Longitude 2 error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,0.25455,"0.3466", "mi");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Longitude 2 must be a number");
    });

    it("Should return unit type error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,0.25455,0.3466, 2);
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Unit must be of a type string");
    });

    it("Should return unit value error",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,0.25455,0.3466, "kl");
        expect(response).to.be.an("error");
        expect(response.message).to.equal("Unit must be either mi or km");
	});
	
	it("Should return 0 for same cordinates",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,0.25748,-0.567643, "km");
		expect(response).to.be.a("number");
		expect(response).to.equal(0);
    });


	it("Should return a valid distance",  () => {
        // @ts-ignore
		const response: any = distanceCalculator(0.25748,-0.567643,0.25455,0.3466, "km");
        expect(response).to.be.a("number");
    });

})