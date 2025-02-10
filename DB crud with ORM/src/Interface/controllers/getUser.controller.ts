import  { Response, Request } from "express";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { getUserUsecase } from "../../Application/use_cases/GetDetails.usecase";
import { EntityManager } from "typeorm";
export const getUserDetailController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const { role, id } = res.locals;
    const isAdmin: boolean = req.query.isAdmin === "true";
    try {
      const result = await UserRepository.wrapTransaction(
        async (E: EntityManager) => {
          return await getUserUsecase(role, id, isAdmin, UserRepository, E);
        }
      );
      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "not Finding in database") {
          res.status(404).send({
            message: "user is not found",
          });
        } else {
          res.status(500).send({
            message: "internal server error",
          });
        }
      }
    }
  };
