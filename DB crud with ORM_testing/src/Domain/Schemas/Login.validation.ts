import joi from "joi";

export const LoginValidationSchema = joi
  .object({
    password: joi
      .string()
      .pattern(
        new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      )
      .required(),
    email: joi.string().email().required(),
  })
  .options({ abortEarly: false });
