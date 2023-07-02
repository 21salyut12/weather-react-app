import React from 'react';
import AppLogic from './AppLogic';

function SlaveStation2() {
  return (
    <div>
      <h2>Slave Station 2</h2>
      {/* Pass the station prop to AppLogic component */}
      <AppLogic station="slave_station_2" />
    </div>
  );
}

export default SlaveStation2;