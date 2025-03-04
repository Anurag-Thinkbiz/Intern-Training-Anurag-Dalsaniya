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
exports.UserRepository = void 0;
const user_entity_1 = require("../../orm/typeorm/entities/user.entity");
const transaction_1 = require("../../helpers/transaction");
exports.UserRepository = {
    createUser: (user, E) => __awaiter(void 0, void 0, void 0, function* () {
        const savedUser = yield E.createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values(user)
            .execute();
        return savedUser.identifiers.length > 0;
    }),
    loginUser: (loginUser, E) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = loginUser;
        const result = yield E.createQueryBuilder()
            .select(["user.id", "user.role"])
            .from(user_entity_1.User, "user")
            .where("user.email = :email", { email })
            .andWhere("user.password = :password", { password })
            .getOne();
        return result;
    }),
    updateUser: (updateUser, reqID, E) => __awaiter(void 0, void 0, void 0, function* () {
        const queryBuilder = yield E.createQueryBuilder()
            .update(user_entity_1.User)
            .set(updateUser)
            .where("id = :id", { id: reqID })
            .execute();
        return queryBuilder.affected && queryBuilder.affected > 0;
    }),
    deleteUser: (email, E) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield E.createQueryBuilder()
            .delete()
            .from(user_entity_1.User)
            .where("email = :email", { email })
            .execute();
        return result.affected === 1;
    }),
    getDetail: (email, E) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield E.createQueryBuilder()
            .select([
            "user.id",
            "user.name",
            "user.email",
            "user.role",
            "user.address",
            "user.password",
        ])
            .from(user_entity_1.User, "user")
            .where("user.email = :email", { email })
            .getOne();
        return result;
    }),
    getDetailAdmin: (E) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield E.createQueryBuilder()
            .select([
            "user.id",
            "user.name",
            "user.email",
            "user.role",
            "user.address",
            "user.password",
        ])
            .from(user_entity_1.User, "user")
            .getMany();
        return result;
    }),
    getDetailUser: (id, E) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield E.createQueryBuilder()
            .select([
            "user.id as id",
            "user.name as name",
            "user.email as email",
            "user.role as role",
            "user.address as address",
            "user.password as password",
        ])
            .from(user_entity_1.User, "user")
            .where("user.id = :id", { id })
            .getRawMany();
        return result;
    }),
    wrapTransaction: transaction_1.wrapTransaction,
};
