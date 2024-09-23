import { Router } from "express";
import { createUserController } from "./userDI";

const userRouter = Router();

userRouter.post("/", createUserController.handle.bind(createUserController));

export { userRouter };
