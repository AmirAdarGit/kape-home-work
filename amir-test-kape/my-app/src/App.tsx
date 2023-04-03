import React, { useEffect, useState } from 'react';
import './App.css';
import { PlansComponent } from "./components/plans-component";
import { ExternalTrackEvents } from "./utils/interfaces";
import { sendTrackEvent } from "./utils/common-functions";
import { LogoStyled, TitleStyled, SubTitleStyled, CoverImg, IntegoLogoImgStyled } from "./style/app.styled";
import { COVER_IMG, INTEGO_LOGO_IMG_SRC, JWT, SUB_TITLE_PAGE, TITLE_PAGE } from "./utils/constants";



function App() {

  const [landingPageComplete, setLandingPageComplete] = useState(false);

  useEffect(() => {
    const userJWT = localStorage.getItem(JWT);
    sendTrackEvent(ExternalTrackEvents.LANDING_PAGE, userJWT).
    then(() => setLandingPageComplete(true))
  }, []);


  return (
    <div className="App">
        <LogoStyled>
          <IntegoLogoImgStyled src={ INTEGO_LOGO_IMG_SRC } alt={'Intego image'} />
          <TitleStyled >{TITLE_PAGE}</TitleStyled>
          <SubTitleStyled>{SUB_TITLE_PAGE}</SubTitleStyled>
        </LogoStyled>
      <CoverImg src={ COVER_IMG }/>
      { landingPageComplete && <PlansComponent/> }
    </div>
  );
}

export default App;
