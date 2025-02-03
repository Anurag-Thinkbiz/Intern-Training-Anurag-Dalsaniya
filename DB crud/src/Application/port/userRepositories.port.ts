import { User, UpdateUser, LoginUser } from "../../Domain/modals/user.modals";
import { ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2";

export type UserRepositoryPort = {
  createUser(user: User): Promise<Boolean>;
  loginUser(user: LoginUser): Promise<RowDataPacket[]>;
  updateUser(
    user: UpdateUser,
    reqID: string
  ): Promise<[ResultSetHeader, FieldPacket[]]>;
  deleteUserAdmin(email: string): Promise<Boolean>;
  deleteUser(email: string): Promise<boolean>;
  getDetail(email: string): Promise<[RowDataPacket[], FieldPacket[]]>;
  getDetailAdmin(): Promise<[RowDataPacket[], FieldPacket[]]>; //get all details of users
  getDetailUser(email: string): Promise<[RowDataPacket[], FieldPacket[]]>; //get detail of user
  getUserByIDQueryForDelete(reqID:string):Promise<[RowDataPacket[], FieldPacket[]]>//check if req id is exists or not
};
