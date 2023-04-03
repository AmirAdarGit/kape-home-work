import { Prices } from "./prices-db/price-model";
import { ObjectId } from "mongodb";

export const getAllPriceFromDb = async (currency: string) => {
    // if there are more plans type in the future need to manage here (add the original and offers of them)
    const res = await Prices.find({},{
      [`original.essential.${currency}`]: 1,
      [`original.advanced.${currency}`]: 1,
      [`original.vpn_addon.${currency}`]: 1,
      [`offers.essential.${currency}`]: 1,
      [`offers.advanced.${currency}`]: 1,
      [`offers.vpn_addon.${currency}`]: 1
    });
    return res;
}
export const getPriceByBundleFromDb = async (bundleName: string, currency: string) => {
  const specificBundle = await Prices.find(
    {},
    {
      [`original.${bundleName}.${currency.toUpperCase()}`]: 1,
      [`offers.${bundleName}.${currency.toUpperCase()}`]: 1
    }
  );
  return specificBundle
};
export const createNewEventObject = (userId: string, eventType: string, planTitle?: string) => {
  return {
    userId: new ObjectId(userId),
    eventType: eventType,
    planTitle: planTitle
  }
}