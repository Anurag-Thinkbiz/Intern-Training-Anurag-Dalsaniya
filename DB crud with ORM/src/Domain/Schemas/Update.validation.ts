import joi from "joi";

export const UpdateValidationSchema = joi
  .object({
    id: joi.string().required(),
    name: joi.string().min(1).max(10),
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      ),
    address: joi.string().max(100),
  })
  .min(2)
  .options({ abortEarly: false });
