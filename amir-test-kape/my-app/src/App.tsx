import React, { useEffect, useState } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";
import { sendTrackEvent } from "./utils/share-function";

function App() {

  const [landingPageComplete, setLandingPageComplete] = useState(false);

  useEffect( () => {
    const userJWT = localStorage.getItem('JWT');
    sendTrackEvent(ExternalTrackEvents.LANDING_PAGE, userJWT, setLandingPageComplete)
  }, []);


  return (
    <div className="App">
      {landingPageComplete && <PlansComponent/>}
    </div>
  );
}

export default App;
