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
const Create_usecase_2 = require("../../Application/use_cases/Create.usecase");
function userCreateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, address, role } = req.body;
        if (!name || !email || !password || !address || !role) {
            res.status(404).send("please enter all detail");
        }
        try {
            const userExists = yield (0, Create_usecase_2.UserExistsUsecase)(email);
            if (userExists)
                return res.status(409).send("User already exists.");
            else {
                const result = yield (0, Create_usecase_1.CreateUserUsecase)(name, password, role, email, address);
                if (result) {
                    res.status(201).send("user created successfully");
                }
                else {
                    res.status(500).send("error in inserting data");
                }
            }
        }
        catch (error) {
            res.sendStatus(500).send(error);
        }
    });
}
exports.userCreateController = userCreateController;
