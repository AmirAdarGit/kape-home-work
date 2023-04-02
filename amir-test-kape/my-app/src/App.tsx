import React, { useEffect } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";
import { sendTrackEvent } from "./utils/share-function";

function App() {


  useEffect( () => {
    const userJWT = localStorage.getItem('Authorization');
    sendTrackEvent(ExternalTrackEvents.LANDING_PAGE, userJWT)
  }, []);


  return (
    <div className="App">
      <PlansComponent/>
    </div>
  );
}

export default App;
