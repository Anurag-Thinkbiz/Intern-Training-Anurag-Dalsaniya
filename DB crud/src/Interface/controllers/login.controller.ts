import { Response, Request } from "express";
import { loginUserUsecase } from "../../Application/use_cases/Login.usercase";
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
      if (accessToken) {
        return res.status(200).json({ accessToken: accessToken });
      } else {
        throw new Error("error while generating token");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "user credentials invalid") {
          res.status(401).send("user credentials invalid");
        } else if (error.message === "User not exists.") {
          res.status(404).send("User not exists.");
        } else {
          res.status(500).send("An unknown error occurred");
        }
      } else {
        res.status(500).send("error while generating token");
      }
    }
  };
