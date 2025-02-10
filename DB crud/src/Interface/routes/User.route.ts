import { RegisterValidationSchema } from "../../Domain/Schemas/User.validation";
import { SchemaValidation } from "../../Infrastructure/helpers/Validation";
import { DeleteValidationSchema } from "../../Domain/Schemas/Delete.validation";
import { LoginValidationSchema } from "../../Domain/Schemas/Login.validation";
import { UpdateValidationSchema } from "../../Domain/Schemas/Update.validation";
import { userCreateController } from "../controllers/user.controller";
import { loginUserController } from "../controllers/login.controller";
import { deleteUserController } from "../controllers/delete.controller";
import { updateUserController } from "../controllers/update.controller";
import { getUserDetailController } from "../controllers/getUser.controller";
import { authUserWithToken } from "../../Infrastructure/helpers/Middleware";
import { UserRepository } from "../../Infrastructure/repositories/user.Repository.ts";

import express from "express";
const router = express.Router();

router.post(
  "/register",
  SchemaValidation(RegisterValidationSchema),
  userCreateController(UserRepository)
);
router.post(
  "/login",
  SchemaValidation(LoginValidationSchema),
  loginUserController(UserRepository)
);
router.get(
  "/details",
  authUserWithToken,
  getUserDetailController(UserRepository)
);
router.patch(
  "/update/:id",
  authUserWithToken,
  SchemaValidation(UpdateValidationSchema),
  updateUserController(UserRepository)
);
router.delete(
  "/delete/:id",
  authUserWithToken,
  SchemaValidation(DeleteValidationSchema),
  deleteUserController(UserRepository)
);
export default router;
