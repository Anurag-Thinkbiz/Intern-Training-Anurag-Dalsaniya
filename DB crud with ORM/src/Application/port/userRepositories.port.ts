import {
  CreateUser,
  UpdateUser,
  LoginUser
} from "../../Domain/modals/user.modals";
import { User } from "../../Infrastructure/orm/typeorm/entities/user.entity";

import { EntityManager } from "typeorm";
export type UserRepositoryPort = {
  createUser(user: User, E: EntityManager): Promise<Boolean>;
  loginUser(user: LoginUser, E: EntityManager): Promise<User>;
  updateUser(
    user: UpdateUser,
    reqID: string,
    E: EntityManager
  ): Promise<boolean>;
  deleteUser(email: string, E: EntityManager): Promise<boolean>;
  getDetail(email: string, E: EntityManager): Promise<User>;
  getDetailAdmin(E: EntityManager): Promise<User[]>;
  getDetailUser(id: string, E: EntityManager): Promise<CreateUser[]>;
  wrapTransaction: <T>(fun: (E: EntityManager) => Promise<T>) => Promise<T>;
};
