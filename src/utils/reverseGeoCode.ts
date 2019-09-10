
import { createClient } from "@google/maps"
import _ from 'lodash';

const googleMapsClient = createClient({
  key: "AIzaSyBI7Rad8slJbP0_wbjmbClKOMFMSdlbj0I"
});


function getLocation(addr:string) {
  return new Promise((resolve, reject) => {

      googleMapsClient.geocode({
            address:addr
          }, function(err, response) {
            if (err) {
              reject (err);
            } 

            const address_component_array =  response.json.results[0].address_components;

            let postal_code = "";
            address_component_array.forEach(element => {
                if(element.types[0] == 'postal_code'){
                  postal_code = element.long_name;
                }
            });
            
            const result = {
              cordinates : response.json.results[0].geometry.location,
              post_code : postal_code
            }

            resolve (result)

          });
   }
 );
};




// await getLocation("1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA")

module.exports = getLocation;
export default getLocation;
