export const getCatitalWeather = (req, res) => {
  let cityId;
  if (req.params.cityName === 'Berlin') cityId = 196;
  if (req.params.cityName === 'Budapest') cityId = 61;

  return res.json({
    cityId,
    sunriseDate: '09:37',
    sunsetDate: '15:42',
    currentTemp: '15',
    tempMax: '22',
    tempMin: '12',
    tempUnit: '˚C',
    weatherDesc: 'light intensity dizzle',
    weatherIcon: 'wi_day_thunderstorm',
  })
} 