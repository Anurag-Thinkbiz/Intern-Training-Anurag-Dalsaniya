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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function loginUserUsecase(email, password, UserRepository, E) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginUser = { password, email };
        const result = yield UserRepository.loginUser(loginUser, E);
        if (result) {
            const accessToken = jsonwebtoken_1.default.sign({ id: result.id, role: result.role }, process.env.ACCESSTOKEN);
            if (!accessToken) {
                throw new Error("error in generating Token");
            }
            else {
                return accessToken;
            }
        }
        else {
            throw new Error(`user credentials invalid`);
        }
    });
}
exports.loginUserUsecase = loginUserUsecase;
