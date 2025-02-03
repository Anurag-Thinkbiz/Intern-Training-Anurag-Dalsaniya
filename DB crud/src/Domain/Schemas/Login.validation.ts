//joi validation
import { NextFunction, Response, Request } from "express";
import { User } from "../modals/user.modals";
import joi from "joi";

function validUserForLogin(user: User) {
  const joiSchema = joi
    .object({
      password: joi.string().min(8).max(16).alphanum().required(),
      email: joi.string().email().required(),
    })
    .options({ abortEarly: false });
  return joiSchema.validate(user);
}

export function userLoginSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validUserLoginError: joi.ValidationResult = validUserForLogin(req.body);
  if (validUserLoginError.error)
    res.status(403).send(validUserLoginError.error?.details[0].message);
  else next();
}
