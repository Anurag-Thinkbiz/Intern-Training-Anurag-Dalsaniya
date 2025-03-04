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
exports.CreateUserUsecase = void 0;
function CreateUserUsecase(UserRepository, data, E) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = data;
        const userExists = yield UserRepository.getDetail(email, E);
        if (userExists) {
            throw new Error("User already exists.");
        }
        const result = yield UserRepository.createUser(data, E);
        if (result)
            return true;
        else
            return false;
    });
}
exports.CreateUserUsecase = CreateUserUsecase;
