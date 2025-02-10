import { Response, Request } from "express";
import { deleteUsecase } from "../../Application/use_cases/Delete.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { EntityManager } from "typeorm";
export const deleteUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const reqId = req.params.id;
    try {
      const userdata = res.locals;
      if (!userdata) {
        throw new Error("Token not exists.");
      } else {
        const result = await UserRepository.wrapTransaction(
          async (E: EntityManager) => {
            return await deleteUsecase(userdata.role, reqId, UserRepository, E);
          }
        );
        res.status(200).send({
          message: "User account successfully deleted",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Requested user not exists") {
          res.status(404).send({
            message: "Not Found - User does not exist",
          });
        } else if (error.message === "Token not exists.") {
          res.status(401).send({
            message:
              "Unauthorized access. Please provide a valid JWT token in the Authorization header.",
          });
        } else if (error.message === `unauthorized you can't delete admin`)
          res.status(403).send({
            message: "you does not have permission to delete this user",
          });
        else {
          res.status(500).send({
            message: "Internal server error",
          });
        }
      } else {
        res.status(500).send({
          message: "Internal server error",
        });
      }
    }
  };
