import React from "react";
import styled from "@emotion/styled";
import { BEST_VALUE } from "../utils/constants";


interface Props {

}


const WrapperStyle = styled.div`
  width: 80px;
  height: 20px;
  background-color: aqua;
  border-radius: 50px 0 50px 0;
  border: solid black 1px;
  font-size: 10px;
  font-weight: bold;
  line-height: 20px;
  align-self: center;
  position: absolute;
  top: 20px;
`;


export const BestValueComponent: React.FC<Props> = () => {


  return (
    <WrapperStyle>
      {BEST_VALUE}
    </WrapperStyle>
  );
}

export default BestValueComponent;



