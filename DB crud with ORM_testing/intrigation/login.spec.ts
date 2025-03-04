import request from "supertest";
import { loginUserController } from "../src/Interface/controllers/login.controller";
import { UserRepositoryPort } from "../src/Application/port/userRepositories.port";
import { AppDataSource } from "../src/Infrastructure/orm/typeorm/config/orm.config";
import express from "express";
import { EntityManager } from "typeorm";
import { LoginUser, UserRole } from "../src/Domain/modals/user.modals";
import routes from "../src/Interface/routes/User.route";
import { User } from "../src/Infrastructure/orm/typeorm/entities/user.entity";
const app = express();
app.use(express.json());
app.use(routes);

// Mock UserRepository
const mockUserRepository: Partial<UserRepositoryPort> = {
  wrapTransaction: jest.fn(),
};

describe("loginUserController", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");

    await entityManager.getRepository(User).save({
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

  it("should return 400 and validate data", async () => {
    const req: LoginUser = { email: "test@example.com", password: "password" };
    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockResolvedValue({ token: "fake_token" });

    const response = await request(app).post("/login").send(req);

    expect(response.status).toBe(400);
  });

  it("should return 201 and access token on successful login", async () => {
    const req: LoginUser = {
      email: "test@example.com",
      password: "password123!",
    };

    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockResolvedValue({ token: "fake_token" });

    const response = await request(app).post("/login").send(req);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const req = { body: { email: "wrong@example.com", password: "wrongpass" } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    mockUserRepository.wrapTransaction = jest
      .fn()
      .mockRejectedValue(new Error("user credentials invalid"));

    await loginUserController(mockUserRepository as UserRepositoryPort)(
      req as any,
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message:
        "Unauthorized - Invalid credentials (incorrect email or password)",
    });
  });
  // it("should return 500 for an internal server error", async () => {
  //   const req = { email: "test@example.com", password: "password123!" };

  //   mockUserRepository.wrapTransaction = jest
  //     .fn()
  //     .mockRejectedValue(new Error("Some other error"));

  //   const res = await request(app).post("/login").send(req);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.body).toHaveBeenCalledWith({
  //     message: "Internal server error",
  //   });
  // });
});
