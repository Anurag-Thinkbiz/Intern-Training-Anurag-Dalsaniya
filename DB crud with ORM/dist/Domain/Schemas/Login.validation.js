"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function validUserForLogin(user) {
    const joiSchema = joi_1.default
        .object({
        password: joi_1.default.string().min(8).max(16).alphanum().required(),
        email: joi_1.default.string().email().required(),
    })
        .options({ abortEarly: false });
    return joiSchema.validate(user);
}
function userLoginSchemaValidation(req, res, next) {
    var _a;
    const validUserLoginError = validUserForLogin(req.body);
    if (validUserLoginError.error)
        res.status(403).send((_a = validUserLoginError.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
    else
        next();
}
exports.userLoginSchemaValidation = userLoginSchemaValidation;
