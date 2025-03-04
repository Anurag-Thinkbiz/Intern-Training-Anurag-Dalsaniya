import { EntityManager } from "typeorm";
import { CreateUser, UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../port/userRepositories.port";
export async function updateUserUsecase(
  userData: UpdateUser,
  LoginUserID: string,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<boolean> {
  if (userData.id !== LoginUserID) {
    throw new Error("you are not authorize user to update data");
  }
  const userExists: CreateUser[] = await UserRepository.getDetailUser(
    userData.id,
    E
  );
  if (userExists.length===0) {
    throw new Error("User not exists.");
  }
 
  const data: boolean = await UserRepository.updateUser(
    userData,
    userData.id,
    E
  );
  if (data) {
    return true;
  } else {
    throw new Error("Internal server error");
  }
}
