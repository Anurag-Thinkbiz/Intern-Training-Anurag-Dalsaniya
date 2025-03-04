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
exports.getUserDetailController = void 0;
const GetDetails_usecase_1 = require("../../Application/use_cases/GetDetails.usecase");
const getUserDetailController = (UserRepository) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, id } = res.locals;
    const isAdmin = req.query.isAdmin === "true";
    try {
        const result = yield UserRepository.wrapTransaction((E) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, GetDetails_usecase_1.getUserUsecase)(role, id, isAdmin, UserRepository, E);
        }));
        return res.status(200).send(result[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "not Finding in database") {
                res.status(404).send({
                    message: "user is not found",
                });
            }
            else {
                res.status(500).send({
                    message: "internal server error",
                });
            }
        }
    }
});
exports.getUserDetailController = getUserDetailController;
