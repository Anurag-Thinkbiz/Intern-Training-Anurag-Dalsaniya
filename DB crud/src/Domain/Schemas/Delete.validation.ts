import { NextFunction, Response, Request } from "express";

export function userDeleteSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Number.isNaN(parseInt(req.params.id)))
   throw new Error('enter ID in valid formate');
  else next();
}
