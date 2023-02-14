import { BaseDatabase } from "./BaseDatabase";
import * as erros from "../error/PostCustomError";
import * as postDTO from "../model/Posts";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_recipe";
  insertPost = async (post: postDTO.InpultDBDTO): Promise<void> => {
    try {
      await PostDatabase.connection
        .insert({
          id: post.id,
          title: post.title,
          description: post.description,
          author_id: post.authorId,
        })
        .into(PostDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  findPost = async (postid: string): Promise<postDTO.PostFindDBDTO[]> => {
    try {
            
      const result = await PostDatabase.connection
        .select("*")
        .from(PostDatabase.TABLE_NAME)
        .where({ id: postid });
      
      return result;
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  feedPost = async (input: string[]): Promise<postDTO.PostFindDBDTO[]> => {
    try {
      const [result] = await PostDatabase.connection.raw(
        `select * from ${PostDatabase.TABLE_NAME} where author_id in ('${input}') order by created_at desc;`
      );
      return result;
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  };
  editPost = async (input:postDTO.InpultDBDTO):Promise<void> =>{
    try {
      await PostDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ id: input.id})
      .update({
        title: input.title,
        description: input.description
      });      
      
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  }

  deletePost = async (input:postDTO.PostIdDTO):Promise<void> =>{
    try {
      await PostDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ id: input.id})
      .delete();      
      
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  }
  deleteUserPost = async (input:postDTO.PostIdDTO):Promise<void> =>{
    try {
      await PostDatabase.connection(PostDatabase.TABLE_NAME)
      .where({ author_id: input.authorId})
      .delete();      
      
    } catch (error: any) {
      throw new erros.CustomError(400, error.message);
    }
  }
}
