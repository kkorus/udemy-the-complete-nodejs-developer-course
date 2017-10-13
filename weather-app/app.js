
const yargs = require('yargs');
const geocode = require('./geocode')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results));
    }
});

if (!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
} else {
    console.log('Unable to fetch weather');
}
