"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maps_1 = require("@google/maps");
// create a googleMap client object
var googleMapsClient = maps_1.createClient({
    key: "AIzaSyBI7Rad8slJbP0_wbjmbClKOMFMSdlbj0I",
});
// getlocation function takes in an address or a zip as inpuy
// then return a cordianates with a postcode as output
var getLocation = function (addr) {
    return new Promise(function (resolve, reject) {
        // use the geocode methode to get cordinates
        googleMapsClient.geocode({
            address: addr,
        }, function (err, response) {
            if (err) {
                reject(err);
            }
            // store the addres component object
            // to retrieve the postal code
            var addressComponentArray = response.json.results[0].address_components;
            var postalCode = "";
            // loop through the array to get the postcode
            // from the nodes
            addressComponentArray.forEach(function (address) {
                if (address.types[0] === "postal_code") {
                    postalCode = address.long_name;
                }
            });
            // construct a result object to be retun to the caller which includes
            // 1. cordinates of a given zip or address
            // 2. postal codes of the cordinares
            var result = {
                cordinates: response.json.results[0].geometry.location,
                post_code: postalCode,
            };
            // return the result as a promise
            resolve(result);
        });
    });
};
// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")
module.exports = getLocation;
exports.default = getLocation;
