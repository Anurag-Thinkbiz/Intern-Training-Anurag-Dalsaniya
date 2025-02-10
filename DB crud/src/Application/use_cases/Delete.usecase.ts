import { UserRepositoryPort } from "../port/userRepositories.port.js";
import { User } from "../../Domain/modals/user.modals.js";
export async function deleteUsecase(
  userdataRole: string,
  reqID: string,
  UserRepository: UserRepositoryPort
): Promise<boolean> {
  if (userdataRole === "admin") {
    const requestUserData: User[] = await UserRepository.getDetailUser(reqID);
    if (!requestUserData) {
      throw new Error("Requested user not exists");
    }
    if (requestUserData[0].role === "admin") {
      throw new Error(`unauthorized you can't delete admin`);
    }
    const result = await UserRepository.deleteUserAdmin(
      requestUserData[0].email
    );
    if (result) {
      return true;
    } else {
      throw new Error("Error generating deleting user by admin");
    }
  } else  {
    const requestUserData: User[] = await UserRepository.getDetailUser(reqID);
    if (!requestUserData) {
      throw new Error("Requested user not exists");
    }
    if (requestUserData[0].role === "admin") {
      throw new Error(`unauthorized you can't delete admin`);
    } else {
      const result = await UserRepository.deleteUser(requestUserData[0].email);
      if (result) {
        return result;
      } else {
        throw new Error("Error generating deleting user by user:");
      }
    }
  } 
}
