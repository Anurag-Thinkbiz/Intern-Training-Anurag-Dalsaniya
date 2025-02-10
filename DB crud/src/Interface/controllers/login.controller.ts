import { Response, Request } from "express";
import { loginUserUsecase } from "../../Application/use_cases/Login.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
export const loginUserController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const accessToken = await loginUserUsecase(
        email,
        password,
        UserRepository
      );
      return res.status(200).json({ accessToken: accessToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "user credentials invalid") {
          res.status(401).send("user credentials invalid");
        } else if (error.message === "User is not Exists") {
          res.status(404).send("User is not Exists");
        }
      } else {
        res.status(500).send("error while generating token");
      }
    }
  };
