import React, { useEffect } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";

function App() {


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const apiUrl = 'https://example.com/api/trackEvent';

    // Send API call to track event
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trackEvent: ExternalTrackEvents.LANDING_PAGE,
        userId: userId
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!userId) {
          localStorage.setItem('userId', data.userId);
        }
      })
      .catch(error => {
        console.error('Error tracking event:', error);
      });
  }, []);


  return (
    <div className="App">
      <PlansComponent/>
    </div>
  );
}

export default App;
