import { userRegisterSchemaValidation } from "../../Domain/Schemas/User.validation";
import { userLoginSchemaValidation } from "../../Domain/Schemas/Login.validation";
import { userCreateController } from "../controllers/user.controller";
import { loginUserController } from "../controllers/login.controller";
import { authUserWithToken } from "../../Infrastructure/helpers/Middleware";
import { getUserDetailController } from "../../Interface/controllers/getuser.controller";
import { deleteUserController } from "../controllers/delete.controller";
import { userUpdateSchemaValidation } from "../../Domain/Schemas/Update.validation";
import { updateUserController } from "../controllers/update.controller";

import express from "express";
import { userDeleteSchemaValidation } from "../../Domain/Schemas/Delete.validation";
import { UserRepository } from "../../Infrastructure/repositories/user.Repository.ts";
const router = express.Router();

router.post(
  "/register",
  userRegisterSchemaValidation,
  userCreateController(UserRepository)
);
router.post(
  "/login",
  userLoginSchemaValidation,
  loginUserController(UserRepository)
);
router.get(
  "/getdetails",
  authUserWithToken,
  getUserDetailController(UserRepository)
);
router.patch(
  "/update/:id",
  authUserWithToken,
  userUpdateSchemaValidation,
  updateUserController(UserRepository)
);
router.delete(
  "/delete/:id",
  authUserWithToken,
  userDeleteSchemaValidation,
  deleteUserController(UserRepository)
);
export default router;
