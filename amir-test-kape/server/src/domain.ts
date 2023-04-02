import { Price } from "./database/prices-db/price-model";
import { User } from "./database/user-db/user-model";

export const getAllPriceFromDb = async () => {
  const allPrices = await Price.find({})
  console.log(allPrices)
  return allPrices
}
export const getPriceByBundleFromDb = async (bundleName: string, currency: string) => { //TODO: add currency to the query
  const specificBundle = await Price.find(
    {},
    {
      [`original.${bundleName}`]: 1,
      [`offers.${bundleName}`]: 1
    }
  );
  console.log(specificBundle);

  return specificBundle
};
export const createNewUserId = async () => {
  const newUser = new User()
  const userId = await newUser.save();
  return userId._id?.toString()
};

export const insertEvent = async (eventType: string) => {
  switch (eventType) {
    case "LANDING_PAGE":
    {
      const newLandingPageEventObj = createNewLandingPageEventObject()
      // create new landing page event object
      // inset it to the db
      break;
    }
    case "PRESSED_BUY_NOW_BUTTON":
    {
      // create new press buy now bytton page event object
      // inset it to the db
      break;
    }
    default: break;
  }
}

const createNewLandingPageEventObject = () => {
  return {

  }
}