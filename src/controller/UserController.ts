import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { InputControllerDTO, InputControllerLoginDTO } from "../model/User";
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
  findUser = () => {};
  deleteUser = () => {};
}