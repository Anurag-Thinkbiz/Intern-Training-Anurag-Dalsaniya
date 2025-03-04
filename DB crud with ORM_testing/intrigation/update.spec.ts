import request from "supertest";
import express from "express";
import { UserRepositoryPort } from "../src/Application/port/userRepositories.port";
import { AppDataSource } from "../src/Infrastructure/orm/typeorm/config/orm.config";
import { EntityManager } from "typeorm";
import jwt from "jsonwebtoken";
import router from "../src/Interface/routes/User.route";
import { User } from "../src/Infrastructure/orm/typeorm/entities/user.entity";

const app = express();
app.use(express.json());
app.use(router);


const mockUserRepository: Partial<UserRepositoryPort> = {
  wrapTransaction: jest.fn(),
};


const validToken = jwt.sign(
  { id: "123", role: "user" },
  "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow"
);
const adminToken = jwt.sign(
  { id: "124", role: "admin" },
  "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow"
);
const invalidToken = "invalid_token_123";

describe("updateUserController", () => {
  let entityManager: EntityManager;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
    await entityManager.getRepository(User).save({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      password: "password123!",
      role: "user" as any,
      address: "test address",
    });
  });

  afterEach(async () => {
    await entityManager.query("ROLLBACK;");

    await entityManager
      .getRepository(User)
      .delete({ email: "test@example.com" });
  });

  it("should return 200 on successful update", async () => {
    mockUserRepository.wrapTransaction = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .patch("/update")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ id: "123", name: "Updd User" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "successfully updated" });
  });

  it("should return 403 when unauthorized user tries to update", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(
        new Error("you are not authorize user to update data")
      );

    const response = await request(app)
      .patch("/update")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ id: "1", name: "User" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Forbidden - User does not have permission to update user",
    });
  });

  it("should return 404 when user does not exist", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("User not exists."));

    const response = await request(app)
      .patch("/update")
      .set("Authorization", `Bearer ${validToken}`)
      .send({id:'10', name: "User" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Not Found - User does not exist",
    });
  });

  //   it("should return 500 on internal server error", async () => {
  //     mockUserRepository.wrapTransaction = jest
  //       .fn()
  //       .mockRejectedValue(new Error("Some unexpected error"));

  //     const response = await request(app)
  //       .patch("/update")
  //       .set("Authorization", `Bearer ${validToken}`)
  //       .send({ name: "Upd User" });

  //     expect(response.status).toBe(500);
  //     expect(response.body).toEqual({
  //       message: "Internal server error",
  //     });
  //   });

  it("should return 401 when no Bearer token is provided", async () => {
    const response = await request(app)
      .patch("/update")
      .send({ name: "Updated User" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Please provide token" });
  });

  it("should return 401 when invalid token is provided", async () => {
    const response = await request(app)
      .patch("/update")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send({ name: "Updated User" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "invalid Token" });
  });
});
