import joi from "joi";

export const DeleteValidationSchema = joi
  .object({
    id: joi.number().integer(),
  })
  .options({ abortEarly: false });
