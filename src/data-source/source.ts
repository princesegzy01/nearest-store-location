import csv from "csvtojson";
import _ from "lodash";

// file path of csv
const csvFilePath = "./task/store-locations.csv"; 

const dataStore = () => {
	return csv()
		.fromFile(csvFilePath)
		.then((jsonObj: Store[]) => {
			// return the processed dataset
			return jsonObj;
		});
};

// export the module to be used from another script
module.exports = dataStore;
export default dataStore;
