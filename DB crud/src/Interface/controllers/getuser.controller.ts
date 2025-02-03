import { Response, Request } from "express";

import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { getUserUsecase } from "../../Application/use_cases/Getdetails.usecase";
export const getUserDetailController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response) => {
    const data = res.locals;
    const role: string = data[0][0].role;
    const email: string = data[0][0].email;
    try {
      const result = await getUserUsecase(role, email, UserRepository);
      if (result) {
        return res.status(200).send(result);
      } else {
        throw new Error("not getting data");
      }
    } catch (error) {
      return res.status(500).send("not getting data");
    }
  };
