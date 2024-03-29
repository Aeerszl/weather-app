import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  let api_key = "a5dc70dc931d2e13c563cfbe74337893";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    const cityInput = element[0];

    if (!cityInput.value) {
      alert("Please enter a valid city name!");
      return;
    }

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name!');
      }

      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;

      // Set weather icon based on weather condition
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
          setWicon(drizzle_icon);
          break;
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
          setWicon(rain_icon);
          break;
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='container'>
      
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">-°C</div>
      <div className="weather-location">Weather</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">-%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">- km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
