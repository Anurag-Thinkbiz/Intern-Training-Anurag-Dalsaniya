"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).max(10).required(),
    password: joi_1.default
        .string()
        .required()
        .pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    role: joi_1.default.string().valid("user", "admin").required(),
    address: joi_1.default.string().required().max(100),
    email: joi_1.default.string().email().required(),
});
