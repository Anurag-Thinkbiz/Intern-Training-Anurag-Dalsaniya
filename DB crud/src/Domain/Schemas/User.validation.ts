import joi from "joi";

export const RegisterValidationSchema = joi.object({
  name: joi.string().min(1).max(10).required(),
  password: joi.string().min(8).max(16).alphanum().required(),
  role: joi.string().valid("user", "admin").required(),
  address: joi.string().required().max(100),
  email: joi.string().email().required(),
});
