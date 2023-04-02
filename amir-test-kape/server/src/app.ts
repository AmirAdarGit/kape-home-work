import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createNewUserId, getAllPriceFromDb, getPriceByBundleFromDb, insertEvent } from "./domain";
import dotenv from 'dotenv';
import  db  from './database/db-connection';
import { createNewTable } from "./database/prices-db/create-prices-collection";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const router: Router = express.Router();
app.use('/', router);

db.getConnection();



router.get('/getPriceByBundle', async (req: Request, res: Response) => {
  const bundle = req.query.bundle as string;
  const currency = req.query.currency as string;
  let prices;
  if (bundle && bundle !== '*') {
    prices = await getPriceByBundleFromDb(bundle, currency)
  }
  else {
    prices = await getAllPriceFromDb();
  }
  if (prices) {
    res.json({ prices });
  } else {
    res.status(404).json({ error: 'Price not found' });
  }
});

router.post('/userEvents', async (req: Request, res: Response) => {
  let { eventType, userId } = req.body;

  if (!userId) {
    userId = await createNewUserId();
    //return the new user id to the client and save it on the local storage
  }
  if (!eventType) {
    await insertEvent(eventType)
    // throw error
  }
  // from the created user add to the event db the new event with the corresponding data and the user id

  console.log("eventType",eventType, "userId",userId)
  res.json({userId: userId})
});


router.post('/createPriceModel', async (req: Request, res: Response) => {
  console.log("create db...")
  await createNewTable()
});





export default app;
