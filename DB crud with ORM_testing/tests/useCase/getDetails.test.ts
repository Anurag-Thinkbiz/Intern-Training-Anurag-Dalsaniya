import { getUserUsecase } from "../../src/Application/use_cases/GetDetails.usecase";
import { beforeEach, jest, describe, it, expect } from "@jest/globals";
import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../src/Application/port/userRepositories.port";
import { User } from "../../src/Infrastructure/orm/typeorm/entities/user.entity";
import { CreateUser } from "../../src/Domain/modals/user.modals";

describe("getUserUsecase", () => {
  let mockUserRepository: jest.Mocked<UserRepositoryPort>;
  let entityManager: EntityManager;

  beforeEach(() => {
    mockUserRepository = {
      getDetailAdmin: jest.fn(),
      getDetailUser: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    entityManager = {} as EntityManager;
  });

  it("should return a list of users when the role is admin and isAdmin is true", async () => {
    const mockUsers: User[] = [{ id: "1", name: "Admin User" }] as User[];
    mockUserRepository.getDetailAdmin.mockResolvedValue(mockUsers);

    const result = await getUserUsecase(
      "admin",
      "",
      true,
      mockUserRepository,
      entityManager
    );

    expect(mockUserRepository.getDetailAdmin).toHaveBeenCalledWith(
      entityManager
    );
    expect(result).toEqual(mockUsers);
  });

  it("should throw an error if no admin users are found", async () => {
    mockUserRepository.getDetailAdmin.mockResolvedValue([]);

    await expect(
      getUserUsecase("admin", "", true, mockUserRepository, entityManager)
    ).rejects.toThrow("not Finding in database");
  });

  it("should return user details for a regular user", async () => {
    const mockUser: CreateUser[] = [
      { id: "123", name: "Test User" },
    ] as CreateUser[];
    mockUserRepository.getDetailUser.mockResolvedValue(mockUser);

    const result = await getUserUsecase(
      "user",
      "123",
      false,
      mockUserRepository,
      entityManager
    );

    expect(mockUserRepository.getDetailUser).toHaveBeenCalledWith(
      "123",
      entityManager
    );
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if the user is not found", async () => {
    mockUserRepository.getDetailUser.mockResolvedValue([]);

    await expect(
      getUserUsecase("user", "123", false, mockUserRepository, entityManager)
    ).rejects.toThrow("not Finding in database");
  });
});
