import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import * as postDTO from "../model/Posts";
import { Authentication } from "../model/User";

const postBusiness = new PostBusiness()

export class PostController {
  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const author:Authentication = {
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
        const input: postDTO.PostIdDTO = {
        id: req.params.id,
        authorId : req.headers.authorization as string
      };
      
      const post = await postBusiness.findPost(input)

      res.status(200).send( post );
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  findPostAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const input: postDTO.PostTokenDTO = {
          authorId : req.headers.authorization as string
      };
      
      const post = await postBusiness.findPostAll(input)

      res.status(200).send( post );
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  feedPost = async(req: Request, res: Response):Promise<void> => {
    try {
      const input:Authentication = {
        id: req.headers.authorization as string,
        };
      
      const recipes = await postBusiness.feedPost(input)

      res.status(200).send({ recipes });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  editPost = async (req: Request, res: Response):Promise<void> => {
    try {
      const input: postDTO.InpultDBDTO={
        id: req.body.recipeId,
        title:req.body.title,
        description:req.body.description,
        authorId: req.headers.authorization as string        
      }
      await postBusiness.editPost(input);
     res.status(200).send({ message: "Edited Recipe!" });
    } catch (error: any) {
      res.status(400).send(error.message);
  }
 };
deletePost = async (req: Request, res: Response):Promise<void> => {
  try {
    const input: postDTO.PostIdDTO={
      id: req.body.recipeId,
      authorId: req.headers.authorization as string        
    }
    await postBusiness.deletePost(input);
   res.status(200).send({ message: "Deleted Recipe!" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
 };
}
