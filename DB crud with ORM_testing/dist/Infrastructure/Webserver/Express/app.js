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
const orm_config_1 = require("../../orm/typeorm/config/orm.config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../../../swagger/swagger.json"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use("/user", User_route_1.default);
exports.db = config_1.default;
orm_config_1.AppDataSource.initialize()
    .then(() => {
    console.log("database successfully connected");
    app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.listen(port, () => {
        console.log(`Server is running on  http://localhost:${port}`);
    });
})
    .catch(() => {
    console.log("Error in initializing database");
});
