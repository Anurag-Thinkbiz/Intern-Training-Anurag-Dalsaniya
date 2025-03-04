import { updateUserUsecase } from "../../src/Application/use_cases/Update.usecase";
import { beforeEach, jest, describe, it, expect } from "@jest/globals";
import { EntityManager } from "typeorm";
import { AppDataSource } from "../../src/Infrastructure/orm/typeorm/config/orm.config";
import { UpdateUser } from "../../src/Domain/modals/user.modals";

describe("updateUserUseCase", () => {
  var mockUserRepository: any;
  let entityManager: EntityManager;

  beforeEach(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    entityManager = AppDataSource.manager;

    mockUserRepository = {
      updateUser: jest.fn(),
      getDetail: jest.fn(), 
    };
  });

  it("should authorize a user and update successfully", async () => {
    const updateUserData: UpdateUser = {
      id: "123",
      name: "anurag",
      address: "sidsar",
    };

    mockUserRepository.getDetail.mockResolvedValue([updateUserData]);
    mockUserRepository.updateUser.mockResolvedValue(true);

    const result = await updateUserUsecase(
      updateUserData,
      "123",
      mockUserRepository,
      entityManager
    );

    expect(mockUserRepository.getDetail).toHaveBeenCalledWith(
      updateUserData.id,
      entityManager
    );

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      updateUserData,
      updateUserData.id,
      entityManager
    );

    expect(result).toBe(true);
  });

  it("should throw an error if the user is not authorized", async () => {
    const updateUserData: UpdateUser = {
      id: "123",
      name: "anurag",
      address: "sidsar",
    };

    await expect(
      updateUserUsecase(
        updateUserData,
        "999", 
        mockUserRepository,
        entityManager
      )
    ).rejects.toThrow("you are not authorize user to update data");
  });

  it("should throw an error if the user does not exist", async () => {
    const updateUserData: UpdateUser = {
      id: "123",
      name: "anurag",
      address: "sidsar",
    };

    mockUserRepository.getDetail.mockResolvedValue([]);

    await expect(
      updateUserUsecase(
        updateUserData,
        "123",
        mockUserRepository,
        entityManager
      )
    ).rejects.toThrow("User not exists.");
  });

  it("should throw an internal server error if update fails", async () => {
    const updateUserData: UpdateUser = {
      id: "123",
      name: "anurag",
      address: "sidsar",
    };

    mockUserRepository.getDetail.mockResolvedValue([updateUserData]);
    mockUserRepository.updateUser.mockResolvedValue(false);

    await expect(
      updateUserUsecase(
        updateUserData,
        "123",
        mockUserRepository,
        entityManager
      )
    ).rejects.toThrow("Internal server error");
  });
});
