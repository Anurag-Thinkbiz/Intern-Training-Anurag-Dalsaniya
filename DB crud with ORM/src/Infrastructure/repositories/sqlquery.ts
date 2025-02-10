import { db } from "../../Infrastructure/Webserver/Express/app";
import { AppDataSource } from "../orm/typeorm/config/orm.config";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateUser, LoginUser, UpdateUser } from "../../Domain/modals/user.modals";
import { User } from "../orm/typeorm/entities/user.entity";


// for login check email and password match

//get data by passing email in query role=user
// export async function getUserDataByIDQuery(id: string): Promise<CreateUser[]> {
//   const userRepository = AppDataSource.getRepository(User);

//   const queryBuilder = userRepository.createQueryBuilder("user");

//   const result = await queryBuilder
//     .select(["user.id", "user.name", "user.email", "user.role", "user.address", "user.password"])
//     .where("user.id = :id", { id })
//     .getRawMany();
//   return result as CreateUser[];
// }

//get data role=admin
// export async function getUserDataByEmailQueryRoleAdmin(): Promise<CreateUser[]> {
//   const query = "SELECT id, name, email, role, address, password FROM users";
//   const result: [RowDataPacket[], FieldPacket[]] = await db.query(query);
//   return result[0] as CreateUser[];
// }

// export async function deleteUserQuery(email: string): Promise<boolean> {
//   const query = "delete FROM users where email=?";
//   const result: [ResultSetHeader, FieldPacket[]] = await db.query(query, [
//     email,
//   ]);
//   if (result[0].affectedRows === 1) return true;
//   else {
//     throw new Error("Error while deleting user");
//   }
// }

// export async function deleteUserQueryByUser(
//   email: string,
//   id: string
// ): Promise<boolean> {
//   const query = "delete FROM users where email=? and id=?";
//   const result: [ResultSetHeader, FieldPacket[]] = await db.query(query, [
//     email,
//     id,
//   ]);
//   if (result[0].affectedRows === 1) return true;
//   else {
//     throw new Error("Error while deleting user");
//   }
// }


