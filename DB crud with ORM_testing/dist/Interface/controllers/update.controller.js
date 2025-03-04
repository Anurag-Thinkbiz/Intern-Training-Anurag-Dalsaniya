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
exports.updateUserController = void 0;
const Update_usecase_1 = require("../../Application/use_cases/Update.usecase");
const updateUserController = (UserRepository) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = req.body;
    const LoginUserID = res.locals.id;
    try {
        yield UserRepository.wrapTransaction((E) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, Update_usecase_1.updateUserUsecase)(reqData, LoginUserID, UserRepository, E);
        }));
        res.status(200).send({
            message: "successfully updated",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "you are not authorize user to update data") {
                res.status(403).send({
                    message: "Forbidden - User does not have permission to update user",
                });
            }
            else if (error.message === "User not exists.") {
                res.status(404).send({
                    message: "Not Found - User does not exist",
                });
            }
            else {
                res.status(500).send({
                    message: "Internal server error",
                });
            }
        }
    }
});
exports.updateUserController = updateUserController;
