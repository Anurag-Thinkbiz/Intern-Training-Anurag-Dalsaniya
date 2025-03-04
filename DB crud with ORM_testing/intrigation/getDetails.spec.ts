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
  { role: "user", id: "123" },
  "kjfsljfkslakjflsdjfnnvjfsdfjslkfjlksfeirpow"
);

describe("getUserDetailController", () => {
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

  it("should return 200 and user details on success", async () => {
    const mockUserData = [
      {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        password: "password123!",
        role: "user" as any,
        address: "test address",
      },
    ];
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockResolvedValue(mockUserData);

    const response = await request(app)
      .get("/details")
      .set("Authorization", `Bearer ${validToken}`)
      .query({ isAdmin: false });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserData[0]);
  });

  it("if isAdmin is false than show details", async () => {
    const mockUserData = [
      {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        password: "password123!",
        role: "user" as any,
        address: "test address",
      },
    ];
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("not Finding in database"));

    const response = await request(app)
      .get("/details")
      .set("Authorization", `Bearer ${validToken}`)
      .query({ isAdmin: false });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserData[0]);
  });

  //   it("should return 500 on internal server error", async () => {
  //     mockUserRepository.wrapTransaction = jest
  //       .fn()
  //       .mockRejectedValue(new Error("Some other error"));

  //     const response = await request(app)
  //       .get("/details")
  //       .set("Authorization", `Bearer ${validToken}`)
  //       .query({ isAdmin: false });

  //     expect(response.status).toBe(500);
  //     expect(response.body).toEqual({ message: "internal server error" });
  //   });

  it("should return 401 when no Bearer token is provided", async () => {
    const response = await request(app)
      .get("/details")
      .query({ isAdmin: false });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Please provide token" });
  });

  it("should return 401 when invalid token is provided", async () => {
    const response = await request(app)
      .get("/details")
      .set("Authorization", `Bearer invalidtoken`)
      .query({ isAdmin: false });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "invalid Token" });
  });
});
