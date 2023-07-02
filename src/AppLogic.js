import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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

  return (
    <div className="elemContainer">
      {weatherData && (
        <>
          <div className="row">
            <p>TEMPERATURE: {weatherData.temperature.toFixed(2)} °C</p>
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
            <p>WIND SPEED: {weatherData.wind_speed.toFixed(2)} km/h</p>
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
        </>
      )}
    </div>
  );
}

export default AppLogic;