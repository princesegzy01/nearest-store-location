import express from 'express';
var router = express.Router();
import _ from 'lodash';
import dataStore from '../data-source/source';


const geoCode  = require("../utils/reverseGeoCode")
const binarySearchClosest = require("../utils/binarySearch")

const distanceCalculator = require("../utils/distanceCalculator")

const csv = require('csvtojson')

// store_location will store all 
// strore locations available to query
let store_location: Array<Store>;



// extract zipcodes only from all store locations
// this will make it easier to get closest stores to a zip code
// let zip_codes = _.map(store_location, 'zip');
let zip_codes: Array<number>;

// Load the store location to the server memeory
dataStore().then((res: Array<Store>) => {
  store_location = res;

  // get zip code only
  zip_codes = _.map(store_location, 'zip');
})



/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({status : 'done' })
});

/* GET closest route. */
router.get('/closest', async function(req: express.Request, res: express.Response, next: express.NextFunction) {

  // create a variable for search value
  let query_value = ""

  // get the zip query string from the user request
  if(req.query.zip){
    query_value = req.query.zip;
  }

  //get the address string of the user request
  if(req.query.address){
    query_value = decodeURIComponent(req.query.address);
  }

  // return 400 error if 
  // query mode is not specify
  if(query_value === ""){
    res.status(400).json({ 'status' : 'Bad request, supply zip or address'}).end();
  }

  // create unit of measurement variable
  let units = "mi";

  // if user seupply mi
  //set the unit of measurement to miles
  if(req.query.units == "mi"){
    units = "mi";
  }
  
  // if user supply km
  // set the unit of measurement to km
  if(req.query.units == "km"){
    units = "km";
  }

  // if the user supply neither mi or km
  // throw an error back to the user
  if(req.query.units != "mi"  &&  req.query.units != "km"){
    res.status(400).json({ 'status' : 'Invalid units of measurement'}).end();
  }
  
  // get the geolocation of the given address or zip
  geoCode(query_value).then((location: Location) => {
  
  // replace - with . so that it can easily check the closest 
  // store from the array of zip avaialable from our dataset
  const zip_query_update = location.post_code.replace('-', '.')

  // get the closest store location to a given zip code
  // by using binary search algorithm to get closes zip code
  let closest_zip = binarySearchClosest(zip_codes, zip_query_update);

  const closest_store_to_zip = store_location[closest_zip[1]];

  let distance = distanceCalculator(location.cordinates.lat,location.cordinates.lng, closest_store_to_zip.Latitude, closest_store_to_zip.Longitude, units)

    const closest_store = {
      store : closest_store_to_zip,
      currentLocation: location,
      distance : {
        distance: distance,
        unit: units
      }
    }
    res.status(200).json({ status: closest_store }).end()
  }).catch((err: Error) => {
    console.log("error occoured : ", err)
    res.status(200).json({status  : err}).end()
  });
 
});


module.exports = router;
