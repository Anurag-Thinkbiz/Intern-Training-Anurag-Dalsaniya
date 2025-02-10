import { Response, Request } from "express";
import { updateUserUsecase } from "../../Application/use_cases/Update.usecase";
import { UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";

export const updateUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const reqData: UpdateUser = req.body;
    const ReqID = parseInt(req.params.id);
    const LoginUserID = res.locals.id;
    try {
      await updateUserUsecase(reqData, LoginUserID, ReqID, UserRepository);
      res.status(200).send("successfully updated");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "you are not authorize user to update data") {
          res.status(400).send("you are not authorize user to update data");
        } else {
          res.status(500).send("An unknown error occurred");
        }
      }
    }
  };