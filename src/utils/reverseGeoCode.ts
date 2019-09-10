import { createClient } from "@google/maps";
import _ from "lodash";

const googleMapsClient = createClient({
	key: "AIzaSyBI7Rad8slJbP0_wbjmbClKOMFMSdlbj0I",
});

const getLocation = (addr: string) => {
	return new Promise((resolve, reject) => {
		googleMapsClient.geocode(
			{
				address: addr,
			},
			(err, response) => {
				if (err) {
					reject(err);
				}

				const addressComponentArray =
					response.json.results[0].address_components;

				let postalCode = "";
				addressComponentArray.forEach((address) => {
					if (address.types[0] === "postal_code") {
						postalCode = address.long_name;
					}
				});

				const result = {
					cordinates: response.json.results[0].geometry.location,
					post_code: postalCode,
				};

				resolve(result);
			},
		);
	});
};

// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")

module.exports = getLocation;
export default getLocation;
