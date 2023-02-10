import express from "express";

import { FriendshipController } from "../FriendshipController";

export const friendshipRouter = express.Router()

const friendshipController = new FriendshipController();

friendshipRouter.post('/create',friendshipController.createFriendship);
friendshipRouter.delete('/',friendshipController.deleteFriendship);

