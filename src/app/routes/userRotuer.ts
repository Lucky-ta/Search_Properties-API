import { Router } from "express";

import { UserController } from "../controllers";

import { validateUser, tokenValidation, validateUpdatedUser } from "../middlewares";

const userRouter = Router();

userRouter.post('/', validateUser, UserController.createUser);
userRouter.post('/login', UserController.loginUser);
userRouter.patch('/:id', tokenValidation, validateUpdatedUser, UserController.editUser);
userRouter.delete('/:id', tokenValidation, UserController.deleteUser);

export { userRouter };
