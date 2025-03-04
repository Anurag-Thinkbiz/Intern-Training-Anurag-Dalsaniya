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
const Login_usecase_1 = require("../../Application/use_cases/Login.usecase");
const loginUserController = (UserRepository) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const accessToken = yield UserRepository.wrapTransaction((E) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, Login_usecase_1.loginUserUsecase)(email, password, UserRepository, E);
        }));
        return res.status(201).json(accessToken);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "user credentials invalid") {
                res.status(401).send({
                    message: "Unauthorized - Invalid credentials (incorrect email or password)",
                });
            }
        }
        else {
            res.status(500).send({
                message: "Internal server error",
            });
        }
    }
});
exports.loginUserController = loginUserController;
