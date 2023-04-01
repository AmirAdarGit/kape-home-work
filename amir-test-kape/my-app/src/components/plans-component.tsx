import React, {useEffect, useState } from "react";
import styled from "@emotion/styled";
import  { PlanComponent } from "./plan-component";
import { IPlan } from "../utils/interfaces";
import { plans } from "../utils/pricing-data";
import { injectPlanData } from "../utils/share-function";
import { DEVICE } from "../utils/constants";

interface Props {

}


const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media ${DEVICE.mobileL} {
    flex-direction: column;
  }
  
  
`;


export const PlansComponent: React.FC<Props> = (() => {

  const [planList, setPlanList] = useState<IPlan[]>(plans);
  useEffect(() => {
    // fetch all the discounts from the get http://localhost:3001/getPriceByBundle/?bundle=*&currency=usd API
    const allPlansFromServer: any = {
      "original": {
        "essential": {
          "USD": "49.99"
        },
        "advanced": {
          "USD": "80.99"
        },
        "vpn_addon": {
          "USD": "19.99"
        }
      },
      "offers": {
        "essential": {
          "USD": "29.99"
        },
        "advanced": {
          "USD": "69.99"
        },
        "vpn_addon": {
          "USD": "19.99"
        }
      }
    }


    if (planList) {
      const copyPlans: IPlan[] = [];
      let bestDiscount = 0;
      let bestPlan: string;
      planList.forEach((thePrice: IPlan) => {
        const {
          copyPlan,
          currentBestDiscount,
          currentBestPlan
        } = injectPlanData(thePrice, allPlansFromServer, bestDiscount, bestPlan)
        bestDiscount = currentBestDiscount;
        bestPlan = currentBestPlan;
        copyPlans.push(copyPlan)
      })
      copyPlans.forEach(plan => {
        if (plan.title === bestPlan) {
          plan.isBestValue = true;
        }
      })
      console.log(copyPlans)
      setPlanList(copyPlans)
    } else {
      console.log("Cannot get pricing")
    }
  }, [])


  return (
    <WrapperStyle>
      {
        planList.map((plan, index) => {
          return <PlanComponent key={ index } plan={ plan }/>
        }) }
    </WrapperStyle>
  );
})


export default PlansComponent;



