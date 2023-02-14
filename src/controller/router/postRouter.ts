import express from "express";

import { PostController } from "../PostController";

export const postRouter = express.Router()

const postController = new PostController();

postRouter.post('/',postController.createPost);
postRouter.put('/edit', postController.editPost);
postRouter.delete('/delete', postController.deletePost);
postRouter.get('/:id',postController.findPost);
postRouter.get('/getfeedsfreands',postController.feedPost);

