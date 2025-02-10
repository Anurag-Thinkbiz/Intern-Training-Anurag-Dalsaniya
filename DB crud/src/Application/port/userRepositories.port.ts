import { User, UpdateUser, LoginUser } from "../../Domain/modals/user.modals";

export type UserRepositoryPort = {
  createUser(user: User): Promise<Boolean>;
  loginUser(user: LoginUser): Promise<LoginUser[]>;
  updateUser(
    user: UpdateUser,
    reqID: number
  ): Promise<UpdateUser[]>;
  deleteUserAdmin(email: string): Promise<Boolean>;
  deleteUser(email: string): Promise<boolean>;
  getDetail(email: string): Promise<User[]>;
  getDetailAdmin(): Promise<User[]>; 
  getDetailUser(id: string): Promise<User[]>; 
};
