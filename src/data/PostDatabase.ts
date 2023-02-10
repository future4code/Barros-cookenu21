import { BaseDatabase } from "./BaseDatabase";
import { FeedPostDBDTO, PostTypeDTO, TPost } from "../model/Posts";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_posts";
  insertPost = async (post: TPost): Promise<void> => {
    try {
      await PostDatabase.connection
        .insert({
          id: post.id,
          photo: post.photo,
          description: post.description,
          type: post.type,
          created_at: post.createdAt,
          author_id: post.authorId,
        })
        .into(PostDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.message);
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

  feedPostAll = async (input: PostTypeDTO): Promise<FeedPostDBDTO[]> => {
    try {
      const [result] = await PostDatabase.connection.raw(
        `select * from ${PostDatabase.TABLE_NAME} where type = "${input.type}" order by created_at desc;`
      );
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  deletePost = () => {};
}
