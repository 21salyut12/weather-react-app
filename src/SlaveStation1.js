import React from 'react';
import AppLogic from './AppLogic.js';

function SlaveStation1() {
  return (
    <div>
      <h2>Slave Station 1</h2>
      {/* Pass the station prop to AppLogic component */}
      <AppLogic station="slave_station_1" />
    </div>
  );
}

export default SlaveStation1;