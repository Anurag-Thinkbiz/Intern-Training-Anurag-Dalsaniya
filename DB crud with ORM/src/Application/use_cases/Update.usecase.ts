import { EntityManager } from "typeorm";
import { CreateUser, UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../port/userRepositories.port";
export async function updateUserUsecase(
  userData: UpdateUser,
  LoginUserID: string,
  ReqID: string,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<boolean> {
  const userExists: CreateUser[] = await UserRepository.getDetailUser(ReqID, E);
  if (!userExists) {
    throw new Error("User not exists.");
  }
  if (ReqID !== LoginUserID) {
    throw new Error("you are not authorize user to update data");
  }
  const data: boolean = await UserRepository.updateUser(userData, ReqID, E);
  if (data) {
    return true;
  } else {
    throw new Error("Internal server error");
  }
}
