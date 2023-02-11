import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { InpultPostDTO, PostIdDTO } from "../model/Posts";
import * as postDTO from "../model/Posts";
import { AuthenticationData } from "../model/User";

const postBusiness = new PostBusiness()

export class PostController {
  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const author:AuthenticationData = {
        id: req.headers.authorization as string
      }
      
      const input: postDTO.InpultPostDTO = {
        title: req.body.title, 
        description:req.body.description,
        authorId : author.id
      };

      

      await postBusiness.createPost(input)

      res.status(201).send({ message: "Recipe created!" });
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

  /* feedPostAll = async(req: Request, res: Response) => {
    try {
      const input: PostTypeDTO = {
        type: req.body.type
      };
            
      const posts = await postBusiness.feedPostAll(input)

      res.status(200).send({ posts });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }; */
  deletePost = () => {};
  
}