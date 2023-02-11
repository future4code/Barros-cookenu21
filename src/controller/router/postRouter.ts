import express from "express";

import { PostController } from "../PostController";

export const postRouter = express.Router()

const postController = new PostController();

postRouter.post('/',postController.createPost);
postRouter.get('/getpost',postController.findPost);
postRouter.get('/getfeedsfreands',postController.feedPost);


