import { deleteUsecase } from "../../src/Application/use_cases/Delete.usecase";
import { beforeEach, jest, describe, it, expect } from "@jest/globals";
import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../src/Application/port/userRepositories.port";
import { CreateUser } from "../../src/Domain/modals/user.modals";

describe("deleteUsecase", () => {
  let mockUserRepository: jest.Mocked<UserRepositoryPort>;
  let entityManager: EntityManager;

  beforeEach(() => {
    mockUserRepository = {
      getDetailUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    entityManager = {} as EntityManager;
  });

  it("should delete the user successfully if requester is admin", async () => {
    const mockUser: CreateUser[] = [
      { id: "123", email: "test@example.com", role: "user" },
    ] as CreateUser[];

    mockUserRepository.getDetailUser.mockResolvedValue(mockUser);
    mockUserRepository.deleteUser.mockResolvedValue(true);

    const result = await deleteUsecase(
      "admin",
      "123",
      mockUserRepository,
      entityManager
    );

    expect(mockUserRepository.getDetailUser).toHaveBeenCalledWith(
      "123",
      entityManager
    );
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(
      "test@example.com",
      entityManager
    );
    expect(result).toBe(true);
  });

  it("should throw an error if the requested user does not exist", async () => {
    mockUserRepository.getDetailUser.mockResolvedValue([]);

    await expect(
      deleteUsecase("admin", "123", mockUserRepository, entityManager)
    ).rejects.toThrow("Requested user not exists");
  });

  it("should throw an error if trying to delete an admin user", async () => {
    const mockUser: CreateUser[] = [
      { id: "123", email: "admin@example.com", role: "admin" },
    ] as CreateUser[];

    mockUserRepository.getDetailUser.mockResolvedValue(mockUser);

    await expect(
      deleteUsecase("admin", "123", mockUserRepository, entityManager)
    ).rejects.toThrow("unauthorized you can't delete admin");
  });

  it("should throw an internal server error if delete operation fails", async () => {
    const mockUser: CreateUser[] = [
      { id: "123", email: "test@example.com", role: "user" },
    ] as CreateUser[];

    mockUserRepository.getDetailUser.mockResolvedValue(mockUser);
    mockUserRepository.deleteUser.mockResolvedValue(false);

    await expect(
      deleteUsecase("admin", "123", mockUserRepository, entityManager)
    ).rejects.toThrow("Internal server error");
  });
});
