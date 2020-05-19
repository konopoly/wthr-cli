const axios = require('axios').default;
const geoip = require('geoip-lite');
const publicIp = require('public-ip');
const utils = require('./utils');

function display(data, cityData) {
   const current = utils.currentForecast(data);
   const sevenDays = utils.sevenDataForecast(data);
      
   console.log('Location: ' + cityData.city + ', ' + cityData.country); 
   console.log(`Currently: ${current.temp}, ${current.weather.main}`);
   console.log(`Humidity: ${current.humidity}`);
   console.log(`Wind Speed: ${current.wind_speed}`);
 
   console.log(utils.createTable(sevenDays));
}

function getWeatherData(geo) {
   const [lat, lon] = geo.ll;

   utils.makeGETRequest(lat, lon)
      .then(response => {
         display(response.data, geo);
      });
}

function parseResponse() {
   publicIp.v4().then((response) => {
      const geo = geoip.lookup(response);
      getWeatherData(geo);
   });
}

parseResponse();
