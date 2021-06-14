//Takes an address in string format and returns the geo location of the address 
// Also takes a callback function where the locations are returned

const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoibmlyYW5qYW4wbmlyYW5qYW4iLCJhIjoiY2tuZGd6OHB4MWgzdzJ4bGNsZHNqbGNhMCJ9.68KUZa0gtPEEC2_zgfMNfQ&limit=1';

    request({ url,json: true },(error,{ body } = {} )=>{
        if(error){
            callback('Unable to connect to loaction services!',undefined);
        }else if(body.features.length===0){
            callback('Unable to connect to loaction services!',undefined);
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude:  body.features[0].center[1],
                location:  body.features[0].place_name,
            });
        }
    })
}




module.exports =geocode;