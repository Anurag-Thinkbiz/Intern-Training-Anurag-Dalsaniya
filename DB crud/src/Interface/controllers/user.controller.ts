import { Response, Request } from "express";
import { CreateUserUsecase } from "../../Application/use_cases/Create.usecase";
import { UserRepositoryPort } from "../../Application/port/userRepositories.port";
export const userCreateController =
  (UserRepository: UserRepositoryPort): any =>
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, address, role } = req.body;
    try {
      const result = await CreateUserUsecase(
        name,
        password,
        role,
        email,
        address,
        UserRepository
      );
      if (result) {
        res.status(201).send("user created successfully");
      } else {
        throw new Error('Error in inserting data')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "User already exists.") {
          res.status(409).send("User already exists.");
        } else {
          res.status(500).send("An unknown error occurred");
        }
      }
    }
  };
