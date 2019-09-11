// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::                                                                         :::
// :::  This routine calculates the distance between two points (given the     :::
// :::  latitude/longitude of those points). It is being used to calculate     :::
// :::  the distance between two locations using GeoDataSource (TM) prodducts  :::
// :::                                                                         :::
// :::  Definitions:                                                           :::
// :::    South latitudes are negative, east longitudes are positive           :::
// :::                                                                         :::
// :::  Passed to function:                                                    :::
// :::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
// :::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
// :::    unit = the unit you desire for results                               :::
// :::           where: 'M' is statute miles (default)                         :::
// :::                  'K' is kilometers                                      :::
// :::                  'N' is nautical miles                                  :::
// :::                                                                         :::
// :::  Worldwide cities and other features databases with latitude longitude  :::
// :::  are available at https://www.geodatasource.com                         :::
// :::                                                                         :::
// :::  For enquiries, please contact sales@geodatasource.com                  :::
// :::                                                                         :::
// :::  Official Web site: https://www.geodatasource.com                       :::
// :::                                                                         :::
// :::               GeoDataSource.com (C) All Rights Reserved 2018            :::
// :::                                                                         :::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const distance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
	unit: string,
): number  | Error => {

	if(!lat1 || typeof lat1 !== "number"){
		return new Error("Latitude 1 must be a number")
	}

	if(!lon1 || typeof lon1 !== "number"){
		return new Error("Longitude 1 must be a number")
	}

	if(!lat2 || typeof lat2 !== "number"){
		return new Error("Latitude 2 must be a number")
	}

	if(!lon2 || typeof lon2 !== "number"){
		return new Error("Longitude 2 must be a number")
	}

	if(!unit || typeof unit !== "string"){
		return new Error("Unit must be of a type string")
	}

	if(unit !== "mi" && unit !== "km"){
		return new Error("Unit must be either mi or km")
	}


	if (lat1 === lat2 && lon1 === lon2) {
		return 0;
	} else {
		const radlat1 = (Math.PI * lat1) / 180;
		const radlat2 = (Math.PI * lat2) / 180;
		const theta = lon1 - lon2;
		const radtheta = (Math.PI * theta) / 180;
		let dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit === "km") {
			dist = dist * 1.609344;
		}
		if (unit === "mi") {
			dist = dist * 0.8684;
		}
		return dist;
	}
};

module.exports = distance;
export default distance;
