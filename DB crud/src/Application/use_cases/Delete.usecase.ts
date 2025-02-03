import { RowDataPacket } from "mysql2";
import { UserRepositoryPort } from "../port/userRepositories.port.js";

export async function deleteUsecase(
  userdataRole: string,
  requestUserDataEmail: string,
  requestUserDataRole: string,
  UserRepository: UserRepositoryPort
): Promise<boolean> {
  if (userdataRole === "admin") {
    const result = await UserRepository.deleteUserAdmin(requestUserDataEmail);
    if (result) {
      return true;
    } else {
      throw new Error("Error generating deleting user by admin");
    }
  } else if (userdataRole === "user") {
    if (requestUserDataRole === "admin") {
      throw new Error(`unauthorized you can't delete admin`);
    } else {
      const result = await UserRepository.deleteUser(requestUserDataEmail);
      if (result) {
        return result;
      } else {
        throw new Error("Error generating deleting user by user:");
      }
    }
  } else {
    return false;
  }
}
