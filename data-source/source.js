"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csvtojson_1 = __importDefault(require("csvtojson"));
var lodash_1 = __importDefault(require("lodash"));
// file path of csv
var csvFilePath = "./task/store-locations.csv";
var dataStore = function () {
    return csvtojson_1.default()
        .fromFile(csvFilePath)
        .then(function (jsonObj) {
        // order the dataset by zip code
        // so that we can use binary search on it
        var sortedLocation = lodash_1.default.orderBy(jsonObj, "Zip Code", "asc");
        // convert complex zipcode containing - to .
        // so that we can perform arithmetic calculation on it
        sortedLocation.map(function (item) {
            return (item.zip = item["Zip Code"].replace("-", "."));
        });
        // return the processed dataset
        return sortedLocation;
    });
};
// export the module to be used from another script
module.exports = dataStore;
exports.default = dataStore;
