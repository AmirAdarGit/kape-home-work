import { ExternalTrackEvents, IPlan, IPricing } from "./interfaces";
import axios, { AxiosResponse } from "axios";
import { GET_PRICE_BY_BUNDLE, USER_EVENT_URL } from "./constants";


export const getDiscountPercentageFunc = (oldPrice: number, newPrice: number) => {
  return Math.floor(((Number(oldPrice) - Number(newPrice)) / Number(oldPrice)) * 100);
}

export const getDiscountPerMonthFunc = (newPrice: number) => {
  return Number((newPrice / 12).toFixed(2));
}


export const sendTrackEvent = async (eventType: string, userJWT: string | null, setLandingPageComplete?: Function, planTitle?: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      USER_EVENT_URL,
      {eventType, planTitle},
      {
        headers: {
          'Authorization': `Bearer ${ userJWT }`
        }
      });

    if (eventType === ExternalTrackEvents.LANDING_PAGE && setLandingPageComplete) {
      const jwt = response.data.jwt;
      if (!userJWT) {
        localStorage.setItem('JWT', jwt);
      }
      setLandingPageComplete(true);
    }
  } catch (error: any) {
    console.error('Error:', error);
  }
}
export const getPricesByBundleFromServer = async (setPricesList: Function) => {
  try {
    const JWT = localStorage.getItem('JWT');
    const response: AxiosResponse = await axios.get(GET_PRICE_BY_BUNDLE,
      {
        headers: {
          'Authorization': `Bearer ${ JWT }`
        }
      });
    setPricesList(response.data.prices[0])
  } catch (error: any) {
    console.error('Error:', error);
  }
}

export const injectPlansPriceData = (allPlansFromStates: Array<IPlan>, pricesList: IPricing, setPlanList: Function) => {
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

}


export const injectPlanData = (thePrice: IPlan, allPlansFromServer: any, currentBestDiscount: number, currentBestPlan: string) => {
  const copyPlan = JSON.parse(JSON.stringify(thePrice))
  const type: any = copyPlan.type.toLowerCase()
  let oldPrice = allPlansFromServer.original[`${ type }`]?.USD;
  let newPrice = allPlansFromServer.offers[`${ type }`]?.USD
  if (oldPrice && newPrice) {
    copyPlan.oldPrice = parseFloat(oldPrice)
    copyPlan.price = parseFloat(newPrice)
    copyPlan.discountPercentage = getDiscountPercentageFunc(oldPrice, newPrice);
    copyPlan.monthlyPayment = (getDiscountPerMonthFunc(newPrice));
    if (currentBestDiscount < copyPlan.discountPercentage) {
      currentBestDiscount = copyPlan.discountPercentage;
      currentBestPlan = copyPlan.title;
    }
  }

  if (copyPlan.type === 'Extended') {
    oldPrice = Number(allPlansFromServer.original[`advanced`]?.USD) + Number(allPlansFromServer.original[`vpn_addon`]?.USD);
    newPrice = Number(allPlansFromServer.offers[`advanced`]?.USD) + Number(allPlansFromServer.offers[`vpn_addon`]?.USD);


    if (oldPrice && newPrice) {
      copyPlan.oldPrice = parseFloat(oldPrice.toFixed(2));
      copyPlan.price = parseFloat(newPrice.toFixed(2));
      copyPlan.discountPercentage = getDiscountPercentageFunc(oldPrice, newPrice);
      copyPlan.monthlyPayment = (getDiscountPerMonthFunc(newPrice));
      if (currentBestDiscount < copyPlan.discountPercentage) {
        currentBestDiscount = copyPlan.discountPercentage;
        currentBestPlan = copyPlan.title;
      }

    }
  }
  return {copyPlan, currentBestDiscount, currentBestPlan};
}
