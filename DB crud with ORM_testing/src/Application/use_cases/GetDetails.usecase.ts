import { UserRepositoryPort } from "../port/userRepositories.port.js";
import { CreateUser } from "../../Domain/modals/user.modals.js";
import { EntityManager } from "typeorm";
import { User } from "../../Infrastructure/orm/typeorm/entities/user.entity.js";
export async function getUserUsecaseByID(
  reqId: string,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<CreateUser[]> {
  const data: CreateUser[] = await UserRepository.getDetailUser(reqId, E);
  if (data) {
    return data as CreateUser[];
  } else {
    throw new Error(`Requested user not exists`);
  }
}

export async function getUserUsecase(
  role: string,
  id: string,
  isAdmin:boolean,
  UserRepository: UserRepositoryPort,
  E: EntityManager
): Promise<boolean | User[]|CreateUser[]> {
  if (role === "admin" && isAdmin) {
    const data: User[] = await UserRepository.getDetailAdmin(E);
    if (data.length >= 1) {
      return data;
    } else {
      throw new Error(`not Finding in database`);
    }
  } else {
    const data: CreateUser[] = await UserRepository.getDetailUser(id, E);
    console.log('😂',data);
    
    if (data.length > 0) {
      return data;
    } else {
      throw new Error(`not Finding in database`);
    }
  }
}
