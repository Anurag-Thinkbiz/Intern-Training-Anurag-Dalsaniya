import { loginUserUsecase } from "../../src/Application/use_cases/Login.usecase";
import { UserRepositoryPort } from "../../src/Application/port/userRepositories.port";
import { EntityManager } from "typeorm";
import jwt from "jsonwebtoken";
import { beforeEach, jest, describe, it, expect } from "@jest/globals";
import { LoginUser } from "../../src/Domain/modals/user.modals";
import { User } from "../../src/Infrastructure/orm/typeorm/entities/user.entity";

describe("loginUserUsecase", () => {
  let mockUserRepository: jest.Mocked<UserRepositoryPort>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    mockUserRepository = {
      loginUser: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    mockEntityManager = {} as jest.Mocked<EntityManager>;
  });

  it("should return a valid JWT token when credentials are correct", async () => {
    process.env.ACCESSTOKEN = "test_secret";
    const mockUser = { id: '1', role: "user" } as any;
    mockUserRepository.loginUser.mockResolvedValue(mockUser);

    const token = await loginUserUsecase("test@example.com", "password123", mockUserRepository, mockEntityManager);
    
    expect(token).toBeDefined();
    const decoded = jwt.verify(token, process.env.ACCESSTOKEN!);
    expect(decoded).toHaveProperty("id", mockUser.id);
    expect(decoded).toHaveProperty("role", mockUser.role);
  });

  it("should throw an error if credentials are invalid", async () => {
    mockUserRepository.loginUser.mockResolvedValue(null as any);
    
    await expect(loginUserUsecase("wrong@example.com", "wrongpass", mockUserRepository, mockEntityManager))
      .rejects.toThrow("user credentials invalid");
  });

  it("should throw an error if token generation fails", async () => {
    process.env.ACCESSTOKEN = "test_secret";
    const mockUser = { id: 1, role: "user" } as any;
    mockUserRepository.loginUser.mockResolvedValue(mockUser);
    jest.spyOn(jwt, "sign").mockImplementation(() => "");
    
    await expect(loginUserUsecase("test@example.com", "password123", mockUserRepository, mockEntityManager))
      .rejects.toThrow("error in generating Token");
  });
});
