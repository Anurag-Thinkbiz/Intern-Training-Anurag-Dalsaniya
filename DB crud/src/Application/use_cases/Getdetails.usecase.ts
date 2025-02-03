import { FieldPacket, RowDataPacket } from "mysql2";
import { UserRepositoryPort } from "../port/userRepositories.port.js";
export async function getUserUsecaseByID(
  reqId: string,
  UserRepository: UserRepositoryPort
): Promise<RowDataPacket[]> {
  const data: [RowDataPacket[], FieldPacket[]] =
    await UserRepository.getUserByIDQueryForDelete(reqId);
  if (data[0].length >= 1) {
    return data[0];
  } else {
    throw new Error(`Requested user not exists`);
  }
}

export async function getUserUsecase(
  role: string,
  email: string,
  UserRepository: UserRepositoryPort
): Promise<boolean | RowDataPacket[]> {
  if (role === "admin") {
    const data: [RowDataPacket[], FieldPacket[]] =
      await UserRepository.getDetailAdmin();
    if (data[0].length >= 1) {
      return data[0];
    } else {
      throw new Error(`not getting in db`);
    }
  } else if (role === "user") {
    const data: [RowDataPacket[], FieldPacket[]] =
      await UserRepository.getDetailUser(email);
    if (data[0].length >= 1) {
      return data[0];
    } else {
      throw new Error(`not getting ${email} in db`);
    }
  } else {
    throw new Error("role is not valid");
  }
}
