import { Response, Request } from "express";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { getUserUsecase } from "../../Application/use_cases/GetDetails.usecase";
import { EntityManager } from "typeorm";
export const getUserDetailController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response) => {
    const data = res.locals;
    const role: string = data.role;
    const id: string = data.id;
    const isAdmin: boolean = req.query.isAdmin === "true";
    try {
      const result = await UserRepository.wrapTransaction(
        async (E: EntityManager) => {
          return await getUserUsecase(role, id, isAdmin, UserRepository, E);
        }
      );
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("not receiving data");
    }
  };
