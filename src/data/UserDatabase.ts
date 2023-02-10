import { BaseDatabase } from "./BaseDatabase";
import { InputProfileDTO, UserDTO } from "../model/User";
import { CustomError } from "../error/customError";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";
  insertUser = async (user: UserDTO): Promise<void> => {
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
      throw new CustomError(400, error.message);
    }
  };

  findUser = async (email:string): Promise<UserDTO> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({email});
       
      return result[0];

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  
  profile = async (input:string): Promise<InputProfileDTO> => {
    try {
      
      const result = await UserDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({id:input});
       
      return result[0];

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  deleteUser = () => {};
}
