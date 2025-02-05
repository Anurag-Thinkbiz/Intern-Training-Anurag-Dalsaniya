import { UserRepositoryPort } from "../../../Application/port/userRepositories.port";
import {
  LoginUser,
  UpdateUser,
  User,
} from "../../../Domain/modals/user.modals";
import {
  CheckForPasswordQuery,
  CreateUserQuery,
  getUserDataByIDQuery,
  updateUserQuery,
  deleteUserQuery,
  getUserDataByEmailQueryRoleAdmin,
  getUserByEmailQuery,
} from "../sqlquery";

export const UserRepository: UserRepositoryPort = {
  createUser: async (user: User): Promise<boolean> => {
    const data = await CreateUserQuery(
      user.name,
      user.email,
      user.role,
      user.password,
      user.address
    );
    return data;
  },
  loginUser: async (loginUser: LoginUser): Promise<LoginUser[]> => {
    const result: LoginUser[] = await CheckForPasswordQuery(
      loginUser.email,
      loginUser.password
    );
    return result;
  },
  updateUser: async (
    updateUser: UpdateUser,
    reqID: number
  ): Promise<UpdateUser[]> => {
    const result = await updateUserQuery(updateUser, reqID);
    return result as UpdateUser[];
  },
  deleteUserAdmin: async (email: string): Promise<boolean> => {
    const result = await deleteUserQuery(email);
    return result;
  },
  deleteUser: async (email: string): Promise<boolean> => {
    const result = await deleteUserQuery(email);
    return result;
  },
  getDetail: async (email: string): Promise<User[]> => {
    const result = await getUserByEmailQuery(email);
    return result;
  },
  getDetailAdmin: async (): Promise<User[]> => {
    const result:User[] = await getUserDataByEmailQueryRoleAdmin();
    return result;
  },
  getDetailUser: async (id: string): Promise<User[]> => {
    const result = await getUserDataByIDQuery(id);
    return result;
  }
};
