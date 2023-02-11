import express from "express";

import { UserController } from "../UserController";

export const userRouter = express.Router()

const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.login);
userRouter.get('/profile', userController.profile);
userRouter.get('/:id', userController.profileUser);

