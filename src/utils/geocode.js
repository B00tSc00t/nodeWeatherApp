const request = require('postman-request');

// Geocoding
// pk.eyJ1IjoiYm9vdHNjb290MSIsImEiOiJja3RrbzA1eXgwcjBuMzFxemdtZDF0dDdvIn0.uYO8Of5nEjJOEs24I9FY3w


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm9vdHNjb290MSIsImEiOiJja3RrbzA1eXgwcjBuMzFxemdtZDF0dDdvIn0.uYO8Of5nEjJOEs24I9FY3w&limit=1'

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        locationName: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode