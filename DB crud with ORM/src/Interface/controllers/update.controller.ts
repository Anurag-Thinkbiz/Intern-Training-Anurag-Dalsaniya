import { Response, Request } from "express";
import { updateUserUsecase } from "../../Application/use_cases/Update.usecase";
import { UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { EntityManager } from "typeorm";
export const updateUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const reqData: UpdateUser = req.body;
    const LoginUserID = res.locals.id;
    try {
      await UserRepository.wrapTransaction(
        async (E: EntityManager) => {
          return await updateUserUsecase(
            reqData,
            LoginUserID,
            UserRepository,
            E
          );
        }
      );
      res.status(200).send({
        message: "successfully updated",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "you are not authorize user to update data") {
          res.status(403).send({
            message: "Forbidden - User does not have permission to update user",
          });
        } else if (error.message === "User not exists.") {
          res.status(404).send({
            message: "Not Found - User does not exist",
          });
        } else {
          res.status(500).send({
            message: "Internal server error",
          });
        }
      }
    }
  };
