import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { InpultPostDTO, PostIdDTO, PostTypeDTO } from "../model/Posts";

const postBusiness = new PostBusiness()

export class PostController {
  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: InpultPostDTO = {
        photo: req.body.photo, 
        description:req.body.description, 
        type: req.body.type, 
        createdAt: req.body.createdAt, 
        authorId: req.headers.authorization as string
      };

      await postBusiness.createPost(input)

      res.status(201).send({ message: "Post created!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  findPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: PostIdDTO = {
        id: req.body.id
      };
      
      const posts = await postBusiness.findPost(input)

      res.status(200).send({ posts });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  feedPost = async(req: Request, res: Response) => {
    try {
      const input: PostIdDTO = {
        id: req.headers.authorization as string
      };
      
      const posts = await postBusiness.feedPost(input)

      res.status(200).send({ posts });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  feedPostAll = async(req: Request, res: Response) => {
    try {
      const input: PostTypeDTO = {
        type: req.body.type
      };
            
      const posts = await postBusiness.feedPostAll(input)

      res.status(200).send({ posts });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
  deletePost = () => {};
  
}