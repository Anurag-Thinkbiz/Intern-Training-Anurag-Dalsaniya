import { CreateUserUsecase } from "../../src/Application/use_cases/Create.usecase";
import { beforeEach, jest, describe, it, expect } from "@jest/globals";
import { User } from "../../src/Infrastructure/orm/typeorm/entities/user.entity";
import { EntityManager } from "typeorm";
import { AppDataSource } from "../../src/Infrastructure/orm/typeorm/config/orm.config";

describe("CreateUserUsecase", () => {
  let mockUserRepository;
  let entityManager: EntityManager;

  beforeEach(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    entityManager = AppDataSource.manager; 

    mockUserRepository = {
      getDetail: jest.fn(),
      createUser: jest.fn(),
    };
  });

  it("should create a new user when the email does not exist", async () => {
    const userData = { email: "test@example.com", name: "Test User" } as User;

    mockUserRepository.getDetail.mockResolvedValue(null);
    mockUserRepository.createUser.mockResolvedValue(true);

    const result = await CreateUserUsecase(
      mockUserRepository,
      userData,
      entityManager
    );

    expect(mockUserRepository.getDetail).toHaveBeenCalledWith(
      userData.email,
      entityManager
    );
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(
      userData,
      entityManager
    );
    expect(result).toBe(true);
  });

  it("should throw an error when the user already exists", async () => {
    const userData = { email: "test@example.com", name: "Test User" } as User;

    mockUserRepository.getDetail.mockResolvedValue(userData);

    await expect(
      CreateUserUsecase(mockUserRepository, userData, entityManager)
    ).rejects.toThrow("User already exists.");

    expect(mockUserRepository.getDetail).toHaveBeenCalledWith(
      userData.email,
      entityManager
    );
    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });

  it("should return false if user creation fails", async () => {
    const userData = { email: "test@example.com", name: "Test User" } as User;

    mockUserRepository.getDetail.mockResolvedValue(null);
    mockUserRepository.createUser.mockResolvedValue(false);

    const result = await CreateUserUsecase(
      mockUserRepository,
      userData,
      entityManager
    );

    expect(mockUserRepository.getDetail).toHaveBeenCalledWith(
      userData.email,
      entityManager
    );
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(
      userData,
      entityManager
    );
    expect(result).toBe(false);
  });
});
