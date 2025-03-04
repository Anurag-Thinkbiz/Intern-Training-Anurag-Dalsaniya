import joi from "joi";

export const RegisterValidationSchema = joi.object({
  name: joi.string().min(1).max(10).required(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    ),
  role: joi.string().valid("user", "admin").required(),
  address: joi.string().required().max(100),
  email: joi.string().email().required(),
});
