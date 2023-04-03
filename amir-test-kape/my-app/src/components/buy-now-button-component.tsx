import React from "react";
import styled from "@emotion/styled";
import { BUY_NOW } from "../utils/constants";
import { sendTrackEvent } from "../utils/common-functions";
import { ExternalTrackEvents } from "../utils/interfaces";


interface Props {
  planTitle: string;
}


const ButtonStyle = styled.button`
  padding: 20px;
  margin: 10px 50px 0 50px;
  color: black;
  background-color: #FFE55C;
  border-radius: 8px;
  border: solid #ffd700 1px;
  cursor: pointer;

  &:hover {
    background-color: #FFD700;
  }
`;

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



