import dotenv from 'dotenv';
import axios from 'axios';
import { dbQuery } from './helpers/dbHelper';
import { checkStatusOk } from './helpers/restHelper';

const kelviToCelsius = k => k - 273.15;

dotenv.config();

const weatherAppId = process.env.WEATHER_APP_ID;

export const getCapitals = (req, res)  => {
  dbQuery('SELECT * FROM capitals')
  .then(result => {
    res.status(200).json(result.rows);
  })
}

export const getSavedCities = (req, res)  => {
  dbQuery(
    `SELECT
      saved_cities.id id,
      saved_cities.city_id city_id,
      capitals.capital_name capital_name,
      capitals.country_code country_code
    FROM
      saved_cities
    INNER JOIN capitals ON saved_cities.city_id = capitals.id;`
  )
  .then(result => {
    res.status(200).json(result.rows);
  })
}

export const getCatitalWeather = (req, res) => {
  const { cityName, countryCode } = req.params;

  const getWeatherInfoJson = ([dbResponse, httpResponse]) => {
    const cityWeatherData = checkStatusOk(httpResponse);
    const capitalRecord = dbResponse.rows[0];
    const {
      temp_min: tempMin,
      temp_max: tempMax,
      temp: currentTemp, 
    } = cityWeatherData.list[0].main;

    const {
      description: weatherDesc
    } = cityWeatherData.list[0].weather[0];

    const {
      id: cityId,
      capital_name: cityName,
      country_code: countryCode
    } = capitalRecord;

    return {
      cityId,
      cityName,
      countryCode,
      sunriseDate: '09:21',
      sunsetDate: '16:22',
      currentTemp: Math.round(kelviToCelsius(currentTemp)),
      tempMax: Math.round(kelviToCelsius(tempMax)),
      tempMin: Math.round(kelviToCelsius(tempMin)),
      tempUnit: '˚C',
      weatherDesc,
      weatherIcon: 'wi-cloudy-windy',
    };
  }

  Promise.all([
    dbQuery(
      `SELECT id, capital_name, country_code
       FROM capitals
       WHERE
        capital_name LIKE '${cityName}' AND
        country_code LIKE '${countryCode}'`
    ),
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&APPID=${weatherAppId}`)
  ])
  .then(getWeatherInfoJson)
  .then(json => res.json(json))

} 