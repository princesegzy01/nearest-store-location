"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var distance = function (lat1, lon1, lat2, lon2, unit) {
    if (!lat1) {
        console.log(1);
        return new Error("Latitude 1 must be a valid number");
    }
    if (!lon1) {
        console.log(2);
        return new Error("Longitude 1 must be a valid number");
    }
    if (!lat2) {
        console.log(3);
        return new Error("Latitude 2 must be a valid number");
    }
    if (!lon2) {
        console.log(4);
        return new Error("Longitude 2 must be a valid number");
    }
    if (!unit || typeof unit !== "string") {
        console.log(5);
        return new Error("Unit must be of a type string");
    }
    if (unit !== "mi" && unit !== "km") {
        console.log(6);
        return new Error("Unit must be either mi or km");
    }
    if (lat1 === lat2 && lon1 === lon2) {
        return 0;
    }
    else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) +
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
exports.default = distance;
