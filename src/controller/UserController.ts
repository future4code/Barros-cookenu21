import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import * as userDTO from "../model/User";
const userBusiness = new UserBusiness()

export class UserController {
  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: userDTO.InputControllerDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      };

      const access_token = await userBusiness.createUser(input);
      
      res.status(201).send({ message: "User created!", access_token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  login = async (req: Request, res: Response):Promise<void> => {
    try{
    const input: userDTO.InputControllerLoginDTO = {
      email: req.body.email,
      password: req.body.password
    }

    const access_token = await userBusiness.login(input);
      
      res.status(200).send({ access_token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };
  profile = async (req:Request,res:Response):Promise<void> => {
    try {
      const author:userDTO.Authentication = {
        id: req.headers.authorization as string
      }

      const user = await userBusiness.profile(author)
      res.status(200).send(user);
    } catch (error:any) {
      res.status(400).send(error.message);
    }

  };
  profileUser = async (req:Request,res:Response):Promise<void> => {
    try {
      const input:userDTO.InputProfileUserDTO = {
        userId:req.params.id,
        author:req.headers.authorization as string
      }
      const user = await userBusiness.profileUser(input)
      res.status(200).send(user);
    } catch (error:any) {
      res.status(400).send(error.message);
    }

  };
  findUserAll = async (req:Request,res:Response):Promise<void> => {
    try {
      const author:userDTO.Authentication = {
        id: req.headers.authorization as string
      }
      const users = await userBusiness.findUserAll(author);
      res.status(200).send(users);
    } catch (error:any) {
      res.status(400).send(error.message);
    }
  };
  deleteUser = async (req:Request,res:Response):Promise<void> => {
    try {
      const input:userDTO.InputProfileUserDTO = {
        userId:req.body.userId,
        author:req.headers.authorization as string
      }
      await userBusiness.deleteUser(input)
      res.status(200).send({message: "User deleted!"});
    } catch (error:any) {
      res.status(400).send(error.message);
    }

  };
  recoverLogin = async (req:Request,res:Response):Promise<void> =>{
    try {
      const input:userDTO.InputRecoverEmailDTO = {
        email: req.body.email as string
        
      }
      await userBusiness.recoverLogin(input)
      res.status(200).send({message: "Password sent to email!"});
    } catch (error:any) {
      res.status(400).send(error.message);
    }
  }
}