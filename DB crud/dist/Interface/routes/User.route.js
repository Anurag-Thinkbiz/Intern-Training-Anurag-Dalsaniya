"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_validation_1 = require("../../Domain/Schemas/User.validation");
const Login_validation_1 = require("../../Domain/Schemas/Login.validation");
const user_controller_1 = require("../controllers/user.controller");
const login_controller_1 = require("../controllers/login.controller");
const Middleware_1 = require("../../Infrastructure/helpers/Middleware");
const getuser_controller_1 = require("../../Interface/controllers/getuser.controller");
const delete_controller_1 = require("../controllers/delete.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/register', User_validation_1.userRegisterSchemaValidation, user_controller_1.userCreateController);
router.post('/login', Login_validation_1.userLoginSchemaValidation, login_controller_1.loginUserController);
router.get('/getdetails', Middleware_1.authUserWithToken, getuser_controller_1.getUserDetailController);
router.delete('/delete/:id', Middleware_1.authUserWithToken, delete_controller_1.deleteUserController);
exports.default = router;
