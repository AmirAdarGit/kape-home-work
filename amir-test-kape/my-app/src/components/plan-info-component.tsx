import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IMoreInfo } from "../utils/interfaces";
import check from '../icons/check-solid.svg';


interface Props {
  planInfo: IMoreInfo
}


const WrapperStyle = styled.div<{shouldMark: boolean}>`
  display: flex;
  background-color: ${ (props: any) => props.shouldMark ? '#FFF9C0' : 'white' };
  border-radius: 8px;
  margin: 4px;
  
`;


export const PlanInfoComponent: React.FC<Props> = (({planInfo}) => {

  return (
    <WrapperStyle shouldMark={planInfo.isMarked}
      style={ {display: "flex", flexDirection: "row", alignItems: 'center', padding: '4px'} }>
      <img style={ {width: '13px', height: '13px', alignSelf: "start", padding: '4px'} } src={ check }
           alt="My Icon"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={ {fontSize: '15px', alignSelf: "start", fontWeight:'bold', color: `${planInfo.isBold ? "red" : "black"}`} }>
          { planInfo.infoTitle }
        </div>
        <div style={ {fontSize: '15px', textAlign: "left", } }>
          { planInfo.moreInfo }
        </div>
      </div>
    </WrapperStyle>
  );
})


export default PlanInfoComponent;



