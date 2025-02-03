import { User } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../port/userRepositories.port.js";

export async function CreateUserUsecase(
  name: string,
  password: string,
  role: string,
  email: string,
  address: string,
  UserRepository: UserRepositoryPort
): Promise<boolean> {
  const createUser: User = { name, password, role, email, address };
  const result = await UserRepository.createUser(createUser);
  if (result) return true;
  else throw new Error("error in create user");
}
