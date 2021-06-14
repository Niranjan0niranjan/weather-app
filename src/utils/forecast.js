const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&appid=af2a822d388ddc4bc88b3d7a55d5b29a
    `;
    // console.log(url);

    request( { url, json: true } , (error, { body }= {} ) => {
        if (error) { 
            callback('Unable to Connect to weather service!', undefined);
        }
        else if (body.cod == '404') {
            callback('Unable to find location', undefined);
        }
        else {

            const data = (body);
            // console.log(data);

            const temp = data.list[0].main.temp;
            const desr = data.list[0].weather[0].description;

            callback(undefined, `It is currently ${temp} degree Calcius out.\n  There description of the weather is : ${desr} `);
        }
    })
}


module.exports = forecast;