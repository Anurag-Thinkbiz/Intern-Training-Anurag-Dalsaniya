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
exports.userCreateController = void 0;
const Create_usecase_1 = require("../../Application/use_cases/Create.usecase");
const userCreateController = (UserRepository) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield UserRepository.wrapTransaction((E) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, Create_usecase_1.CreateUserUsecase)(UserRepository, req.body, E);
        }));
        if (result) {
            res.status(201).send({
                message: "successfully created",
            });
        }
        else {
            throw new Error("Internal server error.");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "User already exists.") {
                res.status(409).send({
                    message: "User already exists",
                });
            }
            else {
                res.status(500).send("Internal server error");
            }
        }
    }
});
exports.userCreateController = userCreateController;
