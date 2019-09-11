"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csvtojson_1 = __importDefault(require("csvtojson"));
// file path of csv
var csvFilePath = "./task/store-locations.csv";
var dataStore = function () {
    return csvtojson_1.default()
        .fromFile(csvFilePath)
        .then(function (jsonObj) {
        // return the processed dataset
        return jsonObj;
    });
};
// export the module to be used from another script
module.exports = dataStore;
exports.default = dataStore;
