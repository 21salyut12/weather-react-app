import React, { useState } from 'react';
import './App.css';
import SlaveStation1 from './SlaveStation1';
import SlaveStation2 from './SlaveStation2';
import AppLogic from './AppLogic';

function App() {
  const [selectedStation, setSelectedStation] = useState(null);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  return (
    <div className="App text-props">
      <h1>Weather App</h1>
      <div className="station-selector">
        <p>Select Station:</p>
        <select value={selectedStation} onChange={handleStationChange}>
          <option value="">Please Choose A Weather Station</option>
          <option value="SlaveStation1">Slave Station 1</option>
          <option value="SlaveStation2">Slave Station 2</option>
        </select>
      </div>
      {/* Render components based on selected station*/}
      {selectedStation === "SlaveStation1" && <SlaveStation1 />}
      {selectedStation === "SlaveStation2" && <SlaveStation2 />}
      {selectedStation === null && <AppLogic />}
    </div>
  );
}

export default App;