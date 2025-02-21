import Joi from "joi";
export const schema = Joi.object({
  name: Joi.string().required().min(5).max(16).messages({
    "any.required": "name is required",
    "any.min": "name must be 5 characters",
    "any.max": "name must be less than 16 characters",
  }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    )
    .messages({
      "any.required": "password is required",
      "string.pattern.base": "enter a valid password formate",
      "string.max": "password must be less than 16 characters",
      "string.min": "password must be greater than 6 characters",
      "any.pattern": "password must in formate",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(40)
    .required()
    .messages({
      "any.required": "email is required",
      "string.email": "enter a valid email",
      "string.max": "email must be less than 40 characters",
    }),
  address: Joi.string().max(40).required().messages({
    "any.required": "address is required",
    "string.max": "address must be less than 40 characters",
  }),
  role: Joi.boolean().valid(true, false).required().messages({
    "any.required": "role is required",
    "any.only": "role must be a toggle value (true or false)",
  }),
});

export const loginSchema = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    )
    .messages({
      "any.required": "password is required",
      "string.password": "enter a valid password formate",
      "string.max": "password must be less than 16 characters",
      "string.min": "password must be greater than 6 characters",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(40)
    .required()
    .messages({
      "any.required": "email is required",
      "string.email": "enter a valid email",
      "string.max": "email must be less than 40 characters",
    }),
});
