import { UpdateUser } from "../../Domain/modals/user.modals";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { UserRepositoryPort } from "../port/userRepositories.port";
export async function updateUserUsecase(
  userData: UpdateUser,
  ReqID: string,
  UserRepository: UserRepositoryPort
): Promise<boolean> {
  const data: [ResultSetHeader, FieldPacket[]] =
    await UserRepository.updateUser(userData, ReqID);
  if (data[0].affectedRows >= 1) {
    return true;
  } else {
    throw new Error("error in update user");
  }
}
