import express from "express";

import { UserController } from "../UserController";

export const userRouter = express.Router()

const userController = new UserController();

userRouter.post('/signup', userController.createUser);
userRouter.get('/login', userController.login);
userRouter.get('/profile', userController.profile);

