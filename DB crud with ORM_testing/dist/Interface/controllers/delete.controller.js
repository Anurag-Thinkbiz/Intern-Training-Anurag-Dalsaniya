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
exports.deleteUserController = void 0;
const Delete_usecase_1 = require("../../Application/use_cases/Delete.usecase");
const deleteUserController = (UserRepository) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req.query.id + '';
    try {
        const userdata = res.locals;
        if (!userdata) {
            throw new Error("Token not exists.");
        }
        else {
            yield UserRepository.wrapTransaction((E) => __awaiter(void 0, void 0, void 0, function* () {
                return yield (0, Delete_usecase_1.deleteUsecase)(userdata.role, reqId, UserRepository, E);
            }));
            res.status(200).send({
                message: "User account successfully deleted",
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Requested user not exists") {
                res.status(404).send({
                    message: "Not Found - User does not exist",
                });
            }
            else if (error.message === "Token not exists.") {
                res.status(401).send({
                    message: "Unauthorized access. Please provide a valid JWT token in the Authorization header.",
                });
            }
            else if (error.message === `unauthorized you can't delete admin`)
                res.status(403).send({
                    message: "you does not have permission to delete this user",
                });
            else {
                res.status(500).send({
                    message: "Internal server error",
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
exports.deleteUserController = deleteUserController;
