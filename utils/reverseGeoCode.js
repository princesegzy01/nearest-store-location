"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maps_1 = require("@google/maps");
var googleMapsClient = maps_1.createClient({
    key: "AIzaSyBI7Rad8slJbP0_wbjmbClKOMFMSdlbj0I"
});
// function getLocation(addr:string){
//   // try {
//    return  googleMapsClient.geocode({
//       // address: '1600 Amphitheatre Parkway, Mountain View, CA'
//       // address: '74112-6221'
//       // address : '1600%20Amphitheatre%20Parkway%2C%20Mountain%20View%2C%20CA'
//       address:addr
//     }, function(err, response) {
//       if (err) {
//         console.log(err)
//         return null;
//       } 
//       // console.log(response.json.results[0]);
//       // console.log(response.json.results[0].geometry.location);
//       return response.json.results[0].geometry.location
//     });
//   // } catch (error) {
//   //   console.log(" <<<<<<<<<<<<<<<<<< " , error)
//   //   return null
//   // }
// }
// x.then(res =>{
//   console.log("<<>> ", res)
// })
// ( async() => {
//   let x = await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")
//   console.log(x);
// })()
function getLocation(addr) {
    return new Promise(function (resolve, reject) {
        googleMapsClient.geocode({
            // address: '1600 Amphitheatre Parkway, Mountain View, CA'
            // address: '74112-6221'
            // address : '1600%20Amphitheatre%20Parkway%2C%20Mountain%20View%2C%20CA'
            address: addr
        }, function (err, response) {
            if (err) {
                // console.log(err)
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
            // resolve (response.json.results[0])
            resolve(result);
        });
    });
}
;
// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")
module.exports = getLocation;
exports.default = getLocation;
