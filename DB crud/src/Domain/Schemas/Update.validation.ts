//joi validation
import { NextFunction, Response, Request } from "express";
import { User } from "../modals/user.modals";
import joi from "joi";

function validUser(user: User) {
  const joiSchema = joi
    .object({
      name: joi.string().min(1).max(10),
      password: joi.string().min(8).max(16).alphanum(),
      address: joi.string().max(100),
    })
    .options({ abortEarly: false });
  return joiSchema.validate(user);
}
export function userUpdateSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Number.isNaN(parseInt(req.params.id)))
    res.status(403).send("enter ID in valid formate");

  if (Object.keys(req.body).length === 0)
    res.status(400).send("request body is empty");
  else {
    const validUserError: joi.ValidationResult = validUser(req.body);
    if (validUserError.error)
      res.status(403).send(validUserError.error?.details[0].message);
    else {
      next();
    }
  }
}
