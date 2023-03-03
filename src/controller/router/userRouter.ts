import express from "express";

import { UserController } from "../UserController";
import { FollowController } from "../FollowController"
import { PostController } from "../PostController";

export const userRouter = express.Router()

const userController = new UserController();
const followController = new FollowController();
const postController = new PostController();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.login);
userRouter.get('/allusers', userController.findUserAll);
userRouter.get('/profile', userController.profile);
userRouter.get('/recover_account', userController.recoverLogin);
userRouter.get('/feed', postController.feedPost);
userRouter.get('/:id', userController.profileUser);
userRouter.delete('/delete', userController.deleteUser);
userRouter.post('/follow', followController.createFollow);
userRouter.delete('/unfollow', followController.deleteFollow);

