import { Response, Request } from "express";
import { getUserUsecaseByID } from "../../Application/use_cases/Getdetails.usecase";
import { deleteUsecase } from "../../Application/use_cases/Delete.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";

export const deleteUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const reqId = req.params.id;
    const requestUserData = await getUserUsecaseByID(reqId, UserRepository);
    if (!requestUserData) {
      throw new Error("Requested user not exists");
    } else {
      try {
        const userdata = res.locals;
        if (!userdata) {
          return res.status(409).send("User not in Token exists.");
        } else {
          const result: boolean = await deleteUsecase(
            userdata[0][0].role,
            requestUserData[0].email,
            requestUserData[0].role,
            UserRepository
          );
          if (result) {
            res.status(200).send("successfully deleted");
          } else {
            throw new Error("An unknown error occurred");
          }
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
            res.status(500).send("An unknown error occurred");
          }
        } else {
          res.status(500).send("error while deleting user");
        }
      }
    }
  };
