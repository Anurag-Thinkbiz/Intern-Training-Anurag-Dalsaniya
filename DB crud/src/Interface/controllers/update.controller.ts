import { Response, Request } from "express";
import { updateUserUsecase } from "../../Application/use_cases/Update.usecase";
import { UpdateUser } from "../../Domain/modals/user.modals";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
export const updateUserController =
  (UserRepository: UserRepositoryPort) =>
  async (req: Request, res: Response) => {
    const data: UpdateUser = req.body;
    const ReqID = req.params.id;
    try {
      const result = await updateUserUsecase(data, ReqID, UserRepository);
      if (result) {
        res.status(200).send("successfully updated");
      } else {
        res.send(500).send("error in update data");
      }
    } catch (error) {
      res.status(500).send("error while updating data");
    }
  };
