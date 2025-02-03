//joi validation
import { NextFunction, Response, Request } from "express";
import { User } from "../modals/user.modals";
import joi from "joi";

function validUser(user: User) {
  const joiSchema = joi
    .object({
      name: joi.string().min(1).max(10).required(),
      password: joi.string().min(8).max(16).alphanum().required(),
      role: joi.string().valid("user", "admin").required(),
      address: joi.string().required().max(100),
      email: joi.string().email().required(),
    })
    .options({ abortEarly: false });

  return joiSchema.validate(user);
}

export function userRegisterSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validUserError: joi.ValidationResult = validUser(req.body);
  if (validUserError.error)
    res.status(403).send(validUserError.error?.details[0].message);
  else next();
}
