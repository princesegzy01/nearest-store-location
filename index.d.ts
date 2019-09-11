declare module 'lodash';

interface Location {

    cordinates : {
        lat: number,
        lng: number
    },
    post_code : string
    
}

interface Store {
    'Store Name': string,
    'Store Location': string,
    Address	: string,
    City:	string,
    State:	string,
    'Zip Code':	string,
    Latitude	: number,
    Longitude	: number,
    County: string,
    zip	: string,
}