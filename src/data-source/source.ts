import express from 'express';
var router = express.Router();
import _ from 'lodash';


const csv = require('csvtojson')
const csvFilePath='./task/store-locations.csv'; //file path of csv



function dataStore(){

 
    let store_location;
    var data: any[];

    return csv().fromFile(csvFilePath).then((jsonObj: any)=>{
        
        const sortedLocation = _.orderBy(jsonObj, 'Zip Code', 'asc'); 
    
        sortedLocation.map(function(item){
            return item.zip = item['Zip Code'].replace('-', '.');
        });

        return sortedLocation;
    })
}


module.exports = dataStore;
export default dataStore;
