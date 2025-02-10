import { LoginUser } from "../../Domain/modals/user.modals";
import jwt from "jsonwebtoken";
import { UserRepositoryPort } from "../port/userRepositories.port";
export async function loginUserUsecase(
  email: string,
  password: string,
  UserRepository: UserRepositoryPort
): Promise<string> {
  const loginUser: LoginUser = { password, email };
  const result: LoginUser[] = await UserRepository.loginUser(loginUser);
  if (result) {
    const accessToken = jwt.sign(result, process.env.ACCESSTOKEN!);
    if (!accessToken) {
      throw new Error("error in generating Token");
    } else {
      return accessToken;
    }
  } else {
    throw new Error(`User is not Exists`);
  }
}
