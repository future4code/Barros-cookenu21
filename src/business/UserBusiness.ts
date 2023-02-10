import { UserDatabase } from "../data/UserDatabase";
import {
  CustomError,
  InvalidEmail,
  InvalidEmailRegistered,
  InvalidLogin,
  InvalidLoginPassword,
  InvalidName,
  InvalidPassword,
  InvalidProfile,
  InvalidProfileUser,
  InvalidRole,
  UserNotFound,
} from "../error/customError";
import { AuthenticationData, InputControllerDTO, InputControllerLoginDTO, InputProfileDTO, InputProfileUserDTO } from "../model/User";
import { HashManager } from "../service/HashManager";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();
const userDatabase = new UserDatabase();
const hashManager = new HashManager();

export class UserBusiness {
  createUser = async (input: InputControllerDTO): Promise<string> => {
    try {
      const { name, email, password, role } = input;

      if (!name || !email || !password || !role) {
        throw new InvalidName();
      }

      if (role != "ADMIN" && role != "NORMAL") {
        throw new InvalidRole();
      }

      if (password.length < 6) {
        throw new InvalidPassword();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const userBase = await userDatabase.findUser(email);
      if (userBase) {
        throw new InvalidEmailRegistered();
      }
      const id: string = idGenerator.generateId();
      const hashPassword: string = await hashManager.generateHash(password);

      await userDatabase.insertUser({
        id,
        name,
        email,
        password: hashPassword,
        role,
      });

      const token = tokenGenerator.generateToken(id);
      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  login = async (input: InputControllerLoginDTO): Promise<string> => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new InvalidLogin();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await userDatabase.findUser(email);

      if (!user) {
        throw new UserNotFound();
      }

      const compareResult: boolean = await hashManager.compareHash(
        password,
        user.password
      );

      if (!compareResult) {
        throw new InvalidLoginPassword();
      }
      const token = tokenGenerator.generateToken(user.id);
      console.log(token);
      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  profile = async (input:AuthenticationData): Promise<InputProfileDTO> => {
    try {
      if(!input){
        throw new InvalidProfile();
      }
      const userId = tokenGenerator.tokenData(input.id);
      const user = await userDatabase.profile(userId.id);
      const resultUser:InputProfileDTO = {
        id:user.id,
        name:user.name,
        email:user.email
      }
      return resultUser;
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }

  };
  profileUser = async (input:InputProfileUserDTO): Promise<InputProfileDTO> => {
    try {
       const {userId,author} = input;
       
      if(!userId || !author){
        throw new InvalidProfile();
      }
      const tokenUser= tokenGenerator.tokenData(author);
      const userToken = await userDatabase.profile(tokenUser.id);
      const user = await userDatabase.profile(userId);
      if(!user){
        throw new InvalidProfileUser();
      }
      const resultUser:InputProfileDTO = {
        id:user.id,
        name:user.name,
        email:user.email
      }
      return resultUser;
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }

  };

  findUser = () => {};
  deleteUser = () => {};
}
