// token validation is here
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { FieldPacket, RowDataPacket } from "mysql2";
import { loginUserUsecaseForMiddleware } from "../../Application/use_cases/Login.usercase";

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
        const data: [RowDataPacket[], FieldPacket[]] =
           await loginUserUsecaseForMiddleware(decode.email);
        res.locals = data;
        next();
      } else {
        throw new Error("token is not valid");
      }
    } catch (error) {
      res.status(401).send("token is not valid");
    }
  }
}
