import { BaseDatabase } from "./BaseDatabase";
import * as userDTO from "../model/User";
import * as errors from "../error/customError";


export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";
  insertUser = async (user: userDTO.UserDTO): Promise<void> => {
    try {
      await UserDatabase.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  findUser = async (email:string): Promise<userDTO.UserDTO> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({email});
       
      return result[0];

    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  findUserId = async (id:string): Promise<userDTO.UserDTO> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({id});
       
      return result[0];

    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };
  
  profile = async (input:string): Promise<userDTO.InputProfileDTO> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({id:input});
       
      return result[0];

    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  findUserAll  = async (): Promise<userDTO.UserDTO[]> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME);
       
      return result;

    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  updateUser = async (input:userDTO.InputUpdateDTO): Promise<void> => {
    try {
      await UserDatabase.connection(UserDatabase.TABLE_NAME)
      .where({ id: input.id})
      .update({
        password: input.password,
      });      
      
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
 };
  
  deleteUser = async (input:string):Promise<void> => {
    try {
      await UserDatabase.connection
      .from(UserDatabase.TABLE_NAME)
      .where({id:input})
      .delete();      
    } catch (error:any) {
       throw new errors.CustomError(400, error.message);
             
    }
  };
}
