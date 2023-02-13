import express from "express";

import { UserController } from "../UserController";
import { FollowController } from "../FollowController"

export const userRouter = express.Router()

const userController = new UserController();
const followController = new FollowController();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.login);
userRouter.get('/allusers', userController.findUserAll);
userRouter.get('/profile', userController.profile);
userRouter.get('/:id', userController.profileUser);
userRouter.post('/follow', followController.createFollow);
userRouter.delete('/unfollow', followController.deleteFollow);

