"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function validUser(user) {
    const joiSchema = joi_1.default
        .object({
        name: joi_1.default.string().min(1).max(10).required(),
        password: joi_1.default.string().min(8).max(16).alphanum().required(),
        role: joi_1.default.string().valid("user", "admin").required(),
        address: joi_1.default.string().required().max(100),
        email: joi_1.default.string().email().required(),
    })
        .options({ abortEarly: false });
    return joiSchema.validate(user);
}
function userRegisterSchemaValidation(req, res, next) {
    var _a;
    const validUserError = validUser(req.body);
    if (validUserError.error)
        res.status(403).send((_a = validUserError.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
    else
        next();
}
exports.userRegisterSchemaValidation = userRegisterSchemaValidation;
