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

const adminToken = jwt.sign({ role: "user", id: "123" }, "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow");
const anotherAdminToken = jwt.sign({ role: "admin", id: "125" }, "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow");
const userToken = jwt.sign({ role: "admin", id: "124" }, "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow");
const invalidToken = "invalidtoken";

describe("deleteUserController", () => {
  let entityManager: EntityManager;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");

    await entityManager.getRepository(User).save([
      {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        password: "password123!",
        role: "user" as any,
        address: "test address",
      },
      {
        id: "124",
        name: "Test User",
        email: "test1@example.com",
        password: "password123!",
        role: "admin" as any,
        address: "test address",
      },
      {
        id: "125",
        name: "Test User",
        email: "test2@example.com",
        password: "password123!",
        role: "admin" as any,
        address: "test address",
      },
      {
        id: "126",
        name: "Test User",
        email: "test3@example.com",
        password: "password123!",
        role: "user" as any,
        address: "test address",
      },
    ]);
  });

  afterEach(async () => {
    await entityManager.query("ROLLBACK;");
    await entityManager.getRepository(User).delete({ id: "123" });
    await entityManager.getRepository(User).delete({ id: "124" });
    await entityManager.getRepository(User).delete({ id: "125" });
    await entityManager.getRepository(User).delete({ id: "126" });
  });

  it("should allow admin to delete a normal user (200)", async () => {
    mockUserRepository.wrapTransaction = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ id: "123" });

      
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "User account successfully deleted",
    });
  });

  it("should prevent an admin from deleting another admin (403)", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("unauthorized you can't delete admin"));

    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ id: "125" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "you does not have permission to delete this user",
    });
  });

  it("should prevent a normal user from deleting an admin (403)", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("unauthorized you can't delete admin"));

    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${userToken}`)
      .query({ id: "125" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "you does not have permission to delete this user",
    });
  });

  it("should prevent a normal user from deleting another user (403)", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("Unauthorized operation"));

    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${userToken}`)
      .query({ id: "124" });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "you does not have permission to delete this user",
    });
  });

  it("should return 404 when the user to be deleted does not exist", async () => {
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("Requested user not exists"));

    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({ id: "999" }); // Admin trying to delete a non-existent user

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Not Found - User does not exist",
    });
  });

  it("should return 401 when no Bearer token is provided", async () => {
    const response = await request(app).delete("/delete").query({ id: "123" });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Please provide token" });
  });

  it("should return 401 when invalid token is provided", async () => {
    const response = await request(app)
      .delete("/delete")
      .set("Authorization", `Bearer ${invalidToken}`)
      .query({ id: "123" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "invalid Token" });
  });

  //   it("should return 500 on internal server error", async () => {
  //     mockUserRepository.wrapTransaction = jest
  //       .fn()
  //       .mockRejectedValue(new Error("Some internal error"));

  //     const response = await request(app)
  //       .delete("/delete")
  //       .set("Authorization", `Bearer ${adminToken}`)
  //       .query({ id: "3" });

  //     expect(response.status).toBe(500);
  //     expect(response.body).toEqual({ message: "Internal server error" });
  //   });
});
