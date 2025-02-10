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
exports.getUserDataQueryFromID = exports.deleteUserQueryAdmin = exports.getUserDataByEmailQueryRoleAdmin = exports.getUserDataByEmailQueryRoleUser = exports.checkForPasswordQuery = exports.UserExistsQuery = exports.CreateUserQuery = void 0;
const app_1 = require("../../Infrastructure/Webserver/Express/app");
function CreateUserQuery(name, email, role, password, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO users (name, email, role, password, address) VALUES (?, ?, ?, ?, ?)";
        const [result] = yield app_1.db.query(query, [
            name,
            email,
            role,
            password,
            address,
        ]);
        if (result.affectedRows == 1)
            return true;
        else
            throw new Error("Could not create user");
    });
}
exports.CreateUserQuery = CreateUserQuery;
//check for user exists in db or not
function UserExistsQuery(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE email = ?";
        const [result] = yield app_1.db.execute(query, [
            email,
        ]);
        if (Array.isArray(result))
            return result.length;
        else
            throw new Error("Unexpected result format");
    });
}
exports.UserExistsQuery = UserExistsQuery;
//for login check email and password match
function checkForPasswordQuery(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE email = ? ans password=?";
        const [result] = yield app_1.db.execute(query, [
            email,
            password
        ]);
        if (Array.isArray(result))
            return result.length;
        else
            throw new Error("Unexpected result format");
    });
}
exports.checkForPasswordQuery = checkForPasswordQuery;
//get data by passing email in query role=user
function getUserDataByEmailQueryRoleUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE email = ?";
        const result = yield app_1.db.query(query, [email]);
        if (result)
            return result;
        else
            throw new Error("Error while checking if user exists.");
    });
}
exports.getUserDataByEmailQueryRoleUser = getUserDataByEmailQueryRoleUser;
//get data by passing email in query role=user
function getUserDataByEmailQueryRoleAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM users";
            const result = yield app_1.db.query(query);
            return result;
        }
        catch (error) {
            console.error("Error checking if user exists:", error);
            throw new Error("Error while checking if user exists.");
        }
    });
}
exports.getUserDataByEmailQueryRoleAdmin = getUserDataByEmailQueryRoleAdmin;
function deleteUserQueryAdmin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "delete FROM users where email=?";
            const result = yield app_1.db.query(query, [email]);
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error while deleting user");
        }
    });
}
exports.deleteUserQueryAdmin = deleteUserQueryAdmin;
function getUserDataQueryFromID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM users where id=?";
            const result = yield app_1.db.query(query, [id]);
            if (Array.isArray(result) && result.length > 0) {
                return result;
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error("Error checking if user exists:", error);
            throw new Error("Error while checking if user exists.");
        }
    });
}
exports.getUserDataQueryFromID = getUserDataQueryFromID;
