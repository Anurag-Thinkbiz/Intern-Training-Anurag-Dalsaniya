"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DeleteValidationSchema = joi_1.default
    .object({
    id: joi_1.default.string().required(),
})
    .options({ abortEarly: false });
