import { db } from "../../Infrastructure/Webserver/Express/app";
import {
  QueryResult,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import { UpdateUser } from "../../Domain/modals/user.modals";

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
  if (result.affectedRows == 1) return true;
  else throw new Error("Could not create user");
}

//check for user exists in db or not
export async function UserExistsQuery(email: string): Promise<number> {
  const query = "SELECT * FROM users WHERE email = ?";
  const [result]: [QueryResult, FieldPacket[]] = await db.execute(query, [
    email,
  ]);
  if (Array.isArray(result)) return result.length;
  else throw new Error("Unexpected result format");
}

//for login check email and password match
export async function CheckForPasswordQuery(
  email: string,
  password: string
): Promise<RowDataPacket[] > {
  const query = "SELECT role,email FROM users WHERE email = ? and password=?";
  const [result]: [RowDataPacket[], FieldPacket[]] = await db.execute(query, [
    email,
    password,
  ]);
  if (Array.isArray(result)) return result;
  else throw new Error("error while matching password or role");
}

//get data by passing email in query role=user
export async function getUserDataByEmailQuery(
  email: string
): Promise<[RowDataPacket[], FieldPacket[]]> {
  const query = "SELECT * FROM users WHERE email = ?";
  const result: [RowDataPacket[], FieldPacket[]] = await db.query(query, [
    email,
  ]);
  if (result) return result;
  else throw new Error("Error while checking if user exists.");
}

//get data role=admin
export async function getUserDataByEmailQueryRoleAdmin(): Promise<
  [RowDataPacket[], FieldPacket[]]
> {
  const query = "SELECT * FROM users";
  const result: [RowDataPacket[], FieldPacket[]] = await db.query(query);
  if (result[0].length >= 1) {
    return result;
  } else throw new Error("Error fetching data from database.");
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
export async function getUserByIDQuery(
  email: string
): Promise<[RowDataPacket[], FieldPacket[]]> {
  const query = "SELECT * FROM users WHERE email = ?";
  const result: [RowDataPacket[], FieldPacket[]] = await db.query(query, [
    email,
  ]);
  if (result[0].length >= 1) return result;
  else throw new Error("Error while checking if user exists.");
}

export async function getUserByIDQueryForDelete(reqID:string):Promise<[RowDataPacket[], FieldPacket[]]> {
  const query = "SELECT * FROM users WHERE id = ?";
  const result: [RowDataPacket[], FieldPacket[]] = await db.query(query, [
    reqID,
  ]);
  if (result[0].length >= 1) return result;
  else throw new Error("Error while checking if user exists.");
}

export async function updateUserQuery(
  userData: UpdateUser,
  ReqID: string
): Promise<[ResultSetHeader, FieldPacket[]]> {
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

  const result: [ResultSetHeader, FieldPacket[]] = await db.execute(
    updateUserQuery,
    value
  );
  if (result) {
    return result;
  } else {
    throw new Error("not able to update user");
  }
}

