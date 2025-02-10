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
const sqlquery_1 = require("../repositories/sqlquery");
function authUserWithToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token)
            res.status(400).send("token is not there");
        else {
            try {
                const decode = jsonwebtoken_1.default.verify(token, process.env.ACCESSTOKEN);
                if (decode) {
                    if (decode.role === "user") {
                        const data = yield (0, sqlquery_1.getUserDataByEmailQueryRoleUser)(decode.email);
                        req.body = data;
                        next();
                    }
                    else {
                        const data = yield (0, sqlquery_1.getUserDataByEmailQueryRoleAdmin)();
                        req.body = data;
                        next();
                    }
                }
                next();
            }
            catch (error) {
                res.status(400).send("token is not valid");
                console.log(error);
            }
        }
    });
}
exports.authUserWithToken = authUserWithToken;
