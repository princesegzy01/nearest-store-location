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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var lodash_1 = __importDefault(require("lodash"));
var source_1 = __importDefault(require("../data-source/source"));
var geoCode = require("../utils/reverseGeoCode");
var binarySearchClosest = require("../utils/binarySearch");
var distanceCalculator = require("../utils/distanceCalculator");
var csv = require('csvtojson');
// store_location will store all 
// strore locations available to query
var store_location = [];
// extract zipcodes only from all store locations
// this will make it easier to get closest stores to a zip code
// let zip_codes = _.map(store_location, 'zip');
var zip_codes;
// Load the store location to the server memeory
source_1.default().then(function (res) {
    store_location = res;
    // get zip code only
    zip_codes = lodash_1.default.map(store_location, 'zip');
});
/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.status(200).json({ status: 'done' });
});
/* GET closest route. */
router.get('/closest', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var query_value, units;
        return __generator(this, function (_a) {
            query_value = "";
            // get the zip query string from the user request
            if (req.query.zip) {
                query_value = req.query.zip;
            }
            //get the address string of the user request
            if (req.query.address) {
                query_value = decodeURIComponent(req.query.address);
            }
            // return 400 error if 
            // query mode is not specify
            if (query_value === "") {
                res.status(400).json({ 'status': 'Bad request' }).end();
            }
            units = "mi";
            if (req.query.units == "mi") {
                units = "mi";
            }
            if (req.query.units == "km") {
                units = "km";
            }
            if (req.query.units == "mi" || req.query.units == "km") {
                res.status(400).json({ 'status': 'Invalid units of measurement' }).end();
            }
            geoCode(query_value).then(function (location) {
                console.log(" loc ", location);
                // replace - with . so that it can easily be query
                var zip_query_update = location.post_code.replace('-', '.');
                // get the closest store location to a given zip code
                // by using binary search algorithm to get closes zip code
                var closest_zip = binarySearchClosest(zip_codes, zip_query_update);
                var closest_store_to_zip = store_location[closest_zip[1]];
                console.log(" <<<< ", closest_zip);
                var distance = distanceCalculator(location.cordinates.lat, location.cordinates.lng, closest_store_to_zip.Latitude, closest_store_to_zip.Longitude, units);
                console.log(" <<< ", distance);
                var closest_store = {
                    store: closest_store_to_zip,
                    currentLocation: location,
                    distance: {
                        distance: distance,
                        unit: units
                    }
                };
                res.status(200).json({ status: closest_store }).end();
            }).catch(function (err) {
                console.log("error occoured : ", err);
                res.status(200).json({ status: err }).end();
            });
            return [2 /*return*/];
        });
    });
});
module.exports = router;
