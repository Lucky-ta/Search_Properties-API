import { Router } from "express";

import { UserController } from "../controllers";

import { validateUser } from "../middlewares";

const userRouter = Router();
userRouter.post('/', validateUser, UserController.createUser);
userRouter.post('/login', UserController.loginUser);

export { userRouter };
