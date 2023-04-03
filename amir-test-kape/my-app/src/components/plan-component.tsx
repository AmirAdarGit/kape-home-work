import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getDiscountPercentageFunc, getDiscountPerMonthFunc } from "../utils/common-functions";
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
import {
  PriceTitleStyled,
  PriceSubTitleStyled,
  MonthlyPayStyled,
  BilledTitleStyled,
  BilledPreviewPriceTitleStyled,
  PayBackTitleStyled,
  DollarIconStyled,
  SeparatorStyled,
  PlanInfoTitleStyles
} from "../style/plan-component-styled";


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
          { plan.isBestValue && <BestValueComponent/> }
          <PriceTitleStyled>{ plan.title }</PriceTitleStyled>
          <PriceSubTitleStyled>{ !plan.isBestValue ? `${ plan.subTitle }` : BEST_OFFER_YOU_WILL_GET }</PriceSubTitleStyled>
          <MonthlyPayStyled>{ getDiscountPerMonthAsString(discountPerMonth) }</MonthlyPayStyled>
          <BilledTitleStyled>
            { BILLED } ${ plan.price }
            <BilledPreviewPriceTitleStyled> ${ plan.oldPrice }</BilledPreviewPriceTitleStyled>{FOR_THE_FIRST_YEAR}
          </BilledTitleStyled>
          <BuyNowButton planTitle={ plan.title }/>

          <PayBackTitleStyled>
            <DollarIconStyled src={ dollarIcon } alt="My Icon"/>
            { DAYS_MONEY_BACK_GUARANTEE }
          </PayBackTitleStyled>
          <SeparatorStyled/>
          <PlanInfoTitleStyles>{ plan.infoList.label }</PlanInfoTitleStyles>
          <>
            { plan.isBestValue &&
                <PlanInfoComponent planInfo={ generateInfoTitleForBestValuePlan(plan.discountPercentage) }/> }
            { plan.infoList.moreInfo.map((planInfo, index) => {
              return <PlanInfoComponent planInfo={ planInfo } key={ index }/>
            })
            }
          </>

        </PricingContentStyle>
      </WrapperStyle>
    </>
  );
}

export default PlanComponent;



