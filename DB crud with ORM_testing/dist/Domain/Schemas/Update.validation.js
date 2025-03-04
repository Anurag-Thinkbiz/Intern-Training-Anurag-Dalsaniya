"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UpdateValidationSchema = joi_1.default
    .object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().min(1).max(10),
    password: joi_1.default
        .string()
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    address: joi_1.default.string().max(100),
})
    .min(2)
    .options({ abortEarly: false });
