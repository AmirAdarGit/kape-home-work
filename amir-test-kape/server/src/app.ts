import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createNewUserId, insertEvent } from "./domain";
import dotenv from 'dotenv';
import db from './database/db-connection';
import { Event } from "./database/events-db/event-model";
import { User } from "./database/user-db/user-model";
import { authMiddleware } from "./auth-middlware/authmiddleware";
import { IJwtToken } from "./interfaces/interfaces";
import { getAllPriceFromDb, getPriceByBundleFromDb } from "./database/db-domain";


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const whitelist = [
  process.env.HOST
];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));
const router: Router = express.Router();
app.use('/', router);

db.getConnection();
const permissions: IJwtToken = {jwtToken: process.env.JWT_TOKEN_SECRET};


router.get('/getPriceByBundle', authMiddleware(permissions), async (req: Request, res: Response) => {
  try {
    const bundle = req.query.bundle as string;
    const currency = req.query.currency as string;
    let prices;
    if (bundle && bundle !== '*') {
      prices = await getPriceByBundleFromDb(bundle, currency)
    } else {
      prices = await getAllPriceFromDb(currency.toUpperCase());
    }
    if (!prices) {
      res.status(200).json([]);
    } else {
      res.json({prices});
    }
  } catch (e) {
    res.status(500).json({error: `Internal Server Error: ${ e.message }`});
  }

});

router.post('/userEvents', authMiddleware(permissions), async (req: Request, res: Response) => {
  try {
    let {eventType, planTitle} = req.body;
    let {userId} = req.params;
    const jwt = req.params.jwt; // will pass from the authMiddleware only at the firs time when the client does not have JWT yet.
    if (!eventType) {
      throw new Error("Missing params")
    }

    if (!userId) {
      userId = await createNewUserId();
    }

    const newEvent = await insertEvent(eventType, userId, planTitle)
    res.json({newEvent: newEvent, jwt})// the jwt will send back only at the first time when the client in order to save it for the next requests.
  } catch (e) {
    res.status(500).json({error: `Internal Server Error: ${ e.message }`});
  }

});


router.delete('/delete-users-and-events-from-db', async (req: Request, res: Response) => {
  await Event.deleteMany({});
  await User.deleteMany({});
  res.status(200).json({message: 'Events and User documents removed from the events collection'});
});


export default app;
