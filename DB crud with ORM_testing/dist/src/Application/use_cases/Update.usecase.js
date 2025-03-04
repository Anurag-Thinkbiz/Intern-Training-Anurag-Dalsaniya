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
exports.updateUserUsecase = void 0;
function updateUserUsecase(userData, LoginUserID, UserRepository, E) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userData.id !== LoginUserID) {
            throw new Error("you are not authorize user to update data");
        }
        const userExists = yield UserRepository.getDetailUser(userData.id, E);
        if (!userExists) {
            throw new Error("User not exists.");
        }
        const data = yield UserRepository.updateUser(userData, userData.id, E);
        if (data) {
            return true;
        }
        else {
            throw new Error("Internal server error");
        }
    });
}
exports.updateUserUsecase = updateUserUsecase;
