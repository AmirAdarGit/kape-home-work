import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IMoreInfo } from "../utils/interfaces";
import check from '../icons/check-solid.svg';


interface Props {
  planInfo: IMoreInfo
}


const WrapperStyle = styled.div`
  display: flex;
`;




export const PlanInfoComponent: React.FC<Props> = (({planInfo}) => {

  console.log(planInfo)
  return (
    <WrapperStyle style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: 'center', padding: '4px'}}>
      <img style={{width: '10px', height: '10px', alignSelf: "center", paddingRight: '2px'}} src={ check } alt="My Icon"/>
      <div style={{fontSize: '15px'}}>
        {planInfo.infoTitle}
      </div>
      <div style={{fontSize: '15px'}}>
        {planInfo.moreInfo}
      </div>
    </WrapperStyle>
  );
})


export default PlanInfoComponent;



