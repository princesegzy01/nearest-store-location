"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var lodash_1 = __importDefault(require("lodash"));
var csv = require('csvtojson');
var csvFilePath = './task/store-locations.csv'; //file path of csv
function dataStore() {
    return csv().fromFile(csvFilePath).then(function (jsonObj) {
        var sortedLocation = lodash_1.default.orderBy(jsonObj, 'Zip Code', 'asc');
        sortedLocation.map(function (item) {
            return item.zip = item['Zip Code'].replace('-', '.');
        });
        return sortedLocation;
    });
}
module.exports = dataStore;
exports.default = dataStore;
