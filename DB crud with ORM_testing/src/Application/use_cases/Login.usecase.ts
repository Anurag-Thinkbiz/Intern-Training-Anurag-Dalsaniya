import { LoginUser } from "../../Domain/modals/user.modals";
import jwt from "jsonwebtoken";
import { UserRepositoryPort } from "../port/userRepositories.port";
import { EntityManager } from "typeorm";
export async function loginUserUsecase(
  email: string,
  password: string,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<string> {
  
  const loginUser: LoginUser = { password, email };
  const result =  await UserRepository.loginUser(loginUser, E);
  
  if (result) {
    const accessToken = jwt.sign({ id: result.id, role: result.role }, process.env.ACCESSTOKEN!);
    
    if (!accessToken) {
      throw new Error("error in generating Token");
    } else {
      return accessToken;
    }
  } else {
    throw new Error(`user credentials invalid`);
  }
}
