import { NextFunction, Response } from "express";
import { createNewUserId } from "../domain";
import jwt from 'jsonwebtoken';


export const authMiddleware = (permission: any) => {
  return async function (req: any, res: Response, next: NextFunction) {
    if (!permission) throw new Error("secret must be provided");

    let userId;
    const secret = permission.jwtToken;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || token === 'null' || token === 'undefined') { // first time the user send request without token.
      userId = await createNewUserId();
      req.params.jwt = jwt.sign({id: userId}, secret) // pass to the next middleware to sand it back to the client for future requests.
      req.params.userId = userId;
    } else {
      userId = jwt.verify(token, secret)
      req.params.userId = userId.id;
    }
    next()
  }
}