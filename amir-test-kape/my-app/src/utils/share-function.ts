import { IPlan } from "./interfaces";


export const getDiscountPercentageFunc = (oldPrice: number, newPrice: number) => {
  return Math.floor(((Number(oldPrice) - Number(newPrice))/Number(oldPrice)) * 100);
}

export const getDiscountPerMonthFunc = (newPrice: number) => {
  return Number((newPrice/12).toFixed(2));
}

export const injectPlanData = (thePrice: IPlan, allPlansFromServer: any, currentBestDiscount: number, currentBestPlan: string) => {
  const copyPlan = JSON.parse(JSON.stringify(thePrice))
  const type: any = copyPlan.type.toLowerCase()
  let oldPrice = allPlansFromServer.original[`${type}`]?.USD;
  let newPrice = allPlansFromServer.offers[`${type}`]?.USD
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
    newPrice = Number(allPlansFromServer.offers[`advanced`]?.USD) + Number(allPlansFromServer.offers[`vpn_addon`]?.USD) ;


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




