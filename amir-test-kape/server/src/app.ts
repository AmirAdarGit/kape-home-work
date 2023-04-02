import express, { Request, Response, Router, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createNewUserId, getAllPriceFromDb, getPriceByBundleFromDb, insertEvent } from "./domain";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import  db  from './database/db-connection';
import { createNewTable } from "./database/prices-db/create-prices-collection";
import { sign } from "crypto";

export const LOCAL_HOST = 'http://localhost:3000';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const whitelist = [
  LOCAL_HOST,
];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));
const router: Router = express.Router();
app.use('/', router);

db.getConnection();
const permissions: any = { jwtToken: process.env.JWT_TOKEN_SECRET };


const authMiddleware  = (permission: any) => {
  return async function (req: any, res: Response, next: NextFunction) {
    if (!permission) throw new Error("secret must be provided");

    let userId;
    const secret = permission.jwtToken;
    const authorization = req.headers.authorization;
    if (!authorization) {
      userId = await createNewUserId();
      res.json ({ token: jwt.sign({ id: userId }, secret) })
    }
    else {
      userId = jwt.verify(authorization, secret)
    }
    req.userId = userId;
    next()
  }
}

router.get('/getPriceByBundle', authMiddleware(permissions), async (req: Request, res: Response) => {
  try {
    const bundle = req.query.bundle as string;
    const currency = req.query.currency as string;

    let prices;
    if (bundle && bundle !== '*') {
      prices = await getPriceByBundleFromDb(bundle, currency)
    }
    else {
      prices = await getAllPriceFromDb();
    }
    if (!prices) {
      res.status(200).json({ error: 'Price not found' });
    } else {
      res.json({ prices });
    }
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.post('/userEvents', authMiddleware(permissions), async (req: Request, res: Response) => {
  try {
    let { eventType, userId, planTitle } = req.body;

    if (!eventType) {
      throw new Error("Missing params")
    }

    if (!userId) {
      userId = await createNewUserId();
    }

    const newEvent = await insertEvent(eventType, userId, planTitle)

    res.json({userId: userId, newEvent: newEvent})
  } catch (e) {
    console.log("Error:", e)
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


router.post('/createPriceModel', async (req: Request, res: Response) => {
  console.log("create db...")
  await createNewTable()
});





export default app;
