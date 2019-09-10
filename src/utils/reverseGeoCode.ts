import { createClient } from "@google/maps";
import _ from "lodash";


	
// get the key from enviroment variable
const authKey: string = process.env.KEY || "";

// create a googleMap client object
const googleMapsClient = createClient({
	key: authKey,
});

// getlocation function takes in an address or a zip as inpuy
// then return a cordianates with a postcode as output
const getLocation = (addr: string) => {
	return new Promise((resolve, reject) => {

		// use the geocode methode to get cordinates
		googleMapsClient.geocode(
			{
				address: addr,
			},
			(err, response) => {
				if (err) {
					reject(err);
				}

				// store the addres component object
				// to retrieve the postal code
				const addressComponentArray =
					response.json.results[0].address_components;

				let postalCode = "";

				// loop through the array to get the postcode
				// from the nodes
				addressComponentArray.forEach((address) => {
					if (address.types[0] === "postal_code") {
						postalCode = address.long_name;
					}
				});

				// construct a result object to be retun to the caller which includes
				// 1. cordinates of a given zip or address
				// 2. postal codes of the cordinares
				const result = {
					cordinates: response.json.results[0].geometry.location,
					post_code: postalCode,
				};

				// return the result as a promise
				resolve(result);
			},
		);
	});
};

// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")

module.exports = getLocation;
export default getLocation;
