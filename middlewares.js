export const getCatitalWeather = (req, res) => {
  return res.json({
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