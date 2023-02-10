import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidEmail, InvalidEmailRegistered, InvalidName, InvalidPassword } from "../error/customError";
import { InputControllerDTO } from "../model/User";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";
const  idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator()

export class UserBusiness {
  createUser = async (input: InputControllerDTO): Promise<string> => {
    try {
      const { name, email, password, role } = input;

      const userDatabase = new UserDatabase();

      if (!name || !email || !password || !role) {
        throw new InvalidName();
      }

      if (password.length < 6) {
        throw new InvalidPassword();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const userBase = await userDatabase.findUser();
      const existUser = userBase.findIndex((user)=>user.email === email)
      
      if(existUser != -1) {
        throw new InvalidEmailRegistered();
      }
      const id: string =  idGenerator.generateId();

      
      await userDatabase.insertUser({
        id,
        name,
        email,
        password,
        role
      });
      const token = tokenGenerator.generateToken(id)
      return token;

    } catch (error:any) {
        throw new CustomError(400,error.message)
    }
  };

  findUser = () => {};
  deleteUser = () => {};
}