import React from "react";
import { IMoreInfo } from "../utils/interfaces";
import check from '../icons/check-solid.svg';
import {
  CheckIconStyled,
  PlanInfoFullTitleStyled,
  PlanInfoSubTitleStyled,
  PlanInfoTitleStyled,
  WrapperStyle
} from '../style/plan-info-component'

interface Props {
  planInfo: IMoreInfo
}


export const PlanInfoComponent: React.FC<Props> = (({planInfo}) => {

  return (
    <WrapperStyle shouldMark={ planInfo.isMarked }>
      <CheckIconStyled src={ check }
                       alt="My Icon"/>
      <PlanInfoFullTitleStyled>
        <PlanInfoTitleStyled isBold={ planInfo.isBold }>{ planInfo.infoTitle }</PlanInfoTitleStyled>
        <PlanInfoSubTitleStyled/>
      </PlanInfoFullTitleStyled>
    </WrapperStyle>
  );
})


export default PlanInfoComponent;



