import { UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../port/userRepositories.port";

export async function updateUserUsecase(
  userData: UpdateUser,
  LoginUserID: number,
  ReqID: number,
  UserRepository: UserRepositoryPort
): Promise<boolean> {
  if (ReqID !== LoginUserID) {
    throw new Error("you are not authorize user to update data");
  }
  const data: UpdateUser[] = await UserRepository.updateUser(userData, ReqID);
  if (data) {
    return true;
  } else {
    throw new Error("error in update user");
  }
}
