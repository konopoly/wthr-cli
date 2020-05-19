const axios = require('axios').default;
const table = require('tty-table');

const apiKey = 'aac87e483e062fed6bd8672fb67e1c27';

const makeGETRequest = (lat, lon) => {
   const addi = `https://api.openweathermap.org/data/2.5/onecall`;
   const queryParams = `?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      
   return axios.get(addi + queryParams);
}

const currentForecast = ({current}) => {
   return {
      temp: current.temp,
      humidity: current.humidity,
      wind_speed: current.wind_speed,
      weather: {
         main: current.weather[0].main,
         description: current.weather[0].description
      }
   } 
}

const sevenDataForecast = ({daily}) => {
   const sevenDays = [];

   for(let i=1; i<=7; i++) {
      sevenDays.push([  
         getWeekDayString(daily[i].dt),
         daily[i].weather[0].main,
         Math.round(daily[i].temp.max) + '/' + Math.round(daily[i].temp.min),
         Math.round(daily[i].wind_speed*10)/10 + ' mph',
         daily[i].humidity + '%'
      ])
   }

   return sevenDays;
}

const getWeekDayString = (dt) => {
   const dateUTC = new Date(0);
   dateUTC.setUTCSeconds(dt);
   return dateUTC.toLocaleDateString(undefined, {weekday: 'long'});
}

const createTableToday = (current) => {
   console.log(current);


   let header = [
      {
         width: 20
      },
      {
         width: 20
      }
   ]
   
   const summary = `${current.weather.main} (${current.weather.description})` 
      + '\n' + `Temperature: ${current.temp}`
      + '\n' + `Feels Like: ${current.feels_like}`
      + '\n' + `Humidity: ${current.humidity}`;

   const icon = 'icon';

   const rows = [
      [icon, summary]
   ]

   const options = {
      borderStyle: "solid", 
      paddingBottom: 0,
      align: "left",
      color: "white",
   }

   //return table(header, rows, undefined, options).render();
}

const createTable = (rows) => {
   let header = [
      {
         value: "DAY",
         width: 15
      },
      {
         value: "DESCRIPTION",
         width: 15
      },
      {
         value: "HIGH/LOW",
         width: 15,
      },
      {
         value: "WIND",
         width: 15
      },
      {
         value: "HUMIDITY",
         width: 15
     },
   ]

   const options = {
      borderStyle: "solid", 
      borderColor: "green",
      paddingBottom: 0,
      headerAlign: "center",
      align: "center",
      color: "white",
   }

   return table(header, rows, undefined, options).render();
}

module.exports = {
   makeGETRequest: makeGETRequest,
   currentForecast: currentForecast,
   sevenDataForecast: sevenDataForecast,
   createTable: createTable,
   createTableToday: createTableToday  
}
