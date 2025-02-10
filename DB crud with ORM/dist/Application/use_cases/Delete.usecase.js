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
exports.deleteUserUsecaseUser = exports.deleteUserUsecaseAdmin = void 0;
const sqlquery_1 = require("../../Infrastructure/repositories/sqlquery");
function deleteUserUsecaseAdmin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('deleteUserUsecaseAdmin');
            const data = yield (0, sqlquery_1.deleteUserQueryAdmin)(email);
        }
        catch (error) {
            console.error("Error generating deleting user by admin:", error);
            throw new Error("Error during deleting user by admin");
        }
    });
}
exports.deleteUserUsecaseAdmin = deleteUserUsecaseAdmin;
function deleteUserUsecaseUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sqlquery_1.deleteUserQueryAdmin)(email);
        }
        catch (error) {
            console.error("Error generating deleting user by user:", error);
            throw new Error("Error generating deleting user by user:");
        }
    });
}
exports.deleteUserUsecaseUser = deleteUserUsecaseUser;
