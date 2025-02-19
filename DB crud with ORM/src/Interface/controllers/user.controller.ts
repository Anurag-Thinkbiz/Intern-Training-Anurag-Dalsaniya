import { Response, Request } from "express";
import { CreateUserUsecase } from "../../Application/use_cases/Create.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
import { EntityManager } from "typeorm";
export const userCreateController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await UserRepository.wrapTransaction(
        async (E: EntityManager) => {
          return await CreateUserUsecase(UserRepository, req.body, E);
        }
      );
      if (result) {
        res.status(201).send({
          message: "successfully created",
        });
      } else {
        throw new Error("Internal server error.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "User already exists.") {
          res.status(409).send({
            message: "User already exists",
          });
        } else {
          res.status(500).send("Internal server error");
        }
      }
    }
  };
