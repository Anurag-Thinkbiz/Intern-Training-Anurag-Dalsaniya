"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../config/config"));
const User_route_1 = __importDefault(require("../../../Interface/routes/User.route"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(express_1.default.json());
app.use("/user", User_route_1.default);
exports.db = config_1.default;
exports.db.connect()
    .then((data) => console.log("connect successfully"))
    .catch((err) => {
    console.log("error in DB connection");
    console.log(err);
});
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
