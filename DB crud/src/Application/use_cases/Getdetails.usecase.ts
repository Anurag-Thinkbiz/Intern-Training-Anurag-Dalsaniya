import { UserRepositoryPort } from "../port/userRepositories.port.js";
import { User } from "../../Domain/modals/user.modals.js";
export async function getUserUsecaseByID(
  reqId: string,
  UserRepository: UserRepositoryPort
): Promise<User[]> {
  const data: User[] =
    await UserRepository.getDetailUser(reqId);
  if (data ) {
    return data as User[];
  } else {
    throw new Error(`Requested user not exists`);
  }
}

export async function getUserUsecase(
  role: string,
  id: string,
  UserRepository: UserRepositoryPort
): Promise<boolean | User[]> {
  if (role === "admin") {
    const data: User[] =
      await UserRepository.getDetailAdmin();
    if (data.length >= 1) {
      return data;
    } else {
      throw new Error(`no data found`);
    }
  } else {
    const data: User[] =
      await UserRepository.getDetailUser(id);
    if (data.length >= 1) {
      return data;
    } else {
      throw new Error(`not Finding in database`);
    }
  }
}
