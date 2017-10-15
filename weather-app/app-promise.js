const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }

        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lat;
        console.log(response.data.results[0].formatted_address);

        var weatherUrl = `https://api.darksky.net/forecast/ddf2e7339920d9b81a6acc5e3b3c7524/${lat},${lng}`;
        return axios.get(weatherUrl);
    })
    .then((response) => {
        const temp = response.data.currently.temperature;
        const apparentTemp = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temp}. It feels like ${apparentTemp}.`);
    })
    .catch((error) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });