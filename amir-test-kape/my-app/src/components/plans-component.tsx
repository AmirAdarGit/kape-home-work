import React, { useEffect, useState } from "react";
import { PlanComponent } from "./plan-component";
import { IPlan, IPricing } from "../utils/interfaces";
import { allPlansFromStates } from "../utils/pricing-data";
import { getPricesByBundleFromServer, injectPlansPriceData } from "../utils/common-functions";
import { WrapperStyle }  from "../style/plans-component-styled";



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



