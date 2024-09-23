import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByUuidController,
} from "./userDI";

const userRouter = Router();

userRouter.post("/", createUserController.handle.bind(createUserController));
userRouter.get("/", getAllUsersController.handle.bind(getAllUsersController));
userRouter.get(
  "/:uuid",
  getUserByUuidController.handle.bind(getUserByUuidController)
);

export { userRouter };
