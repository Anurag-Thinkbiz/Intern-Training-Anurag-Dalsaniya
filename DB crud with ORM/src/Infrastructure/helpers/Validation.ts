import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const SchemaValidation =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate({ ...req.body,...req.query,...req.params });
    if (result.error) {
      return res.status(400).json(result.error.details);
    }
    next();
};