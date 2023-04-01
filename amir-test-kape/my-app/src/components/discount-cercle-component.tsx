import React from "react";
import styled from "@emotion/styled";
import { DISCOUNT } from "../utils/constants";


interface Props {
  discountPercentage: number | null
}


const WrapperStyle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: 40px;
  line-height: -80px;
  color: white;
  background-color: red;
`;


export const DiscountCircleComponent: React.FC<Props> = ({discountPercentage}) => {


  return (
    <WrapperStyle>
      <div style={{fontSize: '25px', paddingTop: '8px'}}>{ discountPercentage }%</div>
      <div style={{fontSize:'12px'}}>{DISCOUNT}</div>
    </WrapperStyle>
  );
}

export default DiscountCircleComponent;



