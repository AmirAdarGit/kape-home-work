import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getDiscountPercentageFunc, getDiscountPerMonthFunc } from "../utils/share-function";
import DiscountCircleComponent from "./discount-cercle-component";
import BestValueComponent from "./best-value-component";
import BuyNowButton from "./buy-now-button-component";
import dollarIcon from '../icons/dollar.jpeg';
import { IPlan } from '../utils/interfaces';
import PlanInfoComponent from "./plan-info-component";
import {
  BEST_OFFER_YOU_WILL_GET,
  BILLED,
  DAYS_MONEY_BACK_GUARANTEE,
  FOR_THE_FIRST_YEAR, generateInfoTitleForBestValuePlan,
  getDiscountPerMonthAsString
} from "../utils/constants";


interface Props {
  plan: IPlan;
}


const WrapperStyle = styled.div`
  border-radius: 16px;
  width: 250px;
  height: auto;
  background-color: white;
  position: relative;
  margin: 50px;
  border: solid black 1px;
`;

const PricingContentStyle = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const PlanComponent: React.FC<Props> = ({plan}) => {

  let [discountPercentage, setDiscountPercentage] = useState<number | null>(plan.oldPrice);
  let [discountPerMonth, setDiscountPerMonth] = useState<number | null>(plan.price);

  // calculate the discount and discount per month for every plan
  useEffect(() => {
      if (plan.price && plan.oldPrice) {
        setDiscountPercentage(getDiscountPercentageFunc(plan.oldPrice, plan.price));
        setDiscountPerMonth(getDiscountPerMonthFunc(plan.price));
      }
    },
    [plan]
  )


  return (
    <>
      <WrapperStyle>
        <DiscountCircleComponent discountPercentage={ discountPercentage }/>
        <PricingContentStyle>
          {plan.isBestValue && <BestValueComponent/>}
          <div style={ {fontSize: '20px', fontWeight: 'bold', paddingTop: '8px'} }>{ plan.title }</div>
          <div style={ {fontSize: '8px', paddingTop: '4px'} }>{!plan.isBestValue ? `${plan.subTitle}` : BEST_OFFER_YOU_WILL_GET}</div>
          <div style={ {fontSize: '20px', fontWeight: 'bold', color: 'red', paddingTop: '16px'} }>
            {getDiscountPerMonthAsString(discountPerMonth)}
          </div>
          <div style={ {fontSize: '8px', display: 'flex', justifyContent: 'center'} }>{BILLED} ${ plan.price }
            <div style={ {textDecoration: 'line-through', padding: "0 4px 0 4px"} }> ${ plan.oldPrice } </div>
            <div>{FOR_THE_FIRST_YEAR}</div>
          </div>
          <BuyNowButton planTitle={plan.title}/>


          <div style={ {display: 'flex', justifyContent: 'center', fontSize: '8px'} }>
            <img style={ {width: '8px', height: '8px', padding: '1px 2px 0 0 '} } src={ dollarIcon } alt="My Icon"/>
            {DAYS_MONEY_BACK_GUARANTEE}
          </div>
          <div
            style={ {margin: '30px', alignSelf: 'center', width: '200px', height: '1px', backgroundColor: '#f2eae3'} }/>
          <div style={ {fontSize: '12px', textAlign: 'start', paddingLeft: '8px'} }>{ plan.infoList.label }</div>
          <>
            {plan.isBestValue && <PlanInfoComponent planInfo={generateInfoTitleForBestValuePlan(plan.discountPercentage)}/>}
            { plan.infoList.moreInfo.map((planInfo, index) => {
              return <PlanInfoComponent planInfo={planInfo} key={index}/>
            })
            }
          </>

        </PricingContentStyle>
      </WrapperStyle>
    </>
  );
}

export default PlanComponent;



