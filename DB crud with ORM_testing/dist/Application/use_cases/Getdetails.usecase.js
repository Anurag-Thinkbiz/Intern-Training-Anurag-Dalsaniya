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
exports.getUserUsecase = exports.getUserUsecaseByID = void 0;
function getUserUsecaseByID(reqId, UserRepository, E) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield UserRepository.getDetailUser(reqId, E);
        if (data) {
            return data;
        }
        else {
            throw new Error(`Requested user not exists`);
        }
    });
}
exports.getUserUsecaseByID = getUserUsecaseByID;
function getUserUsecase(role, id, isAdmin, UserRepository, E) {
    return __awaiter(this, void 0, void 0, function* () {
        if (role === "admin" && isAdmin) {
            const data = yield UserRepository.getDetailAdmin(E);
            if (data.length >= 1) {
                return data;
            }
            else {
                throw new Error(`not Finding in database`);
            }
        }
        else {
            const data = yield UserRepository.getDetailUser(id, E);
            if (data.length > 0) {
                return data;
            }
            else {
                throw new Error(`not Finding in database`);
            }
        }
    });
}
exports.getUserUsecase = getUserUsecase;
