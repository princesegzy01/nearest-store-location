import express from "express";
import _ from "lodash";
import dataStore from "../data-source/source";
import distanceCalculator from "../utils/distanceCalculator";
import geoCode from "../utils/reverseGeoCode";

const router = express.Router();

// storeLocation will store all
// strore locations available to query
let storeLocation: Store[];

// extract zipcodes only from all store locations
// this will make it easier to get closest stores to a zip code
let zipCodes: number[];

// Load the store location to the server memeory
dataStore().then((res: Store[]) => {
	storeLocation = res;

	// get zip code only
	zipCodes = _.map(storeLocation, "zip");
});

/* GET home page. */
router.get("/", (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	// res.render("index", { title: "Express" });
	res.status(200).json({ status: "done" });
});

/* GET closest route. */
router.get("/closest", async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	// create a variable for search value
	let queryValue = "";

	// get the zip query string from the user request
	if (req.query.zip) {
		queryValue = req.query.zip;
	}

	// get the address string of the user request
	if (req.query.address) {
		queryValue = decodeURIComponent(req.query.address);
	}

	// return 400 error if
	// query mode is not specify
	if (queryValue === "") {
		res.status(400)
			.json({ error: "Bad request, supply zip or address" })
			.end();
	}

	// create unit of measurement variable
	let units = "mi";

	// if user seupply mi
	// set the unit of measurement to miles
	if (req.query.units === "mi") {
		units = "mi";
	}

	// if user supply km
	// set the unit of measurement to km
	if (req.query.units === "km") {
		units = "km";
	}

	// if the user supply neither mi or km
	// throw an error back to the user
	if (req.query.units !== undefined && (req.query.units !== "mi" && req.query.units !== "km") ) {
		res.status(400)
			.json({ error: "Invalid units of measurement" })
			.end();
	}

	// get the geolocation of the given address or zip
	geoCode(queryValue)
		.then((location: Location) => {
			
			// set an infinity number to hold closest zip
			let distanceMeasure = Number.POSITIVE_INFINITY;
			let closestStoreToZip;


			// loop through each store and calculate the distance
			// between the store and the given zip/address cordinates
			storeLocation.forEach((store, index, arr) => {
				let distance = distanceCalculator(
					location.cordinates.lat,
					location.cordinates.lng,
					store.Latitude,
					store.Longitude,
					units,
				);
				distance = Number(distance)

				// get the lowest distance 
				// and return it as the closest store
				if(distance < distanceMeasure) {
					distanceMeasure = distance;
					closestStoreToZip = store
				}
			});
			
			// construct a closestStore object that will contains
			// 1. closest store to zip
			// 2. the current location of the address
			// 3. distance betweent the store and the user address
			const closestStore = {
				store: closestStoreToZip,
				currentLocation: location,
				distance: {
					distance: distanceMeasure,
					unit: units,
				},
			};

			// return the closestStore object
			res.status(200)
				.json({ status: closestStore })
				.end();
		})
		.catch((err: Error) => {
			console.log("error occoured : ", err);
			res.status(200)
				.json({ status: err })
				.end();
		});
});

module.exports = router;
