import joi from "joi";

export const LoginValidationSchema = joi
  .object({
    password: joi.string().min(8).max(16).alphanum().required(),
    email: joi.string().email().required(),
  })
  .options({ abortEarly: false });
