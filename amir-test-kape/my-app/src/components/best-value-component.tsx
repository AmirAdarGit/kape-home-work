import React from "react";
import { BEST_VALUE } from "../utils/constants";
import { WrapperStyle } from "../style/best-value-component-styled";


export const BestValueComponent: React.FC = () => {

  return (
    <WrapperStyle>
      {BEST_VALUE}
    </WrapperStyle>
  );
}

export default BestValueComponent;



