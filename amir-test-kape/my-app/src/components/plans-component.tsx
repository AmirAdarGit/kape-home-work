import React, {useEffect, useState } from "react";
import styled from "@emotion/styled";
import  { PlanComponent } from "./plan-component";
import { IPlan } from "../utils/interfaces";
import { allPlansFromStates } from "../utils/pricing-data";
import { injectPlanData } from "../utils/share-function";
import { DEVICE, GET_PRICE_BY_BUNDLE } from "../utils/constants";
import axios, { AxiosResponse } from "axios";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media ${DEVICE.mobileL} {
    flex-direction: column;
  }
`;

export const PlansComponent: React.FC = (() => {

  const [planList, setPlanList] = useState<IPlan[]>();
  const [pricesList, setPricesList] = useState<any>(null);//TODO: create interface


  useEffect(() => {
    const getPricesByBundleFromServer = async () => {
      try {
        const response: AxiosResponse = await axios.get(GET_PRICE_BY_BUNDLE);
        setPricesList(response.data.prices[0])
      } catch (error: any) {
        console.error('Error:', error);
      }
    }
    getPricesByBundleFromServer()
  },[])


  useEffect(() => {

    if (pricesList && allPlansFromStates) {
      const copyPlans: IPlan[] = [];
      let bestDiscount = 0;
      let bestPlan: string;
      allPlansFromStates.forEach((thePrice: IPlan) => {
        const {
          copyPlan,
          currentBestDiscount,
          currentBestPlan
        } = injectPlanData(thePrice, pricesList, bestDiscount, bestPlan)
        bestDiscount = currentBestDiscount;
        bestPlan = currentBestPlan;
        copyPlans.push(copyPlan)
      })
      const filteredPlans = copyPlans.map(plan => {
        if (plan.title === bestPlan) {
          plan.isBestValue = true;
        }
        return plan
      }).filter((plan) => {
        return plan.price !== null
      })

      setPlanList(filteredPlans)
    } else {
      console.log("Cannot get pricing")
    }
  }, [pricesList])


  return (
    <WrapperStyle>
      {planList &&
        planList.map((plan, index) => {
          return <PlanComponent key={ index } plan={ plan }/>
        }) }
    </WrapperStyle>
  );
})


export default PlansComponent;



