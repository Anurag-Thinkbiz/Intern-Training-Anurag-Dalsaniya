import request from "supertest";
import { AppDataSource } from "../src/Infrastructure/orm/typeorm/config/orm.config";
import { User } from "../src/Infrastructure/orm/typeorm/entities/user.entity";
import express from "express";
import routes from "../src/Interface/routes/User.route";
import { EntityManager } from "typeorm";

const app = express();
app.use(express.json()); 
app.use(routes);

describe("POST /register (with Transaction)", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = AppDataSource.manager;
    await entityManager.query("START TRANSACTION;");
  });

  afterEach(async () => {
    await entityManager.query("delete from user;");
    await entityManager.query("rollback;");
  });

  it("should validate a user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123!",
      role:'user'
    };

    await request(app).post("/register").send(newUser).expect(400);
  });
  it("should register a new user inside a transaction", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123!",
      role: "user",
      address: "sidsar",
    };

    const response = await request(app)
      .post("/register")
      .send(newUser)
      .expect(201);

    const userRepository = AppDataSource.getRepository(User);
    const savedUser = await userRepository.findOne({
      where: { email: newUser.email },
    });

    expect(response.body).toEqual({
      message: "successfully created",
    });
    expect(savedUser).toBeDefined();
    expect(savedUser?.password).toBe(newUser.password);
  });

  it("should validate a user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123!",
      role: "user",
      address: "sidsar",
    };

    const response = await request(app)
      .post("/register")
      .send(newUser)
      .expect(409);
  });
});
