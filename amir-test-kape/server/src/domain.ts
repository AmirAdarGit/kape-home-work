import { User } from "./database/user-db/user-model";
import { Event } from "./database/events-db/event-model";
import { createNewEventObject } from "./database/db-domain";


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

