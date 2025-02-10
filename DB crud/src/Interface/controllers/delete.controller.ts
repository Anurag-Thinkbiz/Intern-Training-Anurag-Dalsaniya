import { Response, Request } from "express";
import { deleteUsecase } from "../../Application/use_cases/Delete.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";

export const deleteUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const reqId = req.params.id;
    try {
      const userdata = res.locals;
      if (!userdata) {
        return res.status(409).send("User not in Token exists.");
      } else {
        const result: boolean = await deleteUsecase(
          userdata.role,
          reqId,
          UserRepository
        );
        res.status(200).send("successfully deleted");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Requested user not exists") {
          res.status(404).send("Requested user not exists");
        } else if (error.message === "User not in Token exists.") {
          res.status(404).send("User not in Token exists..");
        } else if (error.message === `unauthorized you can't delete admin`)
          res.status(403).send(`unauthorized you can't delete admin`);
        else {
          res.status(500).send("error while deleting user");
        }
      } else {
        res.status(500).send("error while deleting user");
      }
    }
  };
