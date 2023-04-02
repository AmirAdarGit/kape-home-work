import React, { useEffect } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";
import { sendTrackEvent } from "./utils/share-function";

function App() {


  useEffect( () => {
    const userId = localStorage.getItem('userId');
    sendTrackEvent(ExternalTrackEvents.LANDING_PAGE, userId)
  }, []);


  return (
    <div className="App">
      <PlansComponent/>
    </div>
  );
}

export default App;
