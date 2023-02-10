import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { InputControllerDTO } from "../model/User";

export class UserController {
  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: InputControllerDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      };

      const userBusiness = new UserBusiness()
      const token = await userBusiness.createUser(input);
      
      res.status(201).send({ message: "User created!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  findUser = () => {};
  deleteUser = () => {};
}