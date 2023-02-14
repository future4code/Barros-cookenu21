import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
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
      const author:AuthenticationData = {
        id: req.headers.authorization as string
      }
      const input: postDTO.PostIdDTO = {
        id: req.params.id,
        authorId : author.id
      };
      
      const post = await postBusiness.findPost(input)

      res.status(200).send( post );
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  feedPost = async(req: Request, res: Response) => {
    try {
      const input:AuthenticationData = {
        id: req.headers.authorization as string,
        };
      
      const recipes = await postBusiness.feedPost(input)

      res.status(200).send({ recipes });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  deletePost = () => {};
  
}