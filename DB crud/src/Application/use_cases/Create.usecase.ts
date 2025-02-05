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

  const userExists:User[] = await UserRepository.getDetailUser(email);

  
  if (userExists.length>=1) {
    throw new Error("User already exists.");
  } else {
    const result = await UserRepository.createUser(createUser);
    if (result) return true;
    else return false;
  }
}
