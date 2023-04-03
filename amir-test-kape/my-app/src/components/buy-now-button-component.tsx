import React from "react";
import { BUY_NOW } from "../utils/constants";
import { sendTrackEvent } from "../utils/common-functions";
import { ExternalTrackEvents } from "../utils/interfaces";
import { ButtonStyle } from "../style/button-styled";


interface Props {
  planTitle: string;
}

export const BuyNowButton: React.FC<Props> = ({planTitle}) => {

  const userId = localStorage.getItem('JWT'); // on landing page we generate userId so if not generate yet, d`ont show the buy now button

  return (
    userId ?
      <ButtonStyle onClick={ () => sendTrackEvent(ExternalTrackEvents.PRESSED_BUY_NOW_BUTTON, userId, planTitle) }>
        { BUY_NOW }
      </ButtonStyle> : <></>
  );
}

export default BuyNowButton;



