import joi from "joi";

export const UpdateValidationSchema = joi
  .object({
    id:joi.number().integer(),
    name: joi.string().min(1).max(10),
    password: joi.string().min(8).max(16).alphanum(),
    address: joi.string().max(100),
  })
  .options({ abortEarly: false });
