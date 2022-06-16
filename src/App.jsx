import './App.css'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [weather, setWeather] = useState({})
  const [isOpposite, setIsOpposite] = useState (true);
  const [currentWeather, setCurrentWeather] = useState (0)
  
  const sucess = pos => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dc1eb7623bee4a0775fe41b6daf73d70`)
      .then(res => {
        setWeather(res.data)
        setCurrentWeather(res.data.main?.temp)
      });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(sucess);
  }, [])

  const convertTemp = (temp) => {
    const currentTempF = (((currentWeather - 273.15) * 1.8) + 32).toFixed(2);
    const currentTempC = (currentWeather - 273.15).toFixed(2);
    return isOpposite? currentTempF : currentTempC;
}
  const convertMaxTemp = (temp_max) =>{
    const maximumTempF = (((weather.main?.temp_max - 273.15) * 1.8) + 32).toFixed(2);
    const maximumTempC = (weather.main?.temp_max - 273.15).toFixed(2);
    return isOpposite? maximumTempF : maximumTempC;
  }

  const convertMinTemp = (temp_min) =>{
    const minimumTempF = (((weather.main?.temp_min - 273.15) * 1.8) + 32).toFixed(2);
    const minimumTempC = (weather.main?.temp_min - 273.15).toFixed(2);
    return isOpposite? minimumTempF : minimumTempC;
  }

  const convertTermSen = (temp_max) =>{
    const termicalSensationF = (((weather.main?.feels_like - 273.15)*1.8)+32).toFixed(2);
    const termicalSensationC = (weather.main?.feels_like-273.15).toFixed(2);
    return isOpposite? termicalSensationF : termicalSensationC;
  }

const handleClick = () => {
  setIsOpposite(!isOpposite);
}

  return (
    <div className='App'>
      <div className='weatherCard'>
        <h2>{weather.sys?.country}, {weather.name}</h2>
        <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt='' />
        <ul>
          <li><b>{weather.weather?.[0].main} : {weather.weather?.[0].description}</b></li>
          <li><b>Current temperature:</b> {convertTemp(weather.main?.temp)} {isOpposite ? "°F" : "°C"}{" "} </li>
          <li><b>Maximum temperature:</b> {convertMaxTemp(weather.main?.temp_max)} {isOpposite ? "°F" : "°C"}{" "} </li>
          <li><b>Minimum temperature:</b> {convertMinTemp(weather.main?.temp_min)} {isOpposite ? "°F" : "°C"}{" "} </li>
          <li><b>Termical sensation:</b> {convertTermSen(weather.main?.feels_like)} {isOpposite ? "°F" : "°C"}{" "} </li>
        </ul>
        <button className='buttonConvertion'  onClick={handleClick}>
          Convert to {isOpposite? '°C' : '°F'}
        </button>
      </div>
    </div>
  );
};

export default App;
