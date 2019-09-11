"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var lodash_1 = __importDefault(require("lodash"));
var source_1 = __importDefault(require("../data-source/source"));
var distanceCalculator_1 = __importDefault(require("../utils/distanceCalculator"));
var reverseGeoCode_1 = __importDefault(require("../utils/reverseGeoCode"));
var router = express_1.default.Router();
// storeLocation will store all
// strore locations available to query
var storeLocation;
// extract zipcodes only from all store locations
// this will make it easier to get closest stores to a zip code
var zipCodes;
// Load the store location to the server memeory
source_1.default().then(function (res) {
    storeLocation = res;
    // get zip code only
    zipCodes = lodash_1.default.map(storeLocation, "zip");
});
/* GET home page. */
router.get("/", function (req, res, next) {
    // res.render("index", { title: "Express" });
    res.status(200).json({ status: "done" });
});
/* GET closest route. */
router.get("/closest", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var queryValue, units;
    return __generator(this, function (_a) {
        queryValue = "";
        // get the zip query string from the user request
        if (req.query.zip) {
            queryValue = req.query.zip;
        }
        // get the address string of the user request
        if (req.query.address) {
            queryValue = decodeURIComponent(req.query.address);
        }
        // return 400 error if
        // query mode is not specify
        if (queryValue === "") {
            res.status(400)
                .json({ error: "Bad request, supply zip or address" })
                .end();
        }
        units = "mi";
        // if user seupply mi
        // set the unit of measurement to miles
        if (req.query.units === "mi") {
            units = "mi";
        }
        // if user supply km
        // set the unit of measurement to km
        if (req.query.units === "km") {
            units = "km";
        }
        // if the user supply neither mi or km
        // throw an error back to the user
        if (req.query.units !== undefined && (req.query.units !== "mi" && req.query.units !== "km")) {
            res.status(400)
                .json({ error: "Invalid units of measurement" })
                .end();
        }
        // get the geolocation of the given address or zip
        reverseGeoCode_1.default(queryValue)
            .then(function (location) {
            // set an infinity number to hold closest zip
            var distanceMeasure = Number.POSITIVE_INFINITY;
            var closestStoreToZip;
            // loop through each store and calculate the distance
            // between the store and the given zip/address cordinates
            storeLocation.forEach(function (store, index, arr) {
                var distance = distanceCalculator_1.default(location.cordinates.lat, location.cordinates.lng, store.Latitude, store.Longitude, units);
                distance = Number(distance);
                // get the lowest distance 
                // and return it as the closest store
                if (distance < distanceMeasure) {
                    distanceMeasure = distance;
                    closestStoreToZip = store;
                }
            });
            // construct a closestStore object that will contains
            // 1. closest store to zip
            // 2. the current location of the address
            // 3. distance betweent the store and the user address
            var closestStore = {
                store: closestStoreToZip,
                currentLocation: location,
                distance: {
                    distance: distanceMeasure,
                    unit: units,
                },
            };
            // return the closestStore object
            res.status(200)
                .json({ status: closestStore })
                .end();
        })
            .catch(function (err) {
            console.log("error occoured : ", err);
            res.status(200)
                .json({ status: err })
                .end();
        });
        return [2 /*return*/];
    });
}); });
module.exports = router;
