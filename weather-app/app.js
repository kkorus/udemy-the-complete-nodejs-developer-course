
const yargs = require('yargs');
const geocode = require('./geocode')
const weather = require('./weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, locations) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(locations.latitude, locations.longitude, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResult.temperature}.`);
            }
        });
    }
});


