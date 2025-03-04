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
exports.deleteUsecase = void 0;
function deleteUsecase(userdataRole, reqID, UserRepository, E) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userdataRole === "admin") {
            const requestUserData = yield UserRepository.getDetailUser(reqID, E);
            if (!requestUserData) {
                throw new Error("Requested user not exists");
            }
            if (requestUserData[0].role === "admin") {
                throw new Error(`unauthorized you can't delete admin`);
            }
            const result = yield UserRepository.deleteUser(requestUserData[0].email, E);
            if (result) {
                return true;
            }
            else {
                throw new Error("Internal server error");
            }
        }
        else {
            const requestUserData = yield UserRepository.getDetailUser(reqID, E);
            if (!requestUserData) {
                throw new Error("Requested user not exists");
            }
            if (requestUserData[0].role === "admin") {
                throw new Error(`unauthorized you can't delete admin`);
            }
            else {
                const result = yield UserRepository.deleteUser(requestUserData[0].email, E);
                if (result) {
                    return result;
                }
                else {
                    throw new Error("Internal server error");
                }
            }
        }
    });
}
exports.deleteUsecase = deleteUsecase;
