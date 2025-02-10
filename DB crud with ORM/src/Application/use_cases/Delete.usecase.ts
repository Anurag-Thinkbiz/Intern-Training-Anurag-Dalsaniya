import { UserRepositoryPort } from "../port/userRepositories.port.js";
import { CreateUser } from "../../Domain/modals/user.modals.js";
import { EntityManager } from "typeorm";
export async function deleteUsecase(
  userdataRole: string,
  reqID: string,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<boolean> {
  if (userdataRole === "admin") {
    const requestUserData: CreateUser[] = await UserRepository.getDetailUser(
      reqID,
      E
    );
    console.log(requestUserData);
    if (!requestUserData) {
      throw new Error("Requested user not exists");
    }
    if (requestUserData[0].role === "admin") {
      throw new Error(`unauthorized you can't delete admin`);
    }
    console.log(requestUserData);
    const result = await UserRepository.deleteUser(requestUserData[0].email, E);
    console.log(result);
    
    if (result) {
      return true;
    } else {
      throw new Error("Internal server error");
    }
  } else {
    const requestUserData: CreateUser[] = await UserRepository.getDetailUser(
      reqID,
      E
    );
    if (!requestUserData) {
      throw new Error("Requested user not exists");
    }
    if (requestUserData[0].role === "admin") {
      throw new Error(`unauthorized you can't delete admin`);
    } else {
      const result = await UserRepository.deleteUser(
        requestUserData[0].email,
        E
      );
      if (result) {
        return result;
      } else {
        throw new Error("Internal server error");
      }
    }
  }
}
