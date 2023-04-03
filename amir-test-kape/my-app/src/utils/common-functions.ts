import { ExternalTrackEvents, IPlan, IPricing } from "./interfaces";
import axios, { AxiosResponse,  } from "axios";
import {
  EXTENDED,
  GET_PRICE_BY_BUNDLE,
  JWT,
  USER_EVENT_URL,
  VPN_ADDON,
  ADVANCED,
} from "./constants";

export const getDiscountPercentageFunc = (oldPrice: number, newPrice: number) => {
  return Math.floor(((Number(oldPrice) - Number(newPrice)) / Number(oldPrice)) * 100);
}

export const getDiscountPerMonthFunc = (newPrice: number) => {
  return Number((newPrice / 12).toFixed(2));
}

export const sendTrackEvent = async (eventType: string, token: string | null, planTitle?: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      USER_EVENT_URL,
      {eventType, planTitle},
      {
        headers: {
          'Authorization': `Bearer ${ token }`
        }
      });

    if (eventType === ExternalTrackEvents.LANDING_PAGE) {
      const jwt = response.data.jwt;
      if (!token) {
        localStorage.setItem(JWT, jwt);
      }
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
export const getPricesByBundleFromServer = async () => {
  try {
    const jwtFromLocalStorage = localStorage.getItem(`${JWT}`);
    const response: AxiosResponse = await axios.get(GET_PRICE_BY_BUNDLE,
      {
        headers: {
          'Authorization': `Bearer ${ jwtFromLocalStorage }`
        }
      });
    return response.data.prices[0];
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

export const injectPlansPriceData = (allPlansFromStates: Array<IPlan>, pricesList: IPricing) => {
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
  return(filteredPlans)
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

  if (copyPlan.type === EXTENDED) {
    oldPrice = Number(allPlansFromServer.original[ADVANCED]?.USD) + Number(allPlansFromServer.original[VPN_ADDON]?.USD);
    newPrice = Number(allPlansFromServer.offers[ADVANCED]?.USD) + Number(allPlansFromServer.offers[VPN_ADDON]?.USD);


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
