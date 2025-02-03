import { emitWarning } from "process";
import { UserRepositoryPort } from "../../../Application/port/userRepositories.port";
import {
  LoginUser,
  UpdateUser,
  User,
} from "../../../Domain/modals/user.modals";
import {
  CheckForPasswordQuery,
  CreateUserQuery,
  UserExistsQuery,
  updateUserQuery,
  deleteUserQuery,
  getUserDataByEmailQueryRoleAdmin,
  getUserByIDQuery,
  getUserByIDQueryForDelete,
} from "../sqlquery";
import { ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2";

export const UserRepository: UserRepositoryPort = {
  createUser: async (user: User): Promise<boolean> => {
    const result = await UserExistsQuery(user.email);
    if (result >= 1) throw new Error("User already exists.");
    const data = await CreateUserQuery(
      user.name,
      user.email,
      user.role,
      user.password,
      user.address
    );
    return data;
  },
  loginUser: async (loginUser: LoginUser): Promise<RowDataPacket[]> => {
    const userExists = await UserExistsQuery(loginUser.email);
    if (!userExists) {
      throw new Error("User not exists.");
    }
    const result = await CheckForPasswordQuery(
      loginUser.email,
      loginUser.password
    );
    console.log(result);
    
    if (result.length <= 0) {
      throw new Error("user credentials invalid");
    } else {
      return result;
    }
  },
  updateUser: async (
    updateUser: UpdateUser,
    reqID: string
  ): Promise<[ResultSetHeader, FieldPacket[]]> => {
    const result = await updateUserQuery(updateUser, reqID);
    return result;
  },
  deleteUserAdmin: async (email: string): Promise<boolean> => {
    const result = await deleteUserQuery(email);
    return result;
  },
  deleteUser: async (email: string): Promise<boolean> => {
    const result = await deleteUserQuery(email);
    return result;
  },
  getDetail: async (
    reqID: string
  ): Promise<[RowDataPacket[], FieldPacket[]]> => {
    const result = await getUserByIDQuery(reqID);
    return result;
  },
  getDetailAdmin: async (): Promise<[RowDataPacket[], FieldPacket[]]> => {
    const result = await getUserDataByEmailQueryRoleAdmin();
    return result;
  },
  getDetailUser: async (
    email: string
  ): Promise<[RowDataPacket[], FieldPacket[]]> => {
    const result = await getUserByIDQuery(email);
    return result;
  },
  getUserByIDQueryForDelete:async(reqID:string):Promise<[RowDataPacket[], FieldPacket[]]>=>{
    const result = await getUserByIDQueryForDelete(reqID);
    return result;
  }
};
