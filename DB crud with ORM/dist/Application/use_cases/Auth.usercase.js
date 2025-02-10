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
exports.loginUserUsecase = void 0;
//controller logic
//sign function
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginUserUsecase(email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = { email, password, role };
            const accessToken = jsonwebtoken_1.default.sign(userData, process.env.ACCESSTOKEN);
            return { accessToken };
        }
        catch (error) {
            console.error('Error generating access token:', error);
            throw new Error('Error during user login');
        }
    });
}
exports.loginUserUsecase = loginUserUsecase;
// call query
