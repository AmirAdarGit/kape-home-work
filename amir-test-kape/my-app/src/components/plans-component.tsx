import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PlanComponent } from "./plan-component";
import { IPlan, IPricing } from "../utils/interfaces";
import { allPlansFromStates } from "../utils/pricing-data";
import { getPricesByBundleFromServer, injectPlansPriceData } from "../utils/common-functions";
import { DEVICE } from "../utils/constants";

const WrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  
  @media ${ DEVICE.mobileL } {
    flex-direction: column;
    top: 105px;

  }
`;

export const PlansComponent: React.FC = (() => {

  const [planList, setPlanList] = useState<IPlan[]>();
  const [pricesList, setPricesList] = useState<IPricing | null>(null);

  useEffect(() => {
    getPricesByBundleFromServer().then((price) => {
      setPricesList(price)
    })
  }, [])


  useEffect(() => {
    if (pricesList && allPlansFromStates) {
      setPlanList(injectPlansPriceData(allPlansFromStates, pricesList))
    }else {
      console.log("Cannot get pricing")
    }
  }, [pricesList])


  return (
    <WrapperStyle>
      { planList &&
        planList.map((plan, index) => {
          return <PlanComponent key={ index } plan={ plan }/>
        }) }
    </WrapperStyle>
  );
})


export default PlansComponent;



