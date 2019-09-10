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
let store_location = [];



// extract zipcodes only from all store locations
// this will make it easier to get closest stores to a zip code
// let zip_codes = _.map(store_location, 'zip');
let zip_codes;

// Load the store location to the server memeory
dataStore().then((res) => {
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
  // res.render('index', { title: 'Express' });


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
    res.status(400).json({ 'status' : 'Bad request'}).end();
  }

  // gets unit of measurement
  let units = "mi";

  if(req.query.units == "mi"){
    units = "mi";
  }
  
  if(req.query.units == "km"){
    units = "km";
  }


  if(req.query.units == "mi"  ||  req.query.units == "km"){
    res.status(400).json({ 'status' : 'Invalid units of measurement'}).end();
  }
  

  geoCode(query_value).then(location => {
    console.log(" loc ", location);

  
  // replace - with . so that it can easily be query
  const zip_query_update = location.post_code.replace('-', '.')

  // get the closest store location to a given zip code
  // by using binary search algorithm to get closes zip code
  let closest_zip = binarySearchClosest(zip_codes, zip_query_update);

  const closest_store_to_zip = store_location[closest_zip[1]];

  console.log(" <<<< ", closest_zip)

  let distance = distanceCalculator(location.cordinates.lat,location.cordinates.lng, closest_store_to_zip.Latitude, closest_store_to_zip.Longitude, units)

  console.log(" <<< ", distance)
    const closest_store = {
      store : closest_store_to_zip,
      currentLocation: location,
      distance : {
        distance: distance,
        unit: units
      }
    }
    res.status(200).json({ status: closest_store }).end()
  }).catch(err => {
    console.log("error occoured : ", err)
    res.status(200).json({status  : err}).end()
  });
 
});


module.exports = router;
