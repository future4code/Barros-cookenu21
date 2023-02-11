import { BaseDatabase } from "./BaseDatabase";
import { FeedPostDBDTO, InpultDBDTO, InpultPostDTO, TPost } from "../model/Posts";
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

  findPost = async (postid: string): Promise<TPost[]> => {
    try {
            
      const result = await PostDatabase.connection
        .select("*")
        .from(PostDatabase.TABLE_NAME)
        .where({ id: postid });
      
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  feedPost = async (input: string[]): Promise<FeedPostDBDTO[]> => {
    try {
      const [result] = await PostDatabase.connection.raw(
        `select * from ${PostDatabase.TABLE_NAME} where author_id in ('${input}') order by created_at desc;`
      );
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  feedPostAll = async (input: string): Promise<FeedPostDBDTO[]> => {
    try {
      const [result] = await PostDatabase.connection.raw(
        `select * from ${PostDatabase.TABLE_NAME} where type = "${input}" order by created_at desc;`
      );
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  deletePost = () => {};
}
