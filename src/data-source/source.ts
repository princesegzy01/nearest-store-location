import csv from "csvtojson";
import _ from "lodash";

// file path of csv
const csvFilePath = "./task/store-locations.csv"; 

const dataStore = () => {
	return csv()
		.fromFile(csvFilePath)
		.then((jsonObj: Store[]) => {

			// order the dataset by zip code
			// so that we can use binary search on it
			const sortedLocation = _.orderBy(jsonObj, "Zip Code", "asc");

			// convert complex zipcode containing - to .
			// so that we can perform arithmetic calculation on it
			sortedLocation.map((item: Store) => {
				return (item.zip = item["Zip Code"].replace("-", "."));
			});

			// return the processed dataset
			return sortedLocation;
		});
};

// export the module to be used from another script
module.exports = dataStore;
export default dataStore;
