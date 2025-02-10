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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = void 0;
const Create_usecase_1 = require("../../Application/use_cases/Create.usecase");
const Login_usercase_1 = require("../../Application/use_cases/Login.usercase");
function loginUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const userExists = yield (0, Create_usecase_1.UserExistsUsecase)(email);
            if (!userExists) {
                return res.status(401).send("The requested user could not be found");
            }
            else {
                const accessToken = yield (0, Login_usercase_1.loginUserUsecase)(email, password);
                if (accessToken) {
                    return res.status(200).json({ accessToken: accessToken });
                }
                else {
                    return res.status(500).send('not generate token');
                }
            }
        }
        catch (error) {
            res.sendStatus(500).send("error while generating token");
        }
    });
}
exports.loginUserController = loginUserController;
