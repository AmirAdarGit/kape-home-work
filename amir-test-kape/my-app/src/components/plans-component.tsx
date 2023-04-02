import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PlanComponent } from "./plan-component";
import { IPlan, IPricing } from "../utils/interfaces";
import { allPlansFromStates } from "../utils/pricing-data";
import { getPricesByBundleFromServer, injectPlansPriceData } from "../utils/share-function";
import { DEVICE } from "../utils/constants";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media ${ DEVICE.mobileL } {
    flex-direction: column;
  }
`;

export const PlansComponent: React.FC = (() => {

  const [planList, setPlanList] = useState<IPlan[]>();
  const [pricesList, setPricesList] = useState<IPricing | null>(null);

  useEffect(() => {
    getPricesByBundleFromServer(setPricesList)
  }, [])


  useEffect(() => {
    if (pricesList && allPlansFromStates) {
      injectPlansPriceData(allPlansFromStates, pricesList, setPlanList)
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



