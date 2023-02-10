import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { AuthenticationData, InputControllerDTO, InputControllerLoginDTO, InputProfileUserDTO } from "../model/User";
const userBusiness = new UserBusiness()

export class UserController {
  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: InputControllerDTO = {
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
    const input: InputControllerLoginDTO = {
      email: req.body.email,
      password: req.body.password
    }

    const access_token = await userBusiness.login(input);
      
      res.status(201).send({ access_token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }

  };
  profile = async (req:Request,res:Response):Promise<void> => {
    try {
      const author:AuthenticationData = {
        id: req.headers.authorization as string
      }

      const user = await userBusiness.profile(author)
      res.status(201).send(user);
    } catch (error:any) {
      res.status(400).send(error.message);
    }

  };
  profileUser = async (req:Request,res:Response):Promise<void> => {
    try {
      const input:InputProfileUserDTO = {
        userId:req.params.id,
        author:req.headers.authorization as string
      }
      const user = await userBusiness.profileUser(input)
      res.status(201).send(user);
    } catch (error:any) {
      res.status(400).send(error.message);
    }

  };
  findUser = () => {};
  deleteUser = () => {};
}