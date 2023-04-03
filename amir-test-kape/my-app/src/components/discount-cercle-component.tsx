import React from "react";
import styled from "@emotion/styled";
import { DISCOUNT } from "../utils/constants";
import { DiscountNumberStyled, DiscountTitle, WrapperStyle } from "../style/discount-cicle-component-styled";


interface Props {
  discountPercentage: number | null
}




export const DiscountCircleComponent: React.FC<Props> = ({discountPercentage}) => {


  return (
    <WrapperStyle>
      <DiscountNumberStyled >{ discountPercentage }%</DiscountNumberStyled>
      <DiscountTitle>{DISCOUNT}</DiscountTitle>
    </WrapperStyle>
  );
}

export default DiscountCircleComponent;



