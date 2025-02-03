import { LoginUser } from "../../Domain/modals/user.modals";
import { UserRepository } from "../../Infrastructure/repositories/user.Repository.ts";
import jwt from "jsonwebtoken";
import { RowDataPacket, FieldPacket } from "mysql2";
import { UserRepositoryPort } from "../port/userRepositories.port";
export async function loginUserUsecase(
  email: string,
  password: string,
  UserRepository: UserRepositoryPort
): Promise<string> {
  const loginUser: LoginUser = { password, email };
  const result = await UserRepository.loginUser(loginUser);
  if (result) {
    const accessToken = jwt.sign(result[0], process.env.ACCESSTOKEN!);
    if (!accessToken) {
      throw new Error("error in generating Token");
    } else {
      return accessToken;
    }
  } else {
    throw new Error("not able to generate token");
  }
}

export async function loginUserUsecaseForMiddleware(
  email: string
): Promise<[RowDataPacket[], FieldPacket[]]> {
  const loginUser = { email };
  const result = await UserRepository.getDetail(loginUser.email);
  if (result) {
    return result;
  } else {
    throw new Error("not able to get user");
  }
}
