# Nearest Store Location

A simple NodeJs application that accepts a zipcode or address as query string then return a store from a given dataset closer to it.

check the `/task/README.md` to view the original task.

## Technologies
1. Nodejs
2. Mocha
3. Typescript
4. TsLint
5. Google GeoLocation

## Algorithm
1. Retrieve Zip code or address as a query string from the request
2. Query google maps API to retrieve the zip/address cordinates.
3. Perform a loop to continously calculate the distance between google cordinates and the cordinates from the datasets.
4. Store the value lowest value found while calculating the distance.
5. Get the index of the store with the lowest value and return it.

##  Setup & Installation
- Clone the repository into a directory of your choice
- Open your Terminal and run `git clone https://github.com/princesegzy01/nearest-store-location.git`
- change directory to the app you cloned buy running `cd nearest-store-location`
- Install dependencies by running `npm install` on your terminal.

## Project Structure
	    1. /bin          - This directory contains the entry point to the nodejs application.
	    2. /data-source  - /data-source folder contains the Nodejs module the loads the store-location.csv dataset and expose it for use.
	    3. /routes       - The /route directory contains the module that respond to http request to the `/closest` endpoint.  
	    4. /src          - This folder contains all the source scripts written in typescripts to be traspiled to a specific version of javascripts. 
	    5. /task 	     - This contains the original Readme.md task and the store-location.csv file. 
	    6. /test 	     - This directory contains the test module used in this project.
	    7. /utils        - The /utils folder contains utilities modules used in the project.

## Start Server
- From your terminal, run  `npm run ts-watch` to watch changes to typescripts file and automatically transpile it to javascripts.

- open another terminal and run `npm start` to start the server.

## Open Application
- Open your browser and logon to [`http://localhost:3000/closest?zip=01035&units=km`](http://localhost:3000/closest?zip=01035&units=km) to get closest store to zip code, or use this [`http://localhost:3000/closest?address=1600 Amphitheatre Parkway in Mountain View, California, United States&units=km`](http://localhost:3000/closest?address=1600%20Amphitheatre%20Parkway%20in%20Mountain%20View,%20California,%20United%20States&units=km) to search by address. you should see a page like below.


    <img src="result_image.png"
        alt="Markdown Monster icon"
        style="float: left; margin-right: 10px;" />

## Usage
  {server}/closest?zip=<*zip*>

  {server}/closest?address=<*address*>

  {server}/closest?zip=<*zip*>&units=<*(mi|km)*>


## Parameters to supply
GET `/closest` is the route called to retrieve the closest store. However there are some compulsory querystring parameters that is needed to be pass along with the query.

- `zip`: (String) The caller of this endpoint needs to supply a valid zip code e.g *01035* to sucessfully query this endpoint.

    OR

- `address` (String): This is a  human readable address that e.g *1600 Amphitheatre Parkway in Mountain View, California, United States* that can be passed along with the request as against zip codes



- `units` (String) : This is the unit of measurement you want to get the distance in. parameter must be either `mi` (default) or `km`.

## Result

Below is a sample result of a successful query and the json output contains 3 nodes:
1. **store** : This is the closest store retrieved from the dataset.
2. **currentLocation** : This is the cordinates of the given zip code or address.
3. **distance**: This return the calculated distance between the store and the current loacation node.

        {
            "status": {
                "store": {
                    "Store Name": "Mountain View",
                    "Store Location": "NEC Showers Dr & Latham St",
                    "Address": "555 Showers Dr",
                    "City": "Mountain View",
                    "State": "CA",
                    "Zip Code": "94040-1432",
                    "Latitude": "37.4010106",
                    "Longitude": "-122.1060628",
                    "County": "Santa Clara County",
                    "zip": "94040.1432"
                },
                "currentLocation": {
                    "cordinates": {
                        "lat": 37.4234118,
                        "lng": -122.0794404
                    },
                    "post_code": "94043"
                },
                "distance": {
                    "distance": 3.4252122569651604,
                "   unit": "km"
                }
            }
        }	
    
## Test

The test for this application are written using the following tech nologies : Mocha, Chai and Supertest.

To run the test, open your Terminal, cd into the project root and run  `npm test`.


## Reference
1. (NodeJS Express framework) https://expressjs.com/
2. (Distance Calculation)  https://www.geodatasource.com/developers/javascript
3. (Csv to Json ) https://www.npmjs.com/package/csvtojson
4. (Google Map Service) https://www.npmjs.com/package/@google/maps


Feel free to reach out to me if you have any questions at princesegzy01@gmail.com