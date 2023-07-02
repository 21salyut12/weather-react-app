import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Import SVGs style & SVGs for different weather conditions

import { ReactComponent as ClearDaySVG } from './clear-day.svg';
import { ReactComponent as ClearNightSVG } from './clear-night.svg';
import { ReactComponent as CloudySVG } from './cloudy.svg';
import { ReactComponent as DrizzleSVG } from './drizzle.svg';
import { ReactComponent as FogDaySVG } from './fog-day.svg';
import { ReactComponent as FogNightSVG } from './fog-night.svg';
import { ReactComponent as FogSVG } from './fog.svg';
import { ReactComponent as NotAvailableSVG } from './not-available.svg';
import { ReactComponent as RainSVG } from './rain.svg';
import { ReactComponent as SnowSVG } from './snow.svg';
import { ReactComponent as WindSVG } from './wind.svg';


// Firebase configuration
const firebaseConfig = {
  // Firebase API configuration details
    apiKey: "AIzaSyBtePwDhhvkv6O_bqP1_ztzLyLvOTX6yis",
    authDomain: "weather-app-80523.firebaseapp.com",
    databaseURL: "https://weather-app-80523-default-rtdb.firebaseio.com",
    projectId: "weather-app-80523",
    storageBucket: "weather-app-80523.appspot.com",
    messagingSenderId: "1089710412292",
    appId: "1:1089710412292:web:e25f2b4c889e73f1bb9b51"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function AppLogic({ station }) {
  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Reference to the Firebase Realtime Database for the specific station
    const measurementsRef = firebase.database().ref(`/data/slaves/${station}/`);

    // Callback function to handle data changes
    const onDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update weatherData state with the received data
        setWeatherData(data);
      }
    };

    // Listen for value changes in the measurementsRef
    measurementsRef.on('value', onDataChange);

    // Cleanup function to detach the listener when component unmounts
    return () => {
      measurementsRef.off('value', onDataChange);
    };
  }, [station]);

  // Function to determine the weather condition based on the weather data
  const getWeatherCondition = () => {
    const { temperature, pressure, humidity, rainfall_intensity, wind_speed } = weatherData;

    if (rainfall_intensity === 0) {
      return 'not-available';
    } else if (humidity === 100 && temperature < 10) {
      return 'fog';
    } else if (humidity === 100) {
      return 'fog';
    } else if (humidity > 60 && rainfall_intensity > 0) {
      return 'rain';
    } else if (rainfall_intensity > 0 && rainfall_intensity <= 2) {
      return 'drizzle';
    } else if (rainfall_intensity > 2 && rainfall_intensity <= 10) {
      return 'rain';
    } else if (temperature < 0) {
      return 'snow';
    } else if (temperature >= 0 && temperature <= 20) {
      return 'clear-day';
    } else if (temperature > 20) {
      return 'clear-night';
    } else {
      return 'cloudy';
    }
  };

  // Function to render the corresponding SVG based on the weather condition
  const renderWeatherSVG = () => {
    const weatherCondition = getWeatherCondition();

    switch (weatherCondition) {
      case 'clear-day':
        return <ClearDaySVG />;
      case 'clear-night':
        return <ClearNightSVG />;
      case 'cloudy':
        return <CloudySVG />;
      case 'drizzle':
        return <DrizzleSVG />;
      case 'fog':
        return <FogSVG />;
      case 'not-available':
        return <NotAvailableSVG />;
      case 'rain':
        return <RainSVG />;
      case 'snow':
        return <SnowSVG />;
      default:
        return <WindSVG />;
    }
  };

  return (
    <div className="elemContainer">
      {weatherData && (
        <>
          <div className="row">
            <p>TEMPERATURE: {weatherData.temperature} °C</p>
          </div>
          <div className="row">
            <p>ATMOSPHERIC PRESSURE: {weatherData.pressure} Pa</p>
          </div>
          <div className="row">
            <p>HUMIDITY: {weatherData.humidity}%</p>
          </div>
          <div className="row">
            <p>RAIN INTENSITY: {weatherData.rainfall_intensity}%</p>
          </div>
          <div className="row">
            <p>WIND SPEED: {weatherData.wind_speed} km/h</p>
          </div>
          <div className="row">
            <p>LOCATION: {weatherData.location}</p>
          </div>
          <div className="row">
            <p>
              TIMESTAMP: {weatherData.timestamp.day}/{weatherData.timestamp.month}/{weatherData.timestamp.year}{' '}
              {weatherData.timestamp.hour}:{weatherData.timestamp.minute}:{weatherData.timestamp.second}
            </p>
          </div>
          <div className="row">
            <div className="weather-svg">{renderWeatherSVG()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default AppLogic;