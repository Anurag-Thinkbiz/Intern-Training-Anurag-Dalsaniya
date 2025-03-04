"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoginValidationSchema = joi_1.default
    .object({
    password: joi_1.default
        .string()
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
        .required(),
    email: joi_1.default.string().email().required(),
})
    .options({ abortEarly: false });
