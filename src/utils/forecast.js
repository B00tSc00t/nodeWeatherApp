const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0b4f97e9b557f24610b46eef76cf7782&query=' + latitude + ',' + longitude + '&units=f'
  const weatherImg = () => {
    if (body.current.weather_description[0] === "Partly Cloudy") {
      console.log('Winner');
    } else {
    console.log('No good');
    };
  };
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to Weather services!', undefined);
    } else if (body.err) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      // callback(undefined, weatherImg);
      callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees." + " Visibility is roughly " + body.current.visibility + "%.");
    }
  });
};

module.exports = forecast