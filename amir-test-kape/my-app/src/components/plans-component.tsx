import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import PriceUnitComponent, { PlanComponent } from "./plan-component";
import { IPlan } from "../utils/interfaces";
import { plans } from "../utils/pricing-data";

interface Props {

}


const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
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


    // advanced = 89
    // extended = 19?
    for (let plansType in allPlansFromServer) {
      for (let plans in allPlansFromServer[plansType]) {
        // planList[plans]
        // console.log(allPlansFromServer[plansType][plans])
      }
    }

    if (planList) {
      planList.map((thePrice:IPlan)  => {
        // console.log(thePrice.type)
        const type: any = thePrice.type.toLowerCase()
        let oldPrice = allPlansFromServer.original[`${type}`]?.USD;
        let newPrice = allPlansFromServer.offers[`${type}`]?.USD
        if (oldPrice && newPrice) {
          thePrice.oldPrice = oldPrice
          thePrice.price = newPrice
        }

        if (thePrice.type === 'Extended') {
          oldPrice = Number(allPlansFromServer.original[`advanced`]?.USD) + Number(allPlansFromServer.original[`vpn_addon`]?.USD);
          newPrice = Number(allPlansFromServer.offers[`advanced`]?.USD) + Number(allPlansFromServer.offers[`vpn_addon`]?.USD) ;
          if (oldPrice && newPrice) {
            thePrice.oldPrice = oldPrice.toFixed(2);
            thePrice.price = newPrice.toFixed(2);
          }
        }

        return 0
      })
    } else {
      console.log("Cannot get pricing")
    }
  }, [])

  return (
      <div style={{display: 'flex', justifyContent:"center"}}>
      {
        planList.map((plan, index) => {
        const newPlanAsNumber: number = Number(plan.price);
        const oldPlanAsNumber: number = Number(plan.oldPrice);
          return <PlanComponent key={index} oldPrice={oldPlanAsNumber} newPrice={newPlanAsNumber} protectionName={plan.title} planInfo={plan.infoList}/>
      })}
      </div>
  );
})


export default PlansComponent;



