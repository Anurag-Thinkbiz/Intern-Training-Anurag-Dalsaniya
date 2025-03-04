import { UserRepositoryPort } from "../port/userRepositories.port.js";
import { User } from "../../Infrastructure/orm/typeorm/entities/user.entity";
import { EntityManager } from "typeorm";

export async function CreateUserUsecase(
  UserRepository: UserRepositoryPort,
  data: User,
  E: EntityManager
): Promise<boolean> {
  const { email } = data;

  const userExists: User = await UserRepository.getDetail(email, E);

  if (userExists) {
    throw new Error("User already exists.");
  }
  const result = await UserRepository.createUser(data, E);
  if (result) return true;
  else return false;
}
