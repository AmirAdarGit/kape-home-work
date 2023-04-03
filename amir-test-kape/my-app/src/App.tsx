import React, { useEffect, useState } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";
import { sendTrackEvent } from "./utils/common-functions";
import styled from "@emotion/styled";
import {LogoStyled, TitleStyled, SubTitleStyled, CoverImg }  from "./style/app.styled";



function App() {

  const [landingPageComplete, setLandingPageComplete] = useState(false);

  useEffect(() => {
    const userJWT = localStorage.getItem('JWT');
    sendTrackEvent(ExternalTrackEvents.LANDING_PAGE, userJWT).
    then(() => setLandingPageComplete(true))
  }, []);


  return (
    <div className="App">
        <LogoStyled>
          <img src={ "https://antivirus.intego.com/img/mac_av/logo_white.png" } style={ {zIndex: '1'} }/>
          <TitleStyled >Get the Ultimate Protection for your PC</TitleStyled>
          <SubTitleStyled>Choose the best plan for your needs</SubTitleStyled>
        </LogoStyled>
      <CoverImg src={ "https://antivirus.intego.com/img/mac_av/hero_bg_desktop.webp" }/>
      { landingPageComplete && <PlansComponent/> }
    </div>
  );
}

export default App;
