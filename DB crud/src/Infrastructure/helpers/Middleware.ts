// token validation is here
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function authUserWithToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) res.status(400).send("token is not there");
  else {
    try {
      const decode: jwt.JwtPayload = jwt.verify(
        token,
        process.env.ACCESSTOKEN!
      ) as jwt.JwtPayload;
      if (decode) {
        res.locals = decode;
        next();
      }
    } catch (error) {
      res.status(401).send("token is not valid");
    }
  }
}
