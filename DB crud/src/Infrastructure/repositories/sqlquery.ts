import { db } from "../../Infrastructure/Webserver/Express/app";
import {
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import { LoginUser, UpdateUser, User } from "../../Domain/modals/user.modals";

export async function CreateUserQuery(
  name: string,
  email: string,
  role: string,
  password: string,
  address: string
): Promise<boolean> {
  const query =
    "INSERT INTO users (name, email, role, password, address) VALUES (?, ?, ?, ?, ?)";
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query(query, [
    name,
    email,
    role,
    password,
    address,
  ]);
  return result.affectedRows === 1;
}

//for login check email and password match
export async function CheckForPasswordQuery(
  email: string,
  password: string
): Promise<LoginUser[]> {
  const query = "SELECT id,role FROM users WHERE email = ? and password=?";
  const [result]: [RowDataPacket[], FieldPacket[]] = await db.execute(query, [
    email,
    password,
  ]);
  return result[0] as LoginUser[];
}

//get data by passing email in query role=user
export async function getUserDataByIDQuery(id: string): Promise<User[]> {
  const query = "SELECT id, name, email, role, address, password FROM users WHERE id = ?";
  const [result]: [RowDataPacket[], FieldPacket[]] = await db.query(query, [
    id,
  ]);
  return result as User[];
}

//get data role=admin
export async function getUserDataByEmailQueryRoleAdmin(): Promise<User[]> {
  const query = "SELECT id, name, email, role, address, password FROM users";
  const result: [RowDataPacket[], FieldPacket[]] = await db.query(query);
  return result[0] as User[];
}

export async function deleteUserQuery(email: string): Promise<boolean> {
  const query = "delete FROM users where email=?";
  const result: [ResultSetHeader, FieldPacket[]] = await db.query(query, [
    email,
  ]);
  if (result[0].affectedRows === 1) return true;
  else {
    throw new Error("Error while deleting user");
  }
}

export async function deleteUserQueryByUser(
  email: string,
  id: string
): Promise<boolean> {
  const query = "delete FROM users where email=? and id=?";
  const result: [ResultSetHeader, FieldPacket[]] = await db.query(query, [
    email,
    id,
  ]);
  if (result[0].affectedRows === 1) return true;
  else {
    throw new Error("Error while deleting user");
  }
}
//for request user check
export async function getUserByEmailQuery(email: string): Promise<User[]> {
  const query =
    "SELECT id, name, email, role, address, password FROM users WHERE email = ?";

  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(query, [
    email,
  ]);

  return rows as User[];
}

export async function updateUserQuery(
  userData: UpdateUser,
  ReqID: number
): Promise<UpdateUser[]> {
  const reqID = ReqID;
  let updateData: any = userData;
  let updateUserQuery: string = "update users set ";

  const fields = Object.keys(updateData) as (keyof UpdateUser)[];
  let value: Array<string | number> = [];

  fields.forEach((field, index) => {
    updateUserQuery += `${field} = ?`;
    value.push(updateData[field]);
    if (index < fields.length - 1) updateUserQuery += ",";
  });

  updateUserQuery += " where id = ?";
  value.push(reqID);

  const result: [RowDataPacket[], FieldPacket[]] = await db.query(
    updateUserQuery,
    value
  );

  return result as UpdateUser[];
}
