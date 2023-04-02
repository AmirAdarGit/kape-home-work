import { Prices } from "./database/prices-db/price-model";
import { User } from "./database/user-db/user-model";
import { Event } from "./database/events-db/event-model";
import { ObjectId } from "mongodb";

export const getAllPriceFromDb = async () => {
  try{
    const res = await Prices.find({});
    return res;
  } catch (e) {
    console.log(e)
  }

}
export const getPriceByBundleFromDb = async (bundleName: string, currency: string) => { //TODO: add currency to the query
  const specificBundle = await Prices.find(
    {},
    {
      [`original.${bundleName}`]: 1,
      [`offers.${bundleName}`]: 1
    }
  );
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