import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isWeatherDataObtained, setIsWeatherDataObtained] = useState(null)
  const [weatherData, setWeatherData] = useState({})

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const apikey = process.env.REACT_APP_OPEN_WEATHER_MAP
  const units = 'imperial'

  useEffect(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    }
    else {
      console.log('Geolocation not supported by this browser')
    }
  }, [])

  useEffect(async () => {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`,
    })
    setWeatherData(response.data)
    setIsWeatherDataObtained(true)
  }, [latitude, longitude])

  return (
    <div>
      <header>
        Weather App
      </header>
      {isWeatherDataObtained &&
        <div>
          <div>City: {weatherData.name}, {weatherData.sys.country}</div>
          <div>Temp: {weatherData.main.temp} F</div>
          <div>{weatherData.weather[0].main}</div>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </div>
      }
    </div>
  )
}

export default App