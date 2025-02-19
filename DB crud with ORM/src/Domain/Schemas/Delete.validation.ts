import joi from "joi";

export const DeleteValidationSchema = joi
  .object({
    id: joi.string().required(),
  })
  .options({ abortEarly: false });
