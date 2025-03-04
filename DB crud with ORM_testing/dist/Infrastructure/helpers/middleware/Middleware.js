"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserWithToken = void 0;
// token validation is here
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authUserWithToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        console.log(token);
        if (!token)
            res.status(401).send({
                message: "Please provide token",
            });
        else {
            try {
                const decode = jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKEN);
                if (decode) {
                    res.locals = decode;
                    next();
                }
            }
            catch (error) {
                res.status(401).send({
                    message: "invalid Token",
                });
            }
        }
    });
}
exports.authUserWithToken = authUserWithToken;
