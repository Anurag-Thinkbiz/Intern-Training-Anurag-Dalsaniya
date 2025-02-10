import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "../../../Application/port/userRepositories.port";
import {
  LoginUser,
  UpdateUser,
  CreateUser,
} from "../../../Domain/modals/user.modals";
import { User } from "../../orm/typeorm/entities/user.entity";
import { wrapTransaction } from "../../helpers/transaction";
export const UserRepository: UserRepositoryPort = {
  createUser: async (user: User, E: EntityManager): Promise<boolean> => {
    const savedUser = await E.createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
    return savedUser.identifiers.length > 0;
  },
  loginUser: async (loginUser: LoginUser, E: EntityManager): Promise<User> => {
    const { email, password } = loginUser;
    const result: User = await E.createQueryBuilder()
      .select(["user.id", "user.role"])
      .from(User, "user")
      .where("user.email = :email", { email })
      .andWhere("user.password = :password", { password })
      .getOne();
    console.log(result);
    return result as User;
  },
  updateUser: async (
    updateUser: UpdateUser,
    reqID: string,
    E: EntityManager
  ): Promise<boolean> => {
    const queryBuilder = await E.createQueryBuilder()
      .update(User)
      .set(updateUser)
      .where("id = :id", { id: reqID })
      .execute();
    return queryBuilder.affected && queryBuilder.affected > 0;
  },
  deleteUser: async (email: string, E: EntityManager): Promise<boolean> => {
    console.log(email);
    const result = await E.createQueryBuilder()
      .delete()
      .from(User)
      .where("email = :email", { email })
      .execute();
    return result.affected === 1;
  },
  getDetail: async (email: string, E: EntityManager): Promise<User> => {
    const result: User = await E.createQueryBuilder()
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.role",
        "user.address",
        "user.password",
      ])
      .from(User, "user")
      .where("user.email = :email", { email })
      .getOne();
    console.log(result);

    return result;
  },
  getDetailAdmin: async (E: EntityManager): Promise<User[]> => {
    const result: User[] = await E.createQueryBuilder()
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.role",
        "user.address",
        "user.password",
      ]) 
      .from(User, "user") 
      .getMany();
    return result;
  },
  getDetailUser: async (
    id: string,
    E: EntityManager
  ): Promise<CreateUser[]> => {
    const result = await E.createQueryBuilder()
      .select([
        "user.id as id",
        "user.name as name",
        "user.email as email",
        "user.role as role",
        "user.address as address",
        "user.password as password",
      ])
      .from(User, "user")
      .where("user.id = :id", { id })
      .getRawMany();
    console.log(result);
    return result;
  },
  wrapTransaction,
};
