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
    Latitude	: string,
    Longitude	: string,
    County: string,
    zip	: string,
}