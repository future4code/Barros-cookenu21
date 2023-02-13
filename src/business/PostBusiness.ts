
import { PostDatabase } from "../data/PostDatabase";
import { UserDatabase } from "../data/UserDatabase";
import * as erros from "../error/PostCustomError";
import * as postDTO from "../model/Posts";
import * as followDTO from "../model/Follow";
import { dateFormatBr } from "../service/formatDate";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";
import { FollowDatabase } from "../data/FollowDatabase";

const postDatabase = new PostDatabase();
const userDatabase = new UserDatabase();
const followDatabase = new FollowDatabase();
const  idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class PostBusiness {
  createPost = async (input: postDTO.InpultPostDTO): Promise<void> => {
    try {
      const { title, description, authorId } = input;

      if (!title || !description || !authorId) {
        throw new erros.InvalidTitle();
      }      
      const userId = tokenGenerator.tokenData(authorId);       
      const id: string = idGenerator.generateId();

      await postDatabase.insertPost({
        id, 
        title, 
        description, 
        authorId:userId.id
      })
    
    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  findPost = async(input:postDTO.PostIdDTO):Promise<postDTO.PostFindDTO>=> {
    try {

      const { id, authorId } = input;
            
      if(!id || !authorId) {
        throw new erros.InvalidFind();
      }
      const userId = tokenGenerator.tokenData(authorId);
      const result:postDTO.PostFindDBDTO[] = await postDatabase.findPost(id)
      const formatDate = dateFormatBr(result[0].created_at.toString())
    
      if (!result[0]) {
        throw new erros.InvalidFindPostId();
     }
     const post:postDTO.PostFindDTO = {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      createdAt: formatDate
     }

     return post;

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  feedPost = async(input:postDTO.PostIdDTO):Promise<postDTO.FeedPostDTO[]> => {
    try {
      const {id} = input;
            
     /*  const queryUser = await userDatabase.findUser();
      const existUser = queryUser.findIndex((user)=>{
        return user.id === id
      })
      
      if(existUser === -1){
        throw new Error("User id does not exist.")
      }  */

      const queryFriends: followDTO.FollowInputDTO[] = await followDatabase.findFollow(id);
      const existFriendship = queryFriends.findIndex((user) => {
        return user.author_id === id;
      });

      if (existFriendship === -1) {
        throw new Error("friendship already exists!");
      }

      const friends:string[] = []
           
      for (let i = 0; i < queryFriends.length; i++) {
         friends.push(queryFriends[i].following_id);        
      }
      const posts: postDTO.FeedPostDTO[] = [];     
      const result:postDTO.PostFindDBDTO[] = await postDatabase.feedPost(friends)
      result.map((item:any)=>{
        item.created_at = dateFormatBr(item.created_at.toString())
        return result
    })
      for (let i = 0; i < result.length; i++) {
        posts.push({
          id: result[i].id,
          title: result[i].title,
          description: result[i].description,
          createdAt: result[i].created_at,
          authorId: result[i].author_id}
        )
        
      }
      
      return posts
    } catch (error:any) {
      throw new Error(error.message)
    }
  };
  feedPostAll = async(input:string) => {
    try {
      
      
      if(input.toUpperCase() !== "normal".toUpperCase() && input.toUpperCase() !== "event".toUpperCase()){
        throw new Error(
          'Fill in the field type: normal or event'
        );
      }      
      const posts: postDTO.FeedPostDTO[] = [];  
      const result:postDTO.PostFindDBDTO[] = await postDatabase.feedPostAll(input)
      result.map((item:any)=>{
        item.created_at = dateFormatBr(item.created_at.toString())
        return result
    }) 
      
      for (let i = 0; i < result.length; i++) {
        posts.push({
          id: result[i].id,
          title: result[i].title,
          description: result[i].description,
          createdAt: result[i].created_at,
          authorId: result[i].author_id}
        )
        
      }

      return posts
    } catch (error:any) {
      throw new Error(error.message)
    }
  };
  deletePost = () => {};
}