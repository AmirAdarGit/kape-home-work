import React from "react";
import styled from "@emotion/styled";
import { BUY_NOW } from "../utils/constants";


interface Props {

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

export const BuyNowButton: React.FC<Props> = () => {


  return (
      <ButtonStyle onClick={() => console.log("amir")}>{BUY_NOW}</ButtonStyle> //TODO: implement the analytics
  );
}

export default BuyNowButton;



