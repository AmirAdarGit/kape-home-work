import { Prices } from "./database/prices-db/price-model";
import { User } from "./database/user-db/user-model";
import { Event } from "./database/events-db/event-model";
import { ObjectId } from "mongodb";

export const getAllPriceFromDb = async (currency: string) => {
  try{
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
  } catch (e) {
    console.log(e)
  }

}
export const getPriceByBundleFromDb = async (bundleName: string, currency: string) => {
  const specificBundle = await Prices.find(
    {},
    {
      [`original.${bundleName}.${currency.toUpperCase()}`]: 1,
      [`offers.${bundleName}.${currency.toUpperCase()}`]: 1
    }
  );
  console.log(currency)

  return specificBundle
};
export const createNewUserId = async () => {
  const newUser = new User()
  const userId = await newUser.save();
  return userId._id?.toString()
};

export const insertEvent = async (eventType: string, userId: string, planTitle?: string) => {
  const eventObj = createNewEventObject(userId, eventType, planTitle)
  const newEvent = new Event(eventObj)
  return  await newEvent.save();
}

const createNewEventObject = (userId: string, eventType: string, planTitle?: string) => {
  return {
    userId: new ObjectId(userId),
    eventType: eventType,
    planTitle: planTitle
  }

}