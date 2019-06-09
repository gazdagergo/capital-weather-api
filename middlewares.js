export const getCatitalWeather = (req, res) => {
  let json;

  if (req.params.cityName === 'Berlin') {
    json = {
      cityId: 196,
      sunriseDate: '09:37',
      sunsetDate: '15:42',
      currentTemp: '15',
      tempMax: '22',
      tempMin: '12',
      tempUnit: '˚C',
      weatherDesc: 'thunderstorm',
      weatherIcon: 'wi_day_thunderstorm',
    }
  }
  if (req.params.cityName === 'Budapest') {
    json = {
      cityId: 61,
      sunriseDate: '09:21',
      sunsetDate: '16:22',
      currentTemp: '23',
      tempMax: '25',
      tempMin: '18',
      tempUnit: '˚C',
      weatherDesc: 'cloud windy',
      weatherIcon: 'wi-cloudy-windy',
    }    
  }

  return res.json(json)
} 