import { UserDatabase } from "../data/UserDatabase";
import * as errors from "../error/customError";
import * as userDTO from "../model/User";
import { HashManager } from "../service/HashManager";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();
const userDatabase = new UserDatabase();
const hashManager = new HashManager();

export class UserBusiness {
  createUser = async (input: userDTO.InputControllerDTO): Promise<string> => {
    try {
      const { name, email, password, role } = input;

      if (!name || !email || !password || !role) {
        throw new errors.InvalidName();
      }

      if (role != "ADMIN" && role != "NORMAL") {
        throw new errors.InvalidRole();
      }

      if (password.length < 6) {
        throw new errors.InvalidPassword();
      }

      if (!email.includes("@")) {
        throw new errors.InvalidEmail();
      }

      const userBase = await userDatabase.findUser(email);
      if (userBase) {
        throw new errors.InvalidEmailRegistered();
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
      throw new errors.CustomError(400, error.message);
    }
  };

  login = async (input: userDTO.InputControllerLoginDTO): Promise<string> => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new errors.InvalidLogin();
      }

      if (!email.includes("@")) {
        throw new errors.InvalidEmail();
      }

      const user = await userDatabase.findUser(email);

      if (!user) {
        throw new errors.UserNotFound();
      }

      const compareResult: boolean = await hashManager.compareHash(
        password,
        user.password
      );

      if (!compareResult) {
        throw new errors.InvalidLoginPassword();
      }
      const token = tokenGenerator.generateToken(user.id);
      return token;
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };
  profile = async (input:userDTO.AuthenticationData): Promise<userDTO.InputProfileDTO> => {
    try {
      if(!input){
        throw new errors.InvalidProfile();
      }
      const userId = tokenGenerator.tokenData(input.id);
      const user = await userDatabase.profile(userId.id);
      const resultUser:userDTO.InputProfileDTO = {
        id:user.id,
        name:user.name,
        email:user.email
      }
      return resultUser;
    } catch (error:any) {
      throw new errors.CustomError(400, error.message);
    }

  };
  profileUser = async (input:userDTO.InputProfileUserDTO): Promise<userDTO.InputProfileDTO> => {
    try {
       const {userId,author} = input;
       
      if(!userId || !author){
        throw new errors.InvalidProfile();
      }
      const tokenUser= tokenGenerator.tokenData(author);
      const userToken = await userDatabase.profile(tokenUser.id);
      const user = await userDatabase.profile(userId);
      if(!user){
        throw new errors.InvalidProfileUser();
      }
      const resultUser:userDTO.InputProfileDTO = {
        id:user.id,
        name:user.name,
        email:user.email
      }
      return resultUser;
    } catch (error:any) {
      throw new errors.CustomError(400, error.message);
    }

  };

  findUserAll = async ():Promise<userDTO.UserFindAllBusiness[]> => {
    try {
      const users:userDTO.UserFindAllBusiness[] =[]
      const resultUser = await userDatabase.findUserAll();
      for (let i = 0; i< resultUser.length; i++) {
          users.push({
            id:resultUser[i].id,
            name:resultUser[i].name,
            email:resultUser[i].email,
            role:resultUser[i].role
          });   
      }       
      return users;
    } catch (error:any) {
      throw new errors.CustomError(400, error.message);
    }
  };
  deleteUser = () => {};
}
