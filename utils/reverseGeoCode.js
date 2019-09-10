"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maps_1 = require("@google/maps");
var googleMapsClient = maps_1.createClient({
    key: "AIzaSyBI7Rad8slJbP0_wbjmbClKOMFMSdlbj0I"
});
function getLocation(addr) {
    return new Promise(function (resolve, reject) {
        googleMapsClient.geocode({
            address: addr
        }, function (err, response) {
            if (err) {
                reject(err);
            }
            var address_component_array = response.json.results[0].address_components;
            var postal_code = "";
            address_component_array.forEach(function (element) {
                if (element.types[0] == 'postal_code') {
                    postal_code = element.long_name;
                }
            });
            var result = {
                cordinates: response.json.results[0].geometry.location,
                post_code: postal_code
            };
            resolve(result);
        });
    });
}
;
// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")
module.exports = getLocation;
exports.default = getLocation;
