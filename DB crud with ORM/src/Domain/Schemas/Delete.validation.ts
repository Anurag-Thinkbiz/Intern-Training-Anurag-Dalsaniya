import joi from "joi";

export const DeleteValidationSchema = joi
  .object({
    id: joi.string(),
  })
  .options({ abortEarly: false });
