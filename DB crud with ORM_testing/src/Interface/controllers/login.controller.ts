import { Response, Request } from "express";
import { loginUserUsecase } from "../../Application/use_cases/Login.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { EntityManager } from "typeorm";
export const loginUserController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const accessToken = await UserRepository.wrapTransaction(
        async (E: EntityManager) => {
          return await loginUserUsecase(email, password, UserRepository, E);
        }
      );
      return res.status(201).json({ token: accessToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "user credentials invalid") {
          res.status(401).send({
            message:
              "Unauthorized - Invalid credentials (incorrect email or password)",
          });
        }
      } else {
        res.status(500).send({
          message: "Internal server error",
        });
      }
    }
  };
