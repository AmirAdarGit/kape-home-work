import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getDiscountPercentageFunc, getDiscountPerMonthFunc } from "../utils/share-function";
import DiscountCircleComponent from "./discount-cercle-component";
import BestValueComponent from "./best-value-component";
import BuyNowButton from "./buy-now-button-component";
import dollarIcon from '../icons/dollar.jpeg';
import { IInfoList } from '../utils/interfaces';
import PlanInfoComponent from "./plan-info-component";


interface Props {
  oldPrice: number | null,
  newPrice: number | null,
  protectionName: string,
  planInfo: IInfoList,
}


const WrapperStyle = styled.div`
  border-radius: 16px;
  width: 250px;
  height: 600px;
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


export const PlanComponent: React.FC<Props> = ({oldPrice, newPrice, protectionName, planInfo}) => {

  let [discountPercentage, setDiscountPercentage] = useState<number | null>(oldPrice);
  let [discountPerMonth, setDiscountPerMonth] = useState<number | null>(newPrice);

  useEffect(() => {
      if (newPrice && oldPrice) {
        setDiscountPercentage(getDiscountPercentageFunc(oldPrice, newPrice));
        setDiscountPerMonth(getDiscountPerMonthFunc(newPrice));
      }
    },
    [oldPrice, newPrice]
  )


  console.log(planInfo.label);
  return (
    <>
      <WrapperStyle>
        <DiscountCircleComponent discountPercentage={ discountPercentage }/>
        <PricingContentStyle>
          <BestValueComponent/>
          <div style={ {fontSize: '20px', fontWeight: 'bold', paddingTop: '8px'} }>{ protectionName }</div>
          <div style={ {fontSize: '8px'} }>Best Offer you will get</div>
          <div style={ {fontSize: '20px', fontWeight: 'bold', color: 'red', paddingTop: '16px'} }>Only
            ${ discountPerMonth }/ month
          </div>
          <div style={ {fontSize: '8px', display: 'flex', justifyContent: 'center'} }>Billed ${ newPrice }
            <div style={ {textDecoration: 'line-through', padding: "0 4px 0 4px"} }> ${ oldPrice } </div>
            <div> for the first 1 year</div>
          </div>
          <BuyNowButton/>


          <div style={ {display: 'flex', justifyContent: 'center', fontSize: '8px'} }>
            <img style={ {width: '8px', height: '8px', padding: '1px 2px 0 0 '} } src={ dollarIcon } alt="My Icon"/>
            30-day money back guarantee
          </div>
          <div
            style={ {margin: '30px', alignSelf: 'center', width: '200px', height: '1px', backgroundColor: '#f2eae3'} }/>
          <div style={ {fontSize: '12px', textAlign: 'start', paddingLeft: '20px'} }>{ planInfo.label }</div>
          <>
            { planInfo.moreInfo.map((planInfo) => {
              return <PlanInfoComponent planInfo={planInfo}/>
            })
            }
          </>

        </PricingContentStyle>
      </WrapperStyle>
    </>
  );
}

export default PlanComponent;



