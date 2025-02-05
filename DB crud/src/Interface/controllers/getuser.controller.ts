import { Response, Request } from "express";

import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { getUserUsecase } from "../../Application/use_cases/GetDetails.usecase";
export const getUserDetailController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response) => {
    const data = res.locals;
    const role: string = data.role;
    const id: string = data.id;
    try {
      const result = await getUserUsecase(role, id, UserRepository);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("not receiving data");
    }
  };
